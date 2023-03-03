import { c as create_ssr_component, f as each, h as add_attribute, e as escape } from "./index.js";
import { d as data, a as cdAlias } from "./processData.js";
import { differenceWith, isEqual, findIndex, zip } from "lodash-es";
const SelectOneCD = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { selectedCDData } = $$props;
  let { exclude = [{ value: -1 }] } = $$props;
  let cdlist = data.map((x) => cdAlias(x.cd)).reverse();
  let temp = differenceWith(cdlist, exclude, isEqual);
  let indices = temp.map((x) => findIndex(cdlist, (y) => x.value === y.value));
  let selectables = zip(temp, indices);
  let { selected = selectables[0][1] } = $$props;
  selectedCDData = data[data.length - 1 - selected];
  if ($$props.selectedCDData === void 0 && $$bindings.selectedCDData && selectedCDData !== void 0)
    $$bindings.selectedCDData(selectedCDData);
  if ($$props.exclude === void 0 && $$bindings.exclude && exclude !== void 0)
    $$bindings.exclude(exclude);
  if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0)
    $$bindings.selected(selected);
  selectedCDData = data[data.length - 1 - selected];
  return `<select id="${"cdSelect"}" size="${"1"}" name="${"cd"}">${each(selectables, (cdidx) => {
    return `<option${add_attribute("value", cdidx[1], 0)}>${escape(cdidx[0].display)}</option>`;
  })}</select>`;
});
export {
  SelectOneCD as S
};

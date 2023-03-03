import { c as create_ssr_component, i as createEventDispatcher, e as escape, v as validate_component, f as each, h as add_attribute } from "./index.js";
import { uniq } from "lodash-es";
const StateButton_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "button.svelte-1dxr33i{padding:2px;font-size:inherit;font-family:inherit;line-height:1.2}",
  map: null
};
const StateButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { states = [] } = $$props;
  let stateIndex = 0;
  createEventDispatcher();
  if ($$props.states === void 0 && $$bindings.states && states !== void 0)
    $$bindings.states(states);
  $$result.css.add(css$1);
  return `<button class="${"svelte-1dxr33i"}">${escape(states[stateIndex])}
</button>`;
});
const SelectMembersPanel_svelte_svelte_type_style_lang = "";
const css = {
  code: '.weaker.svelte-1edzgs0{font-size:small;color:hsl(0, 0%, 60%)}[type="checkbox"].svelte-1edzgs0{vertical-align:middle}.memberGrouping.svelte-1edzgs0{margin-top:1ch;margin-right:2em;width:max-content;padding-left:1rem;display:grid;grid-auto-flow:column;grid-template-columns:repeat(auto-fill,auto);grid-column-gap:1.5em}.groupList.svelte-1edzgs0{display:flex;flex-direction:column}',
  map: null
};
const SelectMembersPanel = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let selectGrouping;
  let { selectables } = $$props;
  let { selectedMembers } = $$props;
  let { nolimit = false } = $$props;
  if ($$props.selectables === void 0 && $$bindings.selectables && selectables !== void 0)
    $$bindings.selectables(selectables);
  if ($$props.selectedMembers === void 0 && $$bindings.selectedMembers && selectedMembers !== void 0)
    $$bindings.selectedMembers(selectedMembers);
  if ($$props.nolimit === void 0 && $$bindings.nolimit && nolimit !== void 0)
    $$bindings.nolimit(nolimit);
  $$result.css.add(css);
  selectGrouping = uniq(selectables.map((x) => x.gen)).sort((a, b) => parseInt(a) - parseInt(b)).map((n) => {
    return {
      "gen": n,
      "labels": [`\u5168${n}\u671F\u751F\u9078\u3076`, `\u5168${n}\u671F\u751F\u5916\u3059`],
      "consistsOf": selectables.filter((x) => x.gen == n)
    };
  });
  return `${selectables.length > 1 ? `<div class="${"memberGrouping svelte-1edzgs0"}">${validate_component(StateButton, "StateButton").$$render($$result, { states: ["\u5168\u54E1\u9078\u3076", "\u5168\u54E1\u5916\u3059"] }, {}, {})}
    ${!nolimit ? `<span class="${"weaker svelte-1edzgs0"}">18\u500B\u4EE5\u4E0B\u3092\u9078\u629E\u3059\u308B\u3053\u3068\u3092\u63A8\u5968\u3057\u307E\u3059</span>` : ``}
    <br></div>` : ``}
<div class="${"memberGrouping svelte-1edzgs0"}">${each(selectGrouping, (mbgroup) => {
    return `<div class="${"groupList svelte-1edzgs0"}">${validate_component(StateButton, "StateButton").$$render($$result, { states: mbgroup.labels }, {}, {})}
    ${each(mbgroup.consistsOf, (itm) => {
      return `<label><input type="${"checkbox"}" name="${"selectedMembers"}"${add_attribute("value", itm.member, 0)} class="${"svelte-1edzgs0"}"${~selectedMembers.indexOf(itm.member) ? add_attribute("checked", true, 1) : ""}>
        ${escape(itm.kanji)}</label>`;
    })}
    </div>`;
  })}
</div>`;
});
export {
  SelectMembersPanel as S
};

import { c as create_ssr_component, e as escape, a as each, v as validate_component } from "../../_app/immutable/chunks/index-280110de.js";
import { g as getMember, b as progression, a as cdData, d as data } from "../../_app/immutable/chunks/util-5d56fb4c.js";
import { range, find } from "lodash-es";
const ProgressTable_svelte_svelte_type_style_lang = "";
const css = {
  code: "td.svelte-z16svn{text-align:center}.table-bordered.svelte-z16svn{table-layout:fixed;border:1px solid #ddd !important;border-spacing:0!important;border-collapse:collapse;display:block;overflow-x:auto}.headingCell.svelte-z16svn{padding-left:.4em;padding-right:.2em;border-right:1px solid black;border-top:1px solid #ddd;border-bottom:1px solid #ddd}.cdInfo.svelte-z16svn{width:100px;max-width:140px}",
  map: null
};
function extendProgressData(data2, toLength) {
  let len = data2.total.length;
  for (let i = len; i < toLength; i++) {
    data2.total.push("-");
    data2.diff.push("-");
  }
}
const ProgressTable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let mbInfo;
  let numRows;
  let progressData;
  let transposedTotal;
  let { member } = $$props;
  let { includings } = $$props;
  if ($$props.member === void 0 && $$bindings.member && member !== void 0)
    $$bindings.member(member);
  if ($$props.includings === void 0 && $$bindings.includings && includings !== void 0)
    $$bindings.includings(includings);
  $$result.css.add(css);
  mbInfo = getMember(member);
  numRows = Math.max(...includings.map((x) => x.lastDraw));
  progressData = includings.map((x) => progression(member, x));
  {
    progressData.map((t) => extendProgressData(t, numRows));
  }
  transposedTotal = progressData[0].total.map((col, i) => progressData.map((row) => row.total[i]));
  return `<table class="${"table-bordered svelte-z16svn"}"><caption>${escape(mbInfo.kanji)}</caption>
    <thead><th></th>
        ${each(includings, (cd) => {
    return `<th class="${"headingCell cdInfo svelte-z16svn"}">${escape(cdData(cd.cd).display)}</th>`;
  })}</thead>
    
    ${each(range(numRows), (i) => {
    return `<tr><td class="${"svelte-z16svn"}">${escape(i)}</td>
            ${each(transposedTotal[i], (draw) => {
      return `<td class="${"svelte-z16svn"}">${escape(draw)}</td>`;
    })}
        </tr>`;
  })}
    
</table>`;
});
const Progress = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let cds = [
    { num: 30, type: "Single" },
    { num: 29, type: "Single" },
    { num: 28, type: "Single" }
  ];
  let includings = cds.map((y) => find(data, (x) => x.cd.num == y.num && x.cd.type == y.type));
  return `${validate_component(ProgressTable, "ProgressTable").$$render($$result, { member: "Sato Kaede", includings }, {}, {})}`;
});
export {
  Progress as default
};

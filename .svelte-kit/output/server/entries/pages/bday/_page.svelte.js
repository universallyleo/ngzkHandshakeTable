import { c as create_ssr_component, e as escape, v as validate_component, f as each } from "../../../chunks/index.js";
import { S as SelectMembersPanel } from "../../../chunks/SelectMembersPanel.js";
import { b as getAge, J as JPDateDisplay, h as getAllMembers } from "../../../chunks/processData.js";
const DOBInfo_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".card.svelte-ub9hi1{width:280px;border:1px solid hsl(291, 57%, 50%);display:grid;grid-template-columns:220px 60px;height:fit-content}.tbl.svelte-ub9hi1{width:100%;display:grid;grid-template-rows:repeat(3,1fr)}.pic.svelte-ub9hi1{width:100%;border:1px solid #BBB}.cell.svelte-ub9hi1{width:100%;text-align:center;border:1px solid #BBB}",
  map: null
};
const DOBInfo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { memberData } = $$props;
  let genColor = ["#643486", "#cc0000", "#0099D4", "#eb7f3bf7", "#F680B0"];
  if ($$props.memberData === void 0 && $$bindings.memberData && memberData !== void 0)
    $$bindings.memberData(memberData);
  $$result.css.add(css$1);
  return `<div class="${"card svelte-ub9hi1"}"><div class="${"tbl svelte-ub9hi1"}"><div class="${"cell svelte-ub9hi1"}">${escape(memberData.kanji)}</div>
        <div class="${"cell svelte-ub9hi1"}">${escape(getAge(memberData.dob))}\u6B73 \uFF0F 
            <span style="${"color: " + escape(genColor[memberData.gen - 1], true)}">${escape(memberData.gen)}\u671F\u751F</span></div>
        <div class="${"cell svelte-ub9hi1"}">${escape(JPDateDisplay(memberData.dob))}</div></div>
    <div class="${"pic svelte-ub9hi1"}">pic</div>
</div>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: '.yrgroup.svelte-1nkie6a.svelte-1nkie6a{border:1px solid #999;display:grid;grid-auto-flow:column;grid-template-columns:max-content auto;grid-gap:5px;height:fit-content;padding:5px}.yrCell.svelte-1nkie6a.svelte-1nkie6a{border-right:1px solid black;align-self:center;justify-self:center;height:100%;display:grid}.yrCell.svelte-1nkie6a>div.svelte-1nkie6a{padding:5px;align-self:center}.yrgrouplist.svelte-1nkie6a.svelte-1nkie6a{display:grid;grid-template-columns:repeat(4,max-content);grid-template-rows:repeat(auto-fit, 1fr);justify-items:center;grid-gap:4px}.timeline.svelte-1nkie6a.svelte-1nkie6a{width:max-content;display:flex;flex-direction:column}.print.svelte-1nkie6a.svelte-1nkie6a{display:flex;justify-content:center;align-items:center}button.print.svelte-1nkie6a.svelte-1nkie6a::before,button.print.svelte-1nkie6a.svelte-1nkie6a::after{flex:auto;min-width:50px;height:1px;display:block;content:"";background-color:black}button.print.svelte-1nkie6a.svelte-1nkie6a::before{margin-right:25px}button.print.svelte-1nkie6a.svelte-1nkie6a::after{margin-left:25px}',
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let selectables = getAllMembers();
  let selectedMembers = [];
  let sorted = [];
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${$$result.head += `${$$result.title = `<title>\u4E43\u6728\u574246 \u30FC \u8A95\u751F\u65E5\u30FB\u5B66\u5E74\u30C7\u30FC\u30BF</title>`, ""}<meta name="${"description"}" content="${"\u4E43\u6728\u574246\u8A95\u751F\u65E5\u30FB\u5B66\u5E74\u30C7\u30FC\u30BF"}" data-svelte="svelte-2b3h23">`, ""}

${validate_component(SelectMembersPanel, "SelectMembersPanel").$$render(
      $$result,
      {
        selectables,
        nolimit: true,
        selectedMembers
      },
      {
        selectedMembers: ($$value) => {
          selectedMembers = $$value;
          $$settled = false;
        }
      },
      {}
    )}
<div style="${"width: 50%; margin: 1ch auto 5px auto;"}"><button class="${"print svelte-1nkie6a"}">\u751F\u6210</button></div>
<div class="${"timeline svelte-1nkie6a"}">${each(sorted, (yrgroup) => {
      return `<div class="${"yrgroup svelte-1nkie6a"}"><div class="${"yrCell svelte-1nkie6a"}"><div class="${"svelte-1nkie6a"}">${escape(yrgroup[0])}</div></div>
        <div class="${"yrgrouplist svelte-1nkie6a"}">${each(yrgroup[1], (memberData) => {
        return `${validate_component(DOBInfo, "DOBInfo").$$render($$result, { memberData }, {}, {})}
            `;
      })}</div>
    </div>`;
    })}
</div>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};

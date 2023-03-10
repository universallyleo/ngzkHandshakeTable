import { c as create_ssr_component, e as escape, h as add_attribute, v as validate_component, f as each } from "../../../chunks/index.js";
import { S as SelectMembersPanel } from "../../../chunks/SelectMembersPanel.js";
import { b as getAge, J as JPDateDisplay, h as getAllMembers } from "../../../chunks/processData.js";
const DOBInfo_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".card.svelte-13vnqdt{width:200px;border:1px solid hsl(291, 57%, 50%);height:fit-content}.tbl.svelte-13vnqdt{width:100%;display:grid;grid-template-rows:repeat(3,1fr)}.cell.svelte-13vnqdt{width:100%;text-align:center;border:1px solid #BBB}",
  map: null
};
const DOBInfo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { memberData } = $$props;
  let genColor = ["#643486", "#cc0000", "#0099D4", "#eb7f3bf7", "#F680B0"];
  if ($$props.memberData === void 0 && $$bindings.memberData && memberData !== void 0)
    $$bindings.memberData(memberData);
  $$result.css.add(css$1);
  return `<div class="${"card svelte-13vnqdt"}"><div class="${"tbl svelte-13vnqdt"}"><div class="${"cell svelte-13vnqdt"}">${escape(memberData.kanji)}</div>
        <div class="${"cell svelte-13vnqdt"}">${escape(getAge(memberData.dob))}\u6B73 \uFF0F 
            <span style="${"color: " + escape(genColor[memberData.gen - 1], true)}">${escape(memberData.gen)}\u671F\u751F</span></div>
        <div class="${"cell svelte-13vnqdt"}">${escape(JPDateDisplay(memberData.dob))}</div></div>
    
</div>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".yrgroup.svelte-1bvbcld.svelte-1bvbcld{border:1px solid #999;display:grid;grid-auto-flow:column;grid-template-columns:max-content auto;grid-gap:5px;height:fit-content;padding:5px}.yrCell.svelte-1bvbcld.svelte-1bvbcld{border-right:1px solid black;align-self:center;justify-self:center;height:100%;display:grid}.yrCell.svelte-1bvbcld>div.svelte-1bvbcld{padding:5px;align-self:center}.yrgrouplist.svelte-1bvbcld.svelte-1bvbcld{display:grid;grid-template-columns:repeat(4, 205px);grid-template-rows:repeat(auto-fit, 1fr);justify-items:center;grid-gap:4px}.yrgrouplistByGen.svelte-1bvbcld.svelte-1bvbcld{display:flex;flex-direction:row}.yrgrpSubcolumn.svelte-1bvbcld.svelte-1bvbcld{padding:2px;display:flex;flex-direction:column;width:205px}.timeline.svelte-1bvbcld.svelte-1bvbcld{width:max-content;display:flex;flex-direction:column}.print.svelte-1bvbcld.svelte-1bvbcld{display:flex;justify-content:center;align-items:center}button.print.svelte-1bvbcld.svelte-1bvbcld::before,button.print.svelte-1bvbcld.svelte-1bvbcld::after{flex:auto;min-width:50px;height:1px;display:block;content:'';background-color:black}button.print.svelte-1bvbcld.svelte-1bvbcld::before{margin-right:25px}button.print.svelte-1bvbcld.svelte-1bvbcld::after{margin-left:25px}.optionItem.svelte-1bvbcld.svelte-1bvbcld{margin-left:1rem;margin-top:1ch;margin-bottom:1ch}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let selectables = getAllMembers();
  let selectedMembers = [];
  let sorted = [];
  let mbpanel;
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${$$result.head += `${$$result.title = `<title>\u4E43\u6728\u574246 \u30FC \u8A95\u751F\u65E5\u30FB\u5B66\u5E74\u30C7\u30FC\u30BF</title>`, ""}<meta name="${"description"}" content="${"\u4E43\u6728\u574246\u8A95\u751F\u65E5\u30FB\u5B66\u5E74\u30C7\u30FC\u30BF"}" data-svelte="svelte-1dox1w3">`, ""}

<div class="${"optionItem svelte-1bvbcld"}">\u30B0\u30EB\u30FC\u30D7\u5206\u3051\uFF1A
	<label><input type="${"radio"}" name="${"gpOpt"}"${add_attribute("value", "none", 0)}${add_attribute("checked", true, 1)}> \u306A\u3057
	</label>
	<label><input type="${"radio"}" name="${"gpOpt"}"${add_attribute("value", "gen", 0)}${""}> \u671F\u5225
	</label></div>
${validate_component(SelectMembersPanel, "SelectMembersPanel").$$render(
      $$result,
      {
        selectables,
        nolimit: true,
        selectedMembers,
        this: mbpanel
      },
      {
        selectedMembers: ($$value) => {
          selectedMembers = $$value;
          $$settled = false;
        },
        this: ($$value) => {
          mbpanel = $$value;
          $$settled = false;
        }
      },
      {}
    )}
<div style="${"width: 50%; margin: 1ch auto 5px auto;"}"><button class="${"print svelte-1bvbcld"}">\u751F\u6210</button></div>
<div class="${"timeline svelte-1bvbcld"}">${each(sorted, (yrgroup) => {
      return `<div class="${"yrgroup svelte-1bvbcld"}"><div class="${"yrCell svelte-1bvbcld"}"><div class="${"svelte-1bvbcld"}">${escape(yrgroup[0])}</div></div>
        ${`<div class="${"yrgrouplist svelte-1bvbcld"}">${each(yrgroup[1], (memberData) => {
        return `${validate_component(DOBInfo, "DOBInfo").$$render($$result, { memberData }, {}, {})}
                `;
      })}
        </div>`}
    </div>`;
    })}
</div>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};

import { c as create_ssr_component, d as createEventDispatcher, e as escape, v as validate_component, a as each, b as add_attribute } from "../../../_app/immutable/chunks/index-16508633.js";
import { d as data, S as SelectOneCD } from "../../../_app/immutable/chunks/SelectOneCD-4ae2a59b.js";
import { i as involvedMembers } from "../../../_app/immutable/chunks/util-257069f2.js";
import ProgressTable from "./ProgressTable.svelte.js";
import { uniq } from "lodash-es";
import "./ProgressGraph.svelte.js";
import "chart.js/auto/auto.mjs";
import "chartjs-plugin-datalabels";
const StateButton_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: "button.svelte-1dxr33i{padding:2px;font-size:inherit;font-family:inherit;line-height:1.2}",
  map: null
};
const StateButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { states = [] } = $$props;
  let stateIndex = 0;
  createEventDispatcher();
  if ($$props.states === void 0 && $$bindings.states && states !== void 0)
    $$bindings.states(states);
  $$result.css.add(css$2);
  return `<button class="${"svelte-1dxr33i"}">${escape(states[stateIndex])}
</button>`;
});
const SelectCDs_svelte_svelte_type_style_lang = "";
const RemoveCDTypes_svelte_svelte_type_style_lang = "";
const SelectMembersPanel_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: '.weaker.svelte-1iemf7s{font-size:small;color:hsl(0, 0%, 60%)}[type="checkbox"].svelte-1iemf7s{vertical-align:middle}.memberGrouping.svelte-1iemf7s{margin-top:1ch;margin-right:2em;display:grid;grid-auto-flow:column;grid-template-columns:repeat(auto-fill,auto);grid-column-gap:1.5em}.groupList.svelte-1iemf7s{display:flex;flex-direction:column}',
  map: null
};
const SelectMembersPanel = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let selectGrouping;
  let { selectables } = $$props;
  let { selectedMembers } = $$props;
  if ($$props.selectables === void 0 && $$bindings.selectables && selectables !== void 0)
    $$bindings.selectables(selectables);
  if ($$props.selectedMembers === void 0 && $$bindings.selectedMembers && selectedMembers !== void 0)
    $$bindings.selectedMembers(selectedMembers);
  $$result.css.add(css$1);
  selectGrouping = uniq(selectables.map((x) => x.gen)).sort((a, b) => parseInt(a) - parseInt(b)).map((n) => {
    return {
      "gen": n,
      "labels": [`\u5168${n}\u671F\u751F\u9078\u3076`, `\u5168${n}\u671F\u751F\u5916\u3059`],
      "consistsOf": selectables.filter((x) => x.gen == n)
    };
  });
  return `${selectables.length > 1 ? `${validate_component(StateButton, "StateButton").$$render($$result, { states: ["\u5168\u54E1\u9078\u3076", "\u5168\u54E1\u5916\u3059"] }, {}, {})}
<span class="${"weaker svelte-1iemf7s"}">18\u500B\u4EE5\u4E0B\u3092\u9078\u629E\u3059\u308B\u3053\u3068\u3092\u63A8\u5968\u3057\u307E\u3059</span> <br>` : ``}
<div class="${"memberGrouping svelte-1iemf7s"}">${each(selectGrouping, (mbgroup) => {
    return `<div class="${"groupList svelte-1iemf7s"}">${validate_component(StateButton, "StateButton").$$render($$result, { states: mbgroup.labels }, {}, {})}
    ${each(mbgroup.consistsOf, (itm) => {
      return `<label><input type="${"checkbox"}" name="${"selectedMembers"}"${add_attribute("value", itm.member, 0)} class="${"svelte-1iemf7s"}"${~selectedMembers.indexOf(itm.member) ? add_attribute("checked", true, 1) : ""}>
        ${escape(itm.kanji)}</label>`;
    })}
    </div>`;
  })}
</div>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: 'input.svelte-1h0bd66.svelte-1h0bd66.svelte-1h0bd66,button.svelte-1h0bd66.svelte-1h0bd66.svelte-1h0bd66{font-size:inherit;font-family:inherit;line-height:1.2}button.svelte-1h0bd66.svelte-1h0bd66.svelte-1h0bd66:focus:not(:focus-visible){outline:none}.optionsContainer.svelte-1h0bd66.svelte-1h0bd66.svelte-1h0bd66{width:max-content;margin:10px 1ch;padding:2px 6px;border:1px solid black;display:flex}ul.twocols.svelte-1h0bd66.svelte-1h0bd66.svelte-1h0bd66{display:inline-block;text-align:left;margin:0;padding:0}ul.twocols.svelte-1h0bd66>li.svelte-1h0bd66.svelte-1h0bd66{margin:15px;display:flex;justify-content:left;margin:0}ul.twocols.svelte-1h0bd66>li.svelte-1h0bd66>div.leftcol.svelte-1h0bd66{margin-top:0;margin-bottom:.5ch;margin-right:.2em;width:75px}ul.twocols.svelte-1h0bd66>li.svelte-1h0bd66>div.rightcol.svelte-1h0bd66{margin-top:0;margin-bottom:.5ch;margin-right:1em}.print.svelte-1h0bd66.svelte-1h0bd66.svelte-1h0bd66{display:flex;justify-content:center;align-items:center}button.print.svelte-1h0bd66.svelte-1h0bd66.svelte-1h0bd66::before,button.print.svelte-1h0bd66.svelte-1h0bd66.svelte-1h0bd66::after{flex:auto;min-width:50px;height:1px;display:block;content:"";background-color:black}button.print.svelte-1h0bd66.svelte-1h0bd66.svelte-1h0bd66::before{margin-right:25px}button.print.svelte-1h0bd66.svelte-1h0bd66.svelte-1h0bd66::after{margin-left:25px}.cdList.svelte-1h0bd66.svelte-1h0bd66.svelte-1h0bd66{grid-area:2/1/3/3}.cdProgressionOption.svelte-1h0bd66.svelte-1h0bd66.svelte-1h0bd66{display:grid;grid-template-columns:255px auto;grid-template-rows:auto;grid-template-areas:"row1L row2R"\r\n                        "longbox longbox"}.fixOption.svelte-1h0bd66.svelte-1h0bd66.svelte-1h0bd66{grid-area:"row1L";margin-left:5px;margin-top:.2ch;margin-bottom:1ch}.selectFix.svelte-1h0bd66.svelte-1h0bd66.svelte-1h0bd66{grid-area:"row1R";margin-top:.2ch;margin-bottom:1ch}.longSelection.svelte-1h0bd66.svelte-1h0bd66.svelte-1h0bd66{margin-left:5px;grid-area:2/1/3/3}',
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let seriesTypes = [
    {
      "display": "\u500B\u5225\u5186\u76E4\u306E\u5404\u53D7\u4ED8\u5B8C\u58F2\u6570\u63A8\u79FB",
      "value": "cdProgression"
    },
    {
      "display": "\u500B\u5225\u30E1\u30F3\u30D0\u30FC\u306E\u7DCF\u5B8C\u58F2\u6570\u63A8\u79FB",
      "value": "overallProgression"
    },
    {
      "display": "\u500B\u5225\u30E1\u30F3\u30D0\u30FC\u306EN\u6B21\u53D7\u4ED8\u307E\u3067\u306E\u5B8C\u58F2\u6570\u63A8\u79FB",
      "value": "receptionProgression"
    }
  ];
  let fixTypes = [
    { "display": "\u5186\u76E4", "value": "fixCD" },
    { "display": "\u30E1\u30F3\u30D0\u30FC", "value": "fixMember" }
  ];
  let seriesOpt = "cdProgression";
  let fixOpt = "fixCD";
  let mode = "fixCD";
  let members = ["Yumiki Nao", "Kanagawa Saya", "Sato Kaede"];
  let includings = [data[data.length - 1]];
  let selectedCD = data[data.length - 1];
  let selectedMembers = members;
  let selectables = involvedMembers(selectedCD);
  let extra = {};
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      {
        {
          {
            selectables = involvedMembers(selectedCD);
          }
        }
      }
    }
    $$rendered = `${$$result.head += `${$$result.title = `<title>\u4E43\u6728\u574246\u5B8C\u58F2\u6570\u63A8\u79FB</title>`, ""}<meta name="${"description"}" content="${"\u4E43\u6728\u574246\u5B8C\u58F2\u6570\u63A8\u79FB"}" data-svelte="svelte-xnpnvr">`, ""}

<div class="${"optionsContainer svelte-1h0bd66"}"><ul class="${"twocols svelte-1h0bd66"}"><li class="${"svelte-1h0bd66"}"><div class="${"leftcol svelte-1h0bd66"}">\u7CFB\u5217\u69CB\u6210:</div>
            <div class="${"rightcol svelte-1h0bd66"}">${each(seriesTypes, (ser) => {
      return `
                <label><input type="${"radio"}" name="${"seriesOpt"}"${add_attribute("id", ser.value, 0)}${add_attribute("value", ser.value, 0)} class="${"svelte-1h0bd66"}"${ser.value === seriesOpt ? add_attribute("checked", true, 1) : ""}>
                    ${escape(ser.display)}
                </label>`;
    })}</div></li>
        <li class="${"svelte-1h0bd66"}"><div class="${"leftcol svelte-1h0bd66"}">\u30C7\u30FC\u30BF:</div>
            <div class="${"rightcol svelte-1h0bd66"}">${`<div class="${"cdProgressionOption svelte-1h0bd66"}"><div class="${"fixOption svelte-1h0bd66"}">\u56FA\u5B9A\u5BFE\u8C61:
                ${each(fixTypes, (ft) => {
      return `<label><input type="${"radio"}" name="${"fixOpt"}"${add_attribute("id", ft.value, 0)}${add_attribute("value", ft.value, 0)} class="${"svelte-1h0bd66"}"${ft.value === fixOpt ? add_attribute("checked", true, 1) : ""}>
                        ${escape(ft.display)}
                    </label>`;
    })}</div>
                ${`<div class="${"selectFix svelte-1h0bd66"}">${validate_component(SelectOneCD, "SelectOneCD").$$render(
      $$result,
      { selectedCDData: selectedCD },
      {
        selectedCDData: ($$value) => {
          selectedCD = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>
                <div class="${"longSelection svelte-1h0bd66"}">${validate_component(SelectMembersPanel, "SelectMembersPanel").$$render(
      $$result,
      { selectables, selectedMembers },
      {
        selectedMembers: ($$value) => {
          selectedMembers = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>`}

                ${``}</div>`}

            ${``}

            ${``}</div></li>
        <li class="${"svelte-1h0bd66"}"><div style="${"width: 50%; margin: 1ch auto 5px auto;"}"><button class="${"print svelte-1h0bd66"}">\u30B0\u30E9\u30D5\u4F5C\u6210\u3059\u308B</button></div></li></ul></div>

${validate_component(ProgressTable, "ProgressTable").$$render($$result, { mode, members, includings, extra }, {}, {})}`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};

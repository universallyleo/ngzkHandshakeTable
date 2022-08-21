import { c as create_ssr_component, o as onDestroy, e as escape, b as add_attribute, a as each, v as validate_component, d as createEventDispatcher } from "../../_app/immutable/chunks/index-16508633.js";
import { a as cdData, g as getMember, d as data, i as involvedMembers } from "../../_app/immutable/chunks/util-9274ca4a.js";
import { range, find, uniq } from "lodash-es";
import "chart.js/auto/auto.js";
import "chartjs-plugin-datalabels";
const ProgressGraph = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let canvasWidth;
  let { datum } = $$props;
  let { mode } = $$props;
  let maxlength = 0;
  let canvasContainer;
  let thechart;
  onDestroy(() => {
    if (thechart)
      thechart.destroy();
    thechart = null;
  });
  if ($$props.datum === void 0 && $$bindings.datum && datum !== void 0)
    $$bindings.datum(datum);
  if ($$props.mode === void 0 && $$bindings.mode && mode !== void 0)
    $$bindings.mode(mode);
  canvasWidth = Math.max(maxlength * 50, 800);
  return `<div style="${"width:" + escape(canvasWidth, true) + "px"}"${add_attribute("this", canvasContainer, 0)}><canvas${add_attribute("this", thechart, 0)}></canvas></div>`;
});
const ProgressTable_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: ".container.svelte-ilcu8n.svelte-ilcu8n{width:max-content}.graphContainer.svelte-ilcu8n.svelte-ilcu8n{width:max-content;margin:0 auto}th.svelte-ilcu8n.svelte-ilcu8n,td.svelte-ilcu8n.svelte-ilcu8n{text-align:center;padding:4px 5px}.weaker.svelte-ilcu8n.svelte-ilcu8n{font-size:small;color:hsl(0, 0%, 60%)}tbody.svelte-ilcu8n tr.svelte-ilcu8n:nth-child(odd){background-color:#efefef}.table-bordered.svelte-ilcu8n.svelte-ilcu8n{table-layout:fixed;border:1px solid #ddd !important;border-spacing:0!important;border-collapse:collapse;display:block;overflow-x:auto;margin:0 auto;font-family:Arial, Helvetica, sans-serif}.headingRow.svelte-ilcu8n.svelte-ilcu8n{border-bottom:1px solid #ddd}.headingCell.svelte-ilcu8n.svelte-ilcu8n{padding-left:.4em;padding-right:.2em;border-right:1px solid black;border-top:1px solid #ddd;border-bottom:1px solid #ddd}.cdInfo.svelte-ilcu8n.svelte-ilcu8n{width:100px;max-width:140px}",
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
  let mode;
  let numSlots;
  let progressData;
  let { members } = $$props;
  let { includings } = $$props;
  function progression(memberName, cd) {
    let res = {
      cd: cd.cd,
      member: memberName,
      total: [],
      diff: Array(cd.lastDraw).fill(0)
    };
    let mbTable = find(cd.table, ["member", memberName]);
    if (mbTable) {
      let flatSlots = mbTable.slotsSold.map((row) => row.split("|")).flat();
      flatSlots.map((e) => e.match(/^\d+$/) ? res.diff[parseInt(e) - 1]++ : 0);
      let sum = 0;
      res.total = res.diff.map((x) => sum += x);
    }
    return res;
  }
  if ($$props.members === void 0 && $$bindings.members && members !== void 0)
    $$bindings.members(members);
  if ($$props.includings === void 0 && $$bindings.includings && includings !== void 0)
    $$bindings.includings(includings);
  $$result.css.add(css$2);
  mode = includings.length > 1 ? "fixMember" : "fixCD";
  numSlots = mode == "fixMember" ? Math.max(...includings.map((x) => x.lastDraw)) : includings[0].lastDraw;
  progressData = mode == "fixCD" ? members.map((x) => progression(x, includings[0])) : includings.map((x) => progression(members[0], x));
  {
    progressData.map((t) => extendProgressData(t, numSlots));
  }
  return `<div class="${"container svelte-ilcu8n"}"><table class="${"table-bordered svelte-ilcu8n"}"><caption>\u7D2F\u8A08\u5B8C\u58F2\u6570\u306E\u63A8\u79FB <span class="${"weaker svelte-ilcu8n"}">(N\u6B21\u53D7\u4ED8\u306E\u5B8C\u58F2\u6570)</span></caption>
        <thead><th class="${"svelte-ilcu8n"}"></th>
            ${each(range(numSlots), (i) => {
    return `<th class="${"headingRow svelte-ilcu8n"}">${escape(i + 1)}</th>`;
  })}</thead>
    
        <tbody class="${"svelte-ilcu8n"}">${each(progressData, (series) => {
    return `<tr class="${"svelte-ilcu8n"}"><td class="${"headingCell cdInfo svelte-ilcu8n"}">${mode == "fixMember" ? `${escape(cdData(series.cd).display)}` : `${escape(getMember(series.member).kanji)}`}</td>
            ${each(range(numSlots), (i) => {
      return `<td class="${"svelte-ilcu8n"}">${escape(series.total[i])} 
                    ${series.total[i] != "-" ? `<span class="${"weaker svelte-ilcu8n"}">(+${escape(series.diff[i])})</span>` : ``}
                </td>`;
    })}
            </tr>`;
  })}</tbody></table>
    <div class="${"graphContainer svelte-ilcu8n"}">${validate_component(ProgressGraph, "ProgressGraph").$$render($$result, { mode, datum: progressData }, {}, {})}</div>
</div>`;
});
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
const progress_svelte_svelte_type_style_lang = "";
const css = {
  code: 'input.svelte-1kpf3c9.svelte-1kpf3c9.svelte-1kpf3c9,button.svelte-1kpf3c9.svelte-1kpf3c9.svelte-1kpf3c9{font-size:inherit;font-family:inherit;line-height:1.2}button.svelte-1kpf3c9.svelte-1kpf3c9.svelte-1kpf3c9:focus:not(:focus-visible){outline:none}.optionsContainer.svelte-1kpf3c9.svelte-1kpf3c9.svelte-1kpf3c9{width:max-content;margin:10px 1ch;padding:2px 6px;border:1px solid black;display:flex}ul.twocols.svelte-1kpf3c9.svelte-1kpf3c9.svelte-1kpf3c9{display:inline-block;text-align:left;margin:0;padding:0}ul.twocols.svelte-1kpf3c9>li.svelte-1kpf3c9.svelte-1kpf3c9{margin:15px 0 15px;display:flex;justify-content:left;margin:0}ul.twocols.svelte-1kpf3c9>li.svelte-1kpf3c9>div.leftcol.svelte-1kpf3c9{flex:none;margin:0;width:max-content}.weaker.svelte-1kpf3c9.svelte-1kpf3c9.svelte-1kpf3c9{font-size:small;color:hsl(0, 0%, 60%)}.print.svelte-1kpf3c9.svelte-1kpf3c9.svelte-1kpf3c9{margin-left:20px;height:100%;margin-top:auto;margin-bottom:5px}[type="checkbox"].svelte-1kpf3c9.svelte-1kpf3c9.svelte-1kpf3c9{vertical-align:middle}.memberGrouping.svelte-1kpf3c9.svelte-1kpf3c9.svelte-1kpf3c9{display:grid;grid-auto-flow:column;grid-template-columns:repeat(auto-fill,auto);grid-column-gap:1.5em}.groupList.svelte-1kpf3c9.svelte-1kpf3c9.svelte-1kpf3c9{display:flex;flex-direction:column}.cdList.svelte-1kpf3c9.svelte-1kpf3c9.svelte-1kpf3c9{margin-top:1.2ch;display:grid;grid-auto-flow:column;grid-column-gap:1.5em;grid-template-rows:repeat(10,auto)}',
  map: null
};
const Progress = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let seriesTypes = [
    {
      "display": "\u500B\u5225\u5186\u76E4\u306E\u5404\u53D7\u4ED8\u5B8C\u58F2\u6570\u63A8\u79FB",
      "value": "cdProgression"
    }
  ];
  let fixTypes = [
    { "display": "\u5186\u76E4", "value": "fixCD" },
    { "display": "\u30E1\u30F3\u30D0\u30FC", "value": "fixMember" }
  ];
  let seriesOpt = "cdProgression";
  let fixOpt = "fixCD";
  let allcds = [
    { num: 30, type: "Single" },
    { num: 29, type: "Single" },
    { num: 28, type: "Single" }
  ];
  let members = ["Yumiki Nao", "Kanagawa Saya", "Sato Kaede"];
  let includings = allcds.map((y) => find(data, (x) => x.cd.num == y.num && x.cd.type == y.type));
  let cdlist = data.map((x) => cdData(x.cd)).reverse();
  let selAllMBLabel = "\u5168\u54E1\u9078\u629E";
  let selectGrouping = [];
  let selectedCD = 0;
  let selectedMembers = [];
  let selectables = involvedMembers(data[cdlist.length - 1 - selectedCD]);
  $$result.css.add(css);
  {
    {
      {
        selectables = involvedMembers(data[cdlist.length - 1 - selectedCD]);
        selectGrouping = uniq(selectables.map((x) => x.gen)).sort((a, b) => parseInt(a) - parseInt(b)).map((n) => {
          return {
            "gen": n,
            "labels": [`\u5168${n}\u671F\u751F\u9078\u3076`, `\u5168${n}\u671F\u751F\u5916\u3059`],
            "consistsOf": selectables.filter((x) => x.gen == n)
          };
        });
      }
    }
  }
  return `${$$result.head += `${$$result.title = `<title>\u4E43\u6728\u574246\u5B8C\u58F2\u30C7\u30FC\u30BF\u63A8\u79FB</title>`, ""}<meta name="${"description"}" content="${"\u4E43\u6728\u574246\u5B8C\u58F2\u30C7\u30FC\u30BF\u63A8\u79FB"}" data-svelte="svelte-6g9vkf">`, ""}

<div class="${"optionsContainer svelte-1kpf3c9"}"><ul class="${"twocols svelte-1kpf3c9"}"><li class="${"svelte-1kpf3c9"}"><div class="${"leftcol svelte-1kpf3c9"}">\u7CFB\u5217\u69CB\u6210:</div>
            <div class="${"rightcol"}">${each(seriesTypes, (ser) => {
    return `
                <label><input type="${"radio"}" name="${"seriesOpt"}"${add_attribute("id", ser.value, 0)}${add_attribute("value", ser.value, 0)} class="${"svelte-1kpf3c9"}"${ser.value === seriesOpt ? add_attribute("checked", true, 1) : ""}>
                    ${escape(ser.display)}
                </label>`;
  })}
                </div></li>
        <li class="${"svelte-1kpf3c9"}"><div class="${"leftcol svelte-1kpf3c9"}">\u56FA\u5B9A\u5BFE\u8C61:</div>
            <div class="${"rightcol"}">${each(fixTypes, (ft) => {
    return `<label><input type="${"radio"}" name="${"fixOpt"}"${add_attribute("id", ft.value, 0)}${add_attribute("value", ft.value, 0)} class="${"svelte-1kpf3c9"}"${ft.value === fixOpt ? add_attribute("checked", true, 1) : ""}>
                    ${escape(ft.display)}
                </label>`;
  })}                    
            ${`
                <div><select id="${"cdSelect"}" name="${"cd"}">${each(cdlist, (cd, i) => {
    return `<option${add_attribute("value", i, 0)}>${escape(cd.display)}</option>`;
  })}</select>
                    ${selectables.length > 1 ? `<button class="${"svelte-1kpf3c9"}">${escape(selAllMBLabel)}</button> <span class="${"weaker svelte-1kpf3c9"}">18\u500B\u4EE5\u4E0B\u3092\u9078\u629E\u3059\u308B\u3053\u3068\u3092\u63A8\u5968\u3057\u307E\u3059</span> <br>` : ``} 
                    <br>
                    <div class="${"memberGrouping svelte-1kpf3c9"}">${each(selectGrouping, (mbgroup) => {
    return `<div class="${"groupList svelte-1kpf3c9"}">${validate_component(StateButton, "StateButton").$$render($$result, { states: mbgroup.labels }, {}, {})}
                        ${each(mbgroup.consistsOf, (itm) => {
      return `<label><input type="${"checkbox"}" name="${"selectedMembers"}"${add_attribute("value", itm.member, 0)} class="${"svelte-1kpf3c9"}"${~selectedMembers.indexOf(itm.member) ? add_attribute("checked", true, 1) : ""}>
                            ${escape(itm.kanji)}</label>`;
    })}
                        </div>`;
  })}</div></div>`}
            ${``}</div>
            <div class="${"print svelte-1kpf3c9"}"><button class="${"svelte-1kpf3c9"}">\u30B0\u30E9\u30D5\u4F5C\u6210\u3059\u308B</button></div></li></ul></div>

${validate_component(ProgressTable, "ProgressTable").$$render($$result, { members, includings }, {}, {})}`;
});
export {
  Progress as default
};

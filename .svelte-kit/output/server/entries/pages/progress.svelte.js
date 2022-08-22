import { c as create_ssr_component, o as onDestroy, e as escape, b as add_attribute, a as each, v as validate_component, d as createEventDispatcher } from "../../_app/immutable/chunks/index-16508633.js";
import { g as getMember, a as cdData, n as nthColor, b as getNumSold, i as involvedMembers, d as data, S as SelectOneCD } from "../../_app/immutable/chunks/SelectOneCD-9e48dad4.js";
import { range, find, uniq } from "lodash-es";
import "chart.js/auto/auto.mjs";
import "chartjs-plugin-datalabels";
const ProgressGraph = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let canvasWidth;
  let { progressData } = $$props;
  let { title } = $$props;
  let { maxlength } = $$props;
  let canvasContainer;
  let thechart;
  console.log(maxlength);
  onDestroy(() => {
    if (thechart)
      thechart.destroy();
    thechart = null;
  });
  if ($$props.progressData === void 0 && $$bindings.progressData && progressData !== void 0)
    $$bindings.progressData(progressData);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.maxlength === void 0 && $$bindings.maxlength && maxlength !== void 0)
    $$bindings.maxlength(maxlength);
  progressData.spanGaps = true;
  maxlength = progressData ? progressData.datasets[0].data.length : 0;
  canvasWidth = Math.max(maxlength * 100, 1e3);
  return `<div style="${"width:" + escape(canvasWidth, true) + "px"}"${add_attribute("this", canvasContainer, 0)}><canvas${add_attribute("this", thechart, 0)}></canvas></div>`;
});
const ProgressTable_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: ".container.svelte-ilcu8n.svelte-ilcu8n{width:max-content}.graphContainer.svelte-ilcu8n.svelte-ilcu8n{width:max-content;margin:0 auto}th.svelte-ilcu8n.svelte-ilcu8n,td.svelte-ilcu8n.svelte-ilcu8n{text-align:center;padding:4px 5px}.weaker.svelte-ilcu8n.svelte-ilcu8n{font-size:small;color:hsl(0, 0%, 60%)}tbody.svelte-ilcu8n tr.svelte-ilcu8n:nth-child(odd){background-color:#efefef}.table-bordered.svelte-ilcu8n.svelte-ilcu8n{table-layout:fixed;border:1px solid #ddd !important;border-spacing:0!important;border-collapse:collapse;display:block;overflow-x:auto;margin:0 auto;font-family:Arial, Helvetica, sans-serif}.headingRow.svelte-ilcu8n.svelte-ilcu8n{border-bottom:1px solid #ddd}.headingCell.svelte-ilcu8n.svelte-ilcu8n{padding-left:.4em;padding-right:.2em;border-right:1px solid black;border-top:1px solid #ddd;border-bottom:1px solid #ddd}.cdInfo.svelte-ilcu8n.svelte-ilcu8n{width:100px;max-width:140px}",
  map: null
};
function extendCDProgressData(data2, toLength) {
  let len = data2.main.length;
  for (let i = len; i < toLength; i++) {
    data2.main.push("-");
    data2.sub.push("-");
  }
}
const ProgressTable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { mode } = $$props;
  let { members } = $$props;
  let { includings } = $$props;
  function cdprogression(memberName, cd) {
    let res = {
      cd: cd.cd,
      member: memberName,
      main: [],
      sub: Array(cd.lastDraw).fill(0)
    };
    let mbTable = find(cd.table, ["member", memberName]);
    if (mbTable) {
      let flatSlots = mbTable.slotsSold.map((row) => row.split("|")).flat();
      flatSlots.map((e) => e.match(/^\d+$/) ? res.sub[parseInt(e) - 1]++ : 0);
      let sum = 0;
      res.main = res.sub.map((x) => sum += x);
    }
    return res;
  }
  function soldProgressionPerCD(memberName, atdraw = -1) {
    let soldatcd = [], accum = [];
    let lastNumericIdx = -1;
    for (let i = 0; i < includings.length; i++) {
      let frac = getNumSold(includings[i].table.find((x) => x.member == memberName), atdraw);
      if (frac[1] == "N/A") {
        soldatcd.push(["-", "-"]);
        accum.push("-");
      } else {
        soldatcd.push(frac);
        accum.push(lastNumericIdx > -1 ? accum[lastNumericIdx] + frac[0] : frac[0]);
        lastNumericIdx = i;
      }
    }
    return {
      member: memberName,
      main: accum,
      sub: soldatcd
    };
  }
  function subdataDisplayInTable(x) {
    if (mode.slice(0, 3) == "fix")
      return `(+${x})`;
    if (mode == "overallProgression")
      return `(+${x[0]}/${x[1]})`;
  }
  let numSlots = 0;
  let progressData = {};
  let title = "";
  let maxlength = 0;
  let datum = [];
  let caption, subcaption;
  let seriesLabels = [];
  let xAxisLabels = [];
  let headings = [];
  const skipped = (ctx, value) => ctx.p0.skip || ctx.p1.skip ? value : void 0;
  if ($$props.mode === void 0 && $$bindings.mode && mode !== void 0)
    $$bindings.mode(mode);
  if ($$props.members === void 0 && $$bindings.members && members !== void 0)
    $$bindings.members(members);
  if ($$props.includings === void 0 && $$bindings.includings && includings !== void 0)
    $$bindings.includings(includings);
  $$result.css.add(css$3);
  {
    {
      seriesLabels = [], datum = [], xAxisLabels = [];
      if (mode.slice(0, 3) == "fix") {
        if (mode == "fixCD") {
          members.map((x) => {
            datum.push(cdprogression(x, includings[0]));
            seriesLabels.push(getMember(x).kanji);
          });
          title = `\u5BFE\u8C61\u5186\u76E4\uFF1A ${cdData(datum[0].cd).display}`;
          numSlots = includings[0].lastDraw;
        }
        if (mode == "fixMember") {
          includings.map((x) => {
            datum.push(cdprogression(members[0], x));
            seriesLabels.push(cdData(x.cd).display);
          });
          title = `\u5BFE\u8C61\u30E1\u30F3\u30D0\u30FC\uFF1A ${getMember(datum[0].member).kanji}`;
          numSlots = Math.max(...includings.map((x) => x.lastDraw));
        }
        datum.map((t) => extendCDProgressData(t, numSlots));
        caption = "\u7D2F\u8A08\u5B8C\u58F2\u6570\u306E\u63A8\u79FB";
        subcaption = "(N\u6B21\u53D7\u4ED8\u306E\u5B8C\u58F2\u6570)";
        let lengths = datum.map((entry) => entry.main.length);
        maxlength = Math.max(...lengths);
        xAxisLabels = range(1, maxlength + 1);
        headings = xAxisLabels;
      }
      if (mode == "overallProgression") {
        numSlots = includings.length;
        datum = members.map((x) => soldProgressionPerCD(x));
        seriesLabels = members.map((x) => getMember(x).kanji);
        title = "\u7DCF\u5B8C\u58F2\u6570\u63A8\u79FB";
        caption = "\u7D2F\u8A08\u7DCF\u5B8C\u58F2\u6570";
        subcaption = "(\u5186\u76E4\u306E\u7DCF\u5B8C\u58F2\u90E8\u6570 / \u6700\u5927\u53EF\u80FD\u5B8C\u58F2\u6570)";
        xAxisLabels = includings.map((x) => cdData(x.cd).display);
        headings = xAxisLabels.map((x) => x.replace(/\s/, "<br>"));
      }
      datum = datum;
      let graph = { labels: xAxisLabels, datasets: [] };
      for (let i = 0; i < datum.length; i++) {
        let res = {
          label: seriesLabels[i],
          data: datum[i].main,
          borderColor: `${nthColor(i)}`,
          backgroundColor: `${nthColor(i)}`,
          pointHitRadius: 20,
          segment: {
            borderColor: (ctx) => skipped(ctx, "rgb(0,0,0,0.5)"),
            borderDash: (ctx) => skipped(ctx, [6, 6])
          },
          spanGaps: true,
          datalabels: {
            color: "white",
            backgroundColor: `${nthColor(i)}`
          }
        };
        graph["datasets"].push(res);
      }
      progressData = graph;
    }
  }
  return `<div class="${"container svelte-ilcu8n"}"><table class="${"table-bordered svelte-ilcu8n"}"><caption>${escape(caption)} <span class="${"weaker svelte-ilcu8n"}">${escape(subcaption)}</span></caption>
        <thead><th class="${"svelte-ilcu8n"}"></th>
            ${each(headings, (lb) => {
    return `<th class="${"headingRow svelte-ilcu8n"}"><!-- HTML_TAG_START -->${lb}<!-- HTML_TAG_END --></th>`;
  })}</thead>
    
        <tbody class="${"svelte-ilcu8n"}">${each(datum, (series, j) => {
    return `<tr class="${"svelte-ilcu8n"}"><td class="${"headingCell cdInfo svelte-ilcu8n"}">${escape(seriesLabels[j])}</td>
            ${each(range(numSlots), (i) => {
      return `<td class="${"svelte-ilcu8n"}">${escape(series.main[i])} 
                    ${!isNaN(series.main[i]) ? `<span class="${"weaker svelte-ilcu8n"}">${escape(subdataDisplayInTable(series.sub[i]))}</span>` : ``}
                </td>`;
    })}
            </tr>`;
  })}</tbody></table>
    <div class="${"graphContainer svelte-ilcu8n"}">${validate_component(ProgressGraph, "ProgressGraph").$$render($$result, { title, progressData, maxlength }, {}, {})}</div>
</div>`;
});
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
const progress_svelte_svelte_type_style_lang = "";
const css = {
  code: 'input.svelte-efwcs7.svelte-efwcs7.svelte-efwcs7,button.svelte-efwcs7.svelte-efwcs7.svelte-efwcs7{font-size:inherit;font-family:inherit;line-height:1.2}button.svelte-efwcs7.svelte-efwcs7.svelte-efwcs7:focus:not(:focus-visible){outline:none}.optionsContainer.svelte-efwcs7.svelte-efwcs7.svelte-efwcs7{width:max-content;margin:10px 1ch;padding:2px 6px;border:1px solid black;display:flex}ul.twocols.svelte-efwcs7.svelte-efwcs7.svelte-efwcs7{display:inline-block;text-align:left;margin:0;padding:0}ul.twocols.svelte-efwcs7>li.svelte-efwcs7.svelte-efwcs7{margin:15px 0 15px;display:flex;justify-content:left;margin:0}ul.twocols.svelte-efwcs7>li.svelte-efwcs7>div.leftcol.svelte-efwcs7{flex:none;margin:0;width:max-content}.print.svelte-efwcs7.svelte-efwcs7.svelte-efwcs7{width:50%;margin-left:auto;margin-right:auto;margin-top:1ch;margin-bottom:5px}[type="checkbox"].svelte-efwcs7.svelte-efwcs7.svelte-efwcs7{vertical-align:middle}.cdList.svelte-efwcs7.svelte-efwcs7.svelte-efwcs7{grid-area:2/1/3/3;display:grid;grid-auto-flow:column;grid-column-gap:1em;grid-template-rows:repeat(5,auto)}.cdProgressionOption.svelte-efwcs7.svelte-efwcs7.svelte-efwcs7{display:grid;grid-template-columns:280px auto;grid-template-rows:auto;grid-template-areas:"row1L row2R"\r\n                        "longbox longbox"}.fixOption.svelte-efwcs7.svelte-efwcs7.svelte-efwcs7{grid-area:"row1L";margin-left:5px;margin-top:.2ch;margin-bottom:1ch}.selectFix.svelte-efwcs7.svelte-efwcs7.svelte-efwcs7{grid-area:"row1R";margin-top:.2ch;margin-bottom:1ch}.longSelection.svelte-efwcs7.svelte-efwcs7.svelte-efwcs7{margin-left:5px;grid-area:2/1/3/3}',
  map: null
};
const Progress = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let seriesTypes = [
    {
      "display": "\u500B\u5225\u5186\u76E4\u306E\u5404\u53D7\u4ED8\u5B8C\u58F2\u6570\u63A8\u79FB",
      "value": "cdProgression"
    },
    {
      "display": "\u500B\u5225\u30E1\u30F3\u30D0\u30FC\u306E\u7DCF\u5B8C\u58F2\u6570\u63A8\u79FB",
      "value": "overallProgression"
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

<div class="${"optionsContainer svelte-efwcs7"}"><ul class="${"twocols svelte-efwcs7"}"><li class="${"svelte-efwcs7"}"><div class="${"leftcol svelte-efwcs7"}">\u7CFB\u5217\u69CB\u6210:</div>
            <div class="${"rightcol"}">${each(seriesTypes, (ser) => {
      return `
                <label><input type="${"radio"}" name="${"seriesOpt"}"${add_attribute("id", ser.value, 0)}${add_attribute("value", ser.value, 0)} class="${"svelte-efwcs7"}"${ser.value === seriesOpt ? add_attribute("checked", true, 1) : ""}>
                    ${escape(ser.display)}
                </label>`;
    })}</div></li>
        <li class="${"svelte-efwcs7"}"><div class="${"leftcol svelte-efwcs7"}">\u30C7\u30FC\u30BF:</div>
            <div class="${"rightcol"}">${`<div class="${"cdProgressionOption svelte-efwcs7"}"><div class="${"fixOption svelte-efwcs7"}">\u56FA\u5B9A\u5BFE\u8C61:
                ${each(fixTypes, (ft) => {
      return `<label><input type="${"radio"}" name="${"fixOpt"}"${add_attribute("id", ft.value, 0)}${add_attribute("value", ft.value, 0)} class="${"svelte-efwcs7"}"${ft.value === fixOpt ? add_attribute("checked", true, 1) : ""}>
                        ${escape(ft.display)}
                    </label>`;
    })}</div>
                ${`<div class="${"selectFix svelte-efwcs7"}">${validate_component(SelectOneCD, "SelectOneCD").$$render(
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
                <div class="${"longSelection svelte-efwcs7"}">${validate_component(SelectMembersPanel, "SelectMembersPanel").$$render(
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

            ${``}</div></li>
        <li class="${"svelte-efwcs7"}"><div class="${"print svelte-efwcs7"}"><button class="${"svelte-efwcs7"}">\u30B0\u30E9\u30D5\u4F5C\u6210\u3059\u308B</button></div></li></ul></div>

${validate_component(ProgressTable, "ProgressTable").$$render($$result, { mode, members, includings }, {}, {})}`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Progress as default
};

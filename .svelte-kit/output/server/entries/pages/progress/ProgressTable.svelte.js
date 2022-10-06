import { c as create_ssr_component, e as escape, a as each, v as validate_component } from "../../../_app/immutable/chunks/index-16508633.js";
import { g as getMember, a as cdData, n as nthColor, b as getNumSold } from "../../../_app/immutable/chunks/util-257069f2.js";
import { range, find } from "lodash-es";
import ProgressGraph from "./ProgressGraph.svelte.js";
import "chart.js/auto/auto.mjs";
import "chartjs-plugin-datalabels";
const ProgressTable_svelte_svelte_type_style_lang = "";
const css = {
  code: ".container.svelte-1si6rt8.svelte-1si6rt8{width:max-content}.graphContainer.svelte-1si6rt8.svelte-1si6rt8{width:max-content;margin:0 auto}th.svelte-1si6rt8.svelte-1si6rt8,td.svelte-1si6rt8.svelte-1si6rt8{text-align:center;padding:4px 5px}.weaker.svelte-1si6rt8.svelte-1si6rt8{font-size:small;color:hsl(0, 0%, 60%)}tbody.svelte-1si6rt8 tr.svelte-1si6rt8:nth-child(odd){background-color:#efefef}.table-bordered.svelte-1si6rt8.svelte-1si6rt8{table-layout:fixed;border:1px solid #ddd !important;border-spacing:0!important;border-collapse:collapse;display:block;overflow-x:auto;margin:0 auto;font-family:Arial, Helvetica, sans-serif}.headingRow.svelte-1si6rt8.svelte-1si6rt8{border-bottom:1px solid #ddd}.headingCell.svelte-1si6rt8.svelte-1si6rt8{padding-left:.4em;padding-right:.2em;border-right:1px solid black;border-top:1px solid #ddd;border-bottom:1px solid #ddd}.cdInfo.svelte-1si6rt8.svelte-1si6rt8{width:100px;max-width:140px}",
  map: null
};
function extendCDProgressData(data, toLength) {
  let len = data.main.length;
  for (let i = len; i < toLength; i++) {
    data.main.push("-");
    data.sub.push("-");
  }
}
const ProgressTable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { mode } = $$props;
  let { members } = $$props;
  let { includings } = $$props;
  let { extra = {} } = $$props;
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
      let frac;
      if (atdraw <= includings[i].lastDraw) {
        frac = getNumSold(includings[i].table.find((x) => x.member == memberName), atdraw);
        if (frac[1] == "N/A") {
          soldatcd.push(["-", "-"]);
          accum.push("-");
        } else {
          soldatcd.push(frac);
          accum.push(lastNumericIdx > -1 ? accum[lastNumericIdx] + frac[0] : frac[0]);
          lastNumericIdx = i;
        }
      } else {
        soldatcd.push(["-", "-"]);
        accum.push("-");
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
    if (mode == "receptionProgression")
      return `/${x}`;
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
  if ($$props.extra === void 0 && $$bindings.extra && extra !== void 0)
    $$bindings.extra(extra);
  $$result.css.add(css);
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
      if (mode == "receptionProgression") {
        numSlots = includings.length;
        if (!("atdraw" in extra))
          console.log("Something wrong.  Need to specify 'atdraw' for this option.");
        let temp = members.map((x) => soldProgressionPerCD(x, extra.atdraw));
        console.log(temp);
        datum = temp.map((x) => {
          return {
            member: x.member,
            main: x.sub.map((y) => y[0]),
            sub: x.sub.map((y) => y[1])
          };
        });
        console.log(datum);
        seriesLabels = members.map((x) => getMember(x).kanji);
        title = `${extra.atdraw}\u6B21\u53D7\u4ED8\u307E\u3067\u306E\u5B8C\u58F2\u6570\u63A8\u79FB`;
        caption = `${extra.atdraw}\u6B21\u53D7\u4ED8\u307E\u3067\u306E\u5B8C\u58F2\u6570`;
        subcaption = " / \u5186\u76E4\u306E\u6700\u5927\u53EF\u80FD\u5B8C\u58F2\u6570";
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
  return `<div class="${"container svelte-1si6rt8"}"><table class="${"table-bordered svelte-1si6rt8"}"><caption>${escape(caption)} <span class="${"weaker svelte-1si6rt8"}">${escape(subcaption)}</span></caption>
        <thead><th class="${"svelte-1si6rt8"}"></th>
            ${each(headings, (lb) => {
    return `<th class="${"headingRow svelte-1si6rt8"}"><!-- HTML_TAG_START -->${lb}<!-- HTML_TAG_END --></th>`;
  })}</thead>
    
        <tbody class="${"svelte-1si6rt8"}">${each(datum, (series, j) => {
    return `<tr class="${"svelte-1si6rt8"}"><td class="${"headingCell cdInfo svelte-1si6rt8"}">${escape(seriesLabels[j])}</td>
            ${each(range(numSlots), (i) => {
      return `<td class="${"svelte-1si6rt8"}">${escape(series.main[i])} 
                    ${!isNaN(series.main[i]) ? `<span class="${"weaker svelte-1si6rt8"}">${escape(subdataDisplayInTable(series.sub[i]))}</span>` : ``}
                </td>`;
    })}
            </tr>`;
  })}</tbody></table>
    <div class="${"graphContainer svelte-1si6rt8"}">${validate_component(ProgressGraph, "ProgressGraph").$$render($$result, { title, progressData, maxlength }, {}, {})}</div>
</div>`;
});
export {
  ProgressTable as default
};

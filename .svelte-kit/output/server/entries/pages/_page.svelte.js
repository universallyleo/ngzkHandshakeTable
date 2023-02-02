import { c as create_ssr_component, e as escape, d as null_to_empty, f as each, h as add_attribute, v as validate_component } from "../../chunks/index.js";
import { g as getMember, c as compareData, a as cdAlias, e as expandDataList, s as sortList, p as partitionToGroup, f as finalSoldoutDraw, d as data, S as SelectOneCD } from "../../chunks/SelectOneCD.js";
import { find, min } from "lodash-es";
import "html2canvas";
const DataRow_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: `.tooltip.svelte-1l3ojy7.svelte-1l3ojy7{display:inline-block;position:relative;transform:translate(0,-3px);border-bottom:1px dotted #666;text-align:left;color:#777;font-size:11px;line-height:11px;margin:0;cursor:pointer}.tt-right.svelte-1l3ojy7.svelte-1l3ojy7{min-width:220px;max-width:600px;top:50%;left:100%;margin-left:20px;transform:translate(0, -50%);padding:12px;color:#666666;background-color:#FFFFE0;font-weight:normal;font-size:13px;line-height:1rem;border-radius:8px;position:absolute;z-index:99999999;box-sizing:border-box;box-shadow:0 1px 8px rgba(0,0,0,0.5);display:none}.tooltip.svelte-1l3ojy7:hover .tt-right.svelte-1l3ojy7{display:block}.soldFraction.svelte-1l3ojy7.svelte-1l3ojy7{display:inline;float:right;color:#777}.memberName.svelte-1l3ojy7.svelte-1l3ojy7{width:240px;max-width:300px;padding-left:.4em;padding-right:.2em;border-right:1px solid black;border-top:1px solid #ddd;border-bottom:1px solid #ddd}.NAslot.svelte-1l3ojy7.svelte-1l3ojy7{width:26px;height:1.8ch;padding:0;box-sizing:border-box;border:1px solid #ddd;background:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' preserveAspectRatio='none' viewBox='0 0 100 100'><line x1='0' y1='0' x2='100' y2='100' stroke='black' vector-effect='non-scaling-stroke'/><line x1='0' y1='100' x2='100' y2='0' stroke='black' vector-effect='non-scaling-stroke'/></svg>");background-color:hsl(0, 0%, 80%);background-repeat:no-repeat;background-position:center center;background-size:100% 1.75ch;text-align:center}.slot.svelte-1l3ojy7.svelte-1l3ojy7{width:26px;height:1.8ch;padding:0;overflow:clip;box-sizing:border-box;border:1px solid #ddd;text-align:center}.lastDrawSlot.svelte-1l3ojy7.svelte-1l3ojy7{background-color:yellow}.soldSlot.svelte-1l3ojy7.svelte-1l3ojy7{background-color:hsl(211, 62%, 80%)}.unconfirmedSlot.svelte-1l3ojy7.svelte-1l3ojy7{background-color:hsl(0, 0%, 80%)}.lastcell.svelte-1l3ojy7.svelte-1l3ojy7{border-right:1px solid black !important}.topRow.svelte-1l3ojy7.svelte-1l3ojy7{border-top:1px solid black !important}.bottomRow.svelte-1l3ojy7.svelte-1l3ojy7{border-bottom:1px solid black !important}.compareCell.svelte-1l3ojy7.svelte-1l3ojy7{border:1px solid #ddd;text-align:center}.compareGrid.svelte-1l3ojy7.svelte-1l3ojy7{width:180px;min-height:100%;height:100%;margin:0;display:grid;gap:0;grid-template-columns:55px 12px 55px 60px;grid-template-rows:100%;justify-items:center;align-items:stretch;align-content:stretch}.plusCell.svelte-1l3ojy7.svelte-1l3ojy7{color:hsl(120, 100%, 40%)}.minusCell.svelte-1l3ojy7.svelte-1l3ojy7{color:red}`,
  map: null
};
const DataRow = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let mbInfo;
  let decoratedTbl;
  let classesOnMbCell;
  let compareCellClasses;
  let compareOutput;
  let { row } = $$props;
  let { lastDraw } = $$props;
  let { addClasses = "" } = $$props;
  let { compare = null } = $$props;
  let { capture } = $$props;
  let { hideTable } = $$props;
  const decoratedItem = (c) => {
    if (c == "x")
      return { content: "x", classes: "NAslot" };
    if (c == "?")
      return {
        content: "?",
        classes: "slot unconfirmedSlot"
      };
    if (c != "?" && lastDraw == parseInt(c))
      return { content: c, classes: "slot lastDrawSlot" };
    if (c != "?" && parseInt(c) > 0 && parseInt(c) < lastDraw)
      return { content: c, classes: "slot soldSlot" };
    return { content: c, classes: "slot" };
  };
  if ($$props.row === void 0 && $$bindings.row && row !== void 0)
    $$bindings.row(row);
  if ($$props.lastDraw === void 0 && $$bindings.lastDraw && lastDraw !== void 0)
    $$bindings.lastDraw(lastDraw);
  if ($$props.addClasses === void 0 && $$bindings.addClasses && addClasses !== void 0)
    $$bindings.addClasses(addClasses);
  if ($$props.compare === void 0 && $$bindings.compare && compare !== void 0)
    $$bindings.compare(compare);
  if ($$props.capture === void 0 && $$bindings.capture && capture !== void 0)
    $$bindings.capture(capture);
  if ($$props.hideTable === void 0 && $$bindings.hideTable && hideTable !== void 0)
    $$bindings.hideTable(hideTable);
  $$result.css.add(css$3);
  mbInfo = getMember(row.member);
  decoratedTbl = row.slotsSoldex.map((dayslots) => {
    let res = [];
    for (let s of dayslots) {
      let itm = decoratedItem(s);
      itm.classes += ` ${addClasses}`;
      res.push(itm);
    }
    return res;
  });
  classesOnMbCell = `memberName ${addClasses}`;
  compareCellClasses = `compareCell lastcell ${addClasses}`;
  compareOutput = compare != null ? compareData(row, find(compare.cdData.table, ["member", row.member]), compare.atdraw) : null;
  return `<td class="${escape(null_to_empty(classesOnMbCell), true) + " svelte-1l3ojy7"}">${escape(mbInfo.kanji)} 
    ${row.bdayMeet != 0 ? `<div class="${"tooltip svelte-1l3ojy7"}">[誕]
        <div class="${"tt-right svelte-1l3ojy7"}">誕生:${escape(row.bdayMeet.bday.slice(0, 2))}月${escape(row.bdayMeet.bday.slice(3))}日 → ${escape(row.bdayMeet.meetDate)}</div></div>` : ``}
    <div class="${"soldFraction svelte-1l3ojy7"}">${escape(row.numSold[0])}/${escape(row.numSold[1])}</div></td>


${!hideTable ? `${each(decoratedTbl, (daySlots) => {
    return `${each(daySlots, (slot, i) => {
      return `   
        <td class="${[
        escape(null_to_empty(slot.classes), true) + " svelte-1l3ojy7",
        i == daySlots.length - 1 ? "lastcell" : ""
      ].join(" ").trim()}">${slot.content != "x" ? `${escape(slot.content)}` : `${capture ? `x` : ``}`}
            </td>`;
    })}`;
  })}` : ``}
${compare ? `<td class="${escape(null_to_empty(compareCellClasses), true) + " svelte-1l3ojy7"}"><div class="${"compareGrid svelte-1l3ojy7"}"><div>${escape(compareOutput.prev)}
                ${compareOutput.extraprev ? `<br>${escape(compareOutput.extraprev)}` : ``}</div>
            <div>→</div>
            <div>${escape(compareOutput.curr)}
                ${compareOutput.extracurr ? `<br>${escape(compareOutput.extracurr)}` : ``}</div>
            <div class="${[
    "svelte-1l3ojy7",
    (compareOutput.diff[0] === "+" ? "plusCell" : "") + " " + (compareOutput.diff[0] === "-" ? "minusCell" : "")
  ].join(" ").trim()}">${compareOutput.diff != "0" ? `<span class="${"color:black"}">[ </span>
                    ${escape(compareOutput.diff)}
                    <span class="${"color:black"}">]</span>` : ``}
                ${compareOutput.extradiff ? `<br>${escape(compareOutput.extradiff)}` : ``}</div></div></td>` : ``}`;
});
const RowGroups_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: ".tagCell.svelte-179mrzs{font-size:small;width:25px;border:1px solid black;padding-left:2px;padding-right:2px;text-align:center;background-color:white;overflow:clip;box-sizing:border-box}.tagCellHover{background-color:hsl(291, 37%, 85%) !important;outline:1px solid red}tr.svelte-179mrzs{line-height:1.8ch}tr.svelte-179mrzs:hover{background-color:#ddd}",
  map: null
};
const RowGroups = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { group } = $$props;
  let { lastDraw } = $$props;
  let { compare = null } = $$props;
  let { capture } = $$props;
  let { hideTable = false } = $$props;
  if ($$props.group === void 0 && $$bindings.group && group !== void 0)
    $$bindings.group(group);
  if ($$props.lastDraw === void 0 && $$bindings.lastDraw && lastDraw !== void 0)
    $$bindings.lastDraw(lastDraw);
  if ($$props.compare === void 0 && $$bindings.compare && compare !== void 0)
    $$bindings.compare(compare);
  if ($$props.capture === void 0 && $$bindings.capture && capture !== void 0)
    $$bindings.capture(capture);
  if ($$props.hideTable === void 0 && $$bindings.hideTable && hideTable !== void 0)
    $$bindings.hideTable(hideTable);
  $$result.css.add(css$2);
  return `<tr class="${"taggedRow svelte-179mrzs"}">
	<td${add_attribute("rowspan", group.has.length, 0)} class="${"tagCell svelte-179mrzs"}">${escape(group.label)}</td>
	${validate_component(DataRow, "DataRow").$$render(
    $$result,
    {
      row: group.has[0],
      lastDraw,
      addClasses: group.has.length == 1 ? "topRow bottomRow" : "topRow",
      compare,
      capture,
      hideTable
    },
    {},
    {}
  )}</tr>
${each(group.has.slice(1, -1), (row) => {
    return `<tr class="${"normalRow svelte-179mrzs"}">${validate_component(DataRow, "DataRow").$$render(
      $$result,
      {
        row,
        lastDraw,
        compare,
        capture,
        hideTable
      },
      {},
      {}
    )}
	</tr>`;
  })}
${group.has.length > 1 ? `<tr class="${"svelte-179mrzs"}">${validate_component(DataRow, "DataRow").$$render(
    $$result,
    {
      row: group.has[group.has.length - 1],
      lastDraw,
      addClasses: "bottomRow",
      compare,
      capture,
      hideTable
    },
    {},
    {}
  )}</tr>` : ``}`;
});
const SlotTable_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".table-bordered.svelte-81drp5.svelte-81drp5{table-layout:fixed;border:1px solid #ddd !important;border-spacing:0!important;border-collapse:collapse;display:block;overflow-x:auto;overflow-y:hidden}.container.svelte-81drp5.svelte-81drp5{width:max-content}table.svelte-81drp5 caption.svelte-81drp5{font-size:large;font-weight:bold;padding:.5em 0}th.svelte-81drp5.svelte-81drp5{font-size:large;font-weight:bold;border:1px solid black;border-bottom:2px solid black;padding:0}@media screen and (max-width: 767px){table.svelte-81drp5 caption.svelte-81drp5{display:none}}.soldFraction.svelte-81drp5.svelte-81drp5{display:inline;float:right;margin-right:3px;font-size:small;font-weight:normal;color:#777}",
  map: null
};
const SlotTable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let title;
  let expandedData;
  let finalTb;
  let lastDraw;
  let totalSold;
  let title2;
  let { data: data2 } = $$props;
  let { filterOpt } = $$props;
  let { groupOpt } = $$props;
  let { sortOpt } = $$props;
  let { compare = null } = $$props;
  let { capture } = $$props;
  let { hideTable = false } = $$props;
  function filterList(list, option = filterOpt) {
    switch (option) {
      case "showall":
        return list;
      case "hasunsold":
        return list.filter((x) => x.numSold[0] < x.numSold[1]);
      case "hasunsold+latest":
        return list.filter((x) => x.numSold[0] < x.numSold[1] || finalSoldoutDraw(x) == lastDraw);
      case "hassoldout":
        return list.filter((x) => x.numSold[0] > 0);
      case "hassoldoutnonfull":
        return list.filter((x) => x.numSold[0] > 0 && x.numSold[0] < x.numSold[1]);
      case "selectmb":
        return list;
    }
  }
  if ($$props.data === void 0 && $$bindings.data && data2 !== void 0)
    $$bindings.data(data2);
  if ($$props.filterOpt === void 0 && $$bindings.filterOpt && filterOpt !== void 0)
    $$bindings.filterOpt(filterOpt);
  if ($$props.groupOpt === void 0 && $$bindings.groupOpt && groupOpt !== void 0)
    $$bindings.groupOpt(groupOpt);
  if ($$props.sortOpt === void 0 && $$bindings.sortOpt && sortOpt !== void 0)
    $$bindings.sortOpt(sortOpt);
  if ($$props.compare === void 0 && $$bindings.compare && compare !== void 0)
    $$bindings.compare(compare);
  if ($$props.capture === void 0 && $$bindings.capture && capture !== void 0)
    $$bindings.capture(capture);
  if ($$props.hideTable === void 0 && $$bindings.hideTable && hideTable !== void 0)
    $$bindings.hideTable(hideTable);
  $$result.css.add(css$1);
  title = cdAlias(data2.cd).display;
  expandedData = expandDataList(data2);
  finalTb = sortList(partitionToGroup(filterList(expandedData, filterOpt), groupOpt), sortOpt);
  lastDraw = data2.lastDraw;
  totalSold = expandedData.reduce((prev, curr) => {
    return {
      numSold: [prev.numSold[0] + curr.numSold[0], prev.numSold[1] + curr.numSold[1]]
    };
  }).numSold;
  capture = capture;
  title2 = compare ? cdAlias(compare.cdData.cd).display : "";
  hideTable = compare ? hideTable : false;
  return `

<div class="${"container svelte-81drp5"}"><table class="${"table-bordered svelte-81drp5"}"><caption class="${"text-center svelte-81drp5"}">${escape(title)} (最後更新：${escape(lastDraw)}次受付) 
    ${compare ? `${hideTable ? `<br>` : ``}
        [ vs ${escape(title2)} ${escape(compare.atdraw)}次受付 ]` : ``}</caption>
  <thead><tr>
      <th class="${"svelte-81drp5"}"></th>
      <th class="${"svelte-81drp5"}"><div class="${"soldFraction svelte-81drp5"}">${escape(totalSold[0])}/${escape(totalSold[1])}</div></th>
      ${!hideTable ? `${each(data2.meetDates, (date) => {
    return `<th colspan="${"5"}" class="${"svelte-81drp5"}">${escape(date)}</th>`;
  })}` : ``}
      ${compare ? `<th class="${"svelte-81drp5"}">過去との差</th>` : ``}</tr></thead>
  <tbody>${groupOpt == "none" ? `
      ${each(data2.table, (row) => {
    return `<tr>${validate_component(DataRow, "DataRow").$$render($$result, { row, lastDraw, compare, capture }, {}, {})}</tr>`;
  })}` : `${each(finalTb, (rowGp) => {
    return `${validate_component(RowGroups, "RowGroups").$$render(
      $$result,
      {
        group: rowGp,
        lastDraw,
        compare,
        capture,
        hideTable
      },
      {},
      {}
    )}`;
  })}`}</tbody></table></div>
`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "input.svelte-1xvsvl6.svelte-1xvsvl6.svelte-1xvsvl6,button.svelte-1xvsvl6.svelte-1xvsvl6.svelte-1xvsvl6{font-size:inherit;font-family:inherit;line-height:1.2}button.svelte-1xvsvl6.svelte-1xvsvl6.svelte-1xvsvl6:focus:not(:focus-visible){outline:none}.optionForm.svelte-1xvsvl6.svelte-1xvsvl6.svelte-1xvsvl6{width:max-content;margin:0 auto;padding:1px 5px;line-height:3.5ch}.optionsContainer.svelte-1xvsvl6.svelte-1xvsvl6.svelte-1xvsvl6{padding:2px 6px;border:1px solid black}ul.twocols.svelte-1xvsvl6.svelte-1xvsvl6.svelte-1xvsvl6{display:inline-block;text-align:left;margin:0;padding:0}ul.twocols.svelte-1xvsvl6>li.svelte-1xvsvl6.svelte-1xvsvl6{margin:15px 0 15px;display:flex;justify-content:left;margin:0}ul.twocols.svelte-1xvsvl6>li.svelte-1xvsvl6>div.leftcol.svelte-1xvsvl6{flex:none;margin:0;width:55px}.advanceOption.svelte-1xvsvl6.svelte-1xvsvl6.svelte-1xvsvl6{padding:2px 6px;border:1px solid black;display:flex}.main.svelte-1xvsvl6.svelte-1xvsvl6.svelte-1xvsvl6{margin:0 auto;width:max-content;padding:7px}.print.svelte-1xvsvl6.svelte-1xvsvl6.svelte-1xvsvl6{margin-left:auto}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let compare;
  let filterMethod = [
    { "display": "全メンバー", "value": "showall" },
    { "display": "未完売あり", "value": "hasunsold" },
    {
      "display": "未完売あり、又は直近更新あり",
      "value": "hasunsold+latest"
    },
    {
      "display": "一部以上完売",
      "value": "hassoldout"
    },
    {
      "display": "一部以上完売、全完売なし",
      "value": "hassoldoutnonfull"
    }
  ];
  let filterOpt = "showall";
  let groupMethod = [
    { "display": "期別分け", "value": "gen" },
    { "display": "選抜・アンダー・他", "value": "group" },
    { "display": "誕生年別", "value": "dobyear" },
    // {"display": "学年別 (to be corrected)", "value": "dobyear"},
    {
      "display": "完売・未完売",
      "value": "soldstatus"
    }
  ];
  let groupOpt = "gen";
  let sortMethod = [
    { "display": "五十音順", "value": "kana" },
    { "display": "完売数順", "value": "numsold" }
  ];
  let sortOpt = "kana";
  let compareCD = false;
  let capture = false;
  let selectedIndex = 0;
  let selectedCDData = data[data.length - 1];
  let compareToCDData, hideTable = false;
  function getCompare() {
    return null;
  }
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      {
        compare = null;
        compareToCDData = null;
      }
    }
    compareToCDData ? min([compareToCDData.lastDraw, selectedCDData.lastDraw]) : 0;
    compare = getCompare();
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-ya5rpn_START -->${$$result.title = `<title>乃木坂46インタラクティブ式完売表</title>`, ""}<meta name="${"description"}" content="${"乃木坂46インタラクティブ式完売表"}"><!-- HEAD_svelte-ya5rpn_END -->`, ""}

<div class="${"optionForm svelte-1xvsvl6"}"><div class="${"optionsContainer svelte-1xvsvl6"}"><ul class="${"twocols svelte-1xvsvl6"}"><li class="${"svelte-1xvsvl6"}"><div class="${"leftcol svelte-1xvsvl6"}">CD:</div>
                <div class="${"rightcol"}">${validate_component(SelectOneCD, "SelectOneCD").$$render(
      $$result,
      { selectedCDData, selected: selectedIndex },
      {
        selectedCDData: ($$value) => {
          selectedCDData = $$value;
          $$settled = false;
        },
        selected: ($$value) => {
          selectedIndex = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>
                
                <div class="${"print svelte-1xvsvl6"}"><button class="${"svelte-1xvsvl6"}">画像輸出</button>
                    <button title="${"Does not work on Firefox unless ClipboardItem is enabled"}" class="${"svelte-1xvsvl6"}">画像コピー</button></div></li>
            <li class="${"svelte-1xvsvl6"}"><div class="${"leftcol svelte-1xvsvl6"}">Group:</div>
                <div class="${"rightcol"}">${each(groupMethod, (grp) => {
      return `
                    <label><input type="${"radio"}" name="${"groupOpt"}"${add_attribute("id", grp.value, 0)}${add_attribute("value", grp.value, 0)} class="${"svelte-1xvsvl6"}"${grp.value === groupOpt ? add_attribute("checked", true, 1) : ""}>
                        ${escape(grp.display)}</label>
                    `;
    })}</div></li>
            <li class="${"svelte-1xvsvl6"}"><div class="${"leftcol svelte-1xvsvl6"}">Filter:</div>
                <div class="${"rightcol"}">${each(filterMethod, (filt) => {
      return `
                    <label><input type="${"radio"}" name="${"filterOpt"}"${add_attribute("id", filt.value, 0)}${add_attribute("value", filt.value, 0)} class="${"svelte-1xvsvl6"}"${filt.value === filterOpt ? add_attribute("checked", true, 1) : ""}>
                        ${escape(filt.display)}</label>
                    `;
    })}</div></li>
            <li class="${"svelte-1xvsvl6"}"><div class="${"leftcol svelte-1xvsvl6"}">Sort:</div>
                <div class="${"rightcol"}">${each(sortMethod, (sort) => {
      return `
                    <label><input type="${"radio"}" name="${"sortOpt"}"${add_attribute("id", sort.value, 0)}${add_attribute("value", sort.value, 0)} class="${"svelte-1xvsvl6"}"${sort.value === sortOpt ? add_attribute("checked", true, 1) : ""}>
                        ${escape(sort.display)}
                    </label>`;
    })}</div></li></ul></div>
    <div class="${"advanceOption svelte-1xvsvl6"}"><label><input type="${"checkbox"}" name="${"compareCD"}" id="${"compareCD"}" class="${"svelte-1xvsvl6"}"${add_attribute("checked", compareCD, 1)}>
            過去との差
        </label>
        ${``}</div></div>

<section id="${"slotstable"}" class="${"main svelte-1xvsvl6"}">${validate_component(SlotTable, "SlotTable").$$render(
      $$result,
      {
        data: selectedCDData,
        filterOpt,
        groupOpt,
        sortOpt,
        compare,
        capture,
        hideTable
      },
      {},
      {}
    )}
</section>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};

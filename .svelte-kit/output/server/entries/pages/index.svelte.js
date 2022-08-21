import { c as create_ssr_component, e as escape, n as null_to_empty, a as each, b as add_attribute, v as validate_component } from "../../_app/immutable/chunks/index-16508633.js";
import { g as getMember, c as compareData, a as cdData, e as expandDataList, s as sortList, p as partitionToGroup, d as data } from "../../_app/immutable/chunks/util-9274ca4a.js";
import { find, min } from "lodash-es";
import "html2canvas";
const DataRow_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: `.soldFraction.svelte-1okkku3{display:inline;float:right;color:#777}.memberName.svelte-1okkku3{width:240px;max-width:300px;padding-left:.4em;padding-right:.2em;border-right:1px solid black;border-top:1px solid #ddd;border-bottom:1px solid #ddd}.NAslot.svelte-1okkku3{width:26px;height:1.8ch;padding:0;box-sizing:border-box;border:1px solid #ddd;background:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' preserveAspectRatio='none' viewBox='0 0 100 100'><line x1='0' y1='0' x2='100' y2='100' stroke='black' vector-effect='non-scaling-stroke'/><line x1='0' y1='100' x2='100' y2='0' stroke='black' vector-effect='non-scaling-stroke'/></svg>");background-color:hsl(0, 0%, 80%);background-repeat:no-repeat;background-position:center center;background-size:100% 1.75ch;text-align:center}.slot.svelte-1okkku3{width:26px;height:1.8ch;padding:0;overflow:clip;box-sizing:border-box;border:1px solid #ddd;text-align:center}.lastDrawSlot.svelte-1okkku3{background-color:yellow}.soldSlot.svelte-1okkku3{background-color:hsl(211, 62%, 80%)}.lastcell.svelte-1okkku3{border-right:1px solid black !important}.topRow.svelte-1okkku3{border-top:1px solid black !important}.bottomRow.svelte-1okkku3{border-bottom:1px solid black !important}.compareCell.svelte-1okkku3{border:1px solid #ddd;text-align:center}.compareGrid.svelte-1okkku3{width:167px;min-height:100%;height:100%;margin:0;display:grid;gap:0;grid-template-columns:50px 12px 50px 55px;grid-template-rows:100%;justify-items:center;align-items:stretch;align-content:stretch}.plusCell.svelte-1okkku3{color:hsl(120, 100%, 40%)}.minusCell.svelte-1okkku3{color:red}`,
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
  const decoratedItem = (c) => {
    if (c == "x")
      return { content: "x", classes: "NAslot" };
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
  return `<td class="${escape(null_to_empty(classesOnMbCell), true) + " svelte-1okkku3"}">${escape(mbInfo.kanji)}
    <div class="${"soldFraction svelte-1okkku3"}">${escape(row.numSold[0])}/${escape(row.numSold[1])}</div></td>


${each(decoratedTbl, (daySlots) => {
    return `${each(daySlots, (slot, i) => {
      return `   
    <td class="${[
        escape(null_to_empty(slot.classes), true) + " svelte-1okkku3",
        i == daySlots.length - 1 ? "lastcell" : ""
      ].join(" ").trim()}">${slot.content != "x" ? `${escape(slot.content)}` : `${capture ? `x` : ``}`}
        </td>`;
    })}`;
  })}
${compare ? `<td class="${escape(null_to_empty(compareCellClasses), true) + " svelte-1okkku3"}"><div class="${"compareGrid svelte-1okkku3"}"><div>${escape(compareOutput.prev)}
                ${compareOutput.extraprev ? `<br>${escape(compareOutput.extraprev)}` : ``}</div>
            <div>\u2192</div>
            <div>${escape(compareOutput.curr)}
                ${compareOutput.extracurr ? `<br>${escape(compareOutput.extracurr)}` : ``}</div>
            <div class="${[
    "svelte-1okkku3",
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
  if ($$props.group === void 0 && $$bindings.group && group !== void 0)
    $$bindings.group(group);
  if ($$props.lastDraw === void 0 && $$bindings.lastDraw && lastDraw !== void 0)
    $$bindings.lastDraw(lastDraw);
  if ($$props.compare === void 0 && $$bindings.compare && compare !== void 0)
    $$bindings.compare(compare);
  if ($$props.capture === void 0 && $$bindings.capture && capture !== void 0)
    $$bindings.capture(capture);
  $$result.css.add(css$2);
  return `<tr class="${"taggedRow svelte-179mrzs"}"><td${add_attribute("rowspan", group.has.length, 0)} class="${"tagCell svelte-179mrzs"}">${escape(group.label)}</td>
	${validate_component(DataRow, "DataRow").$$render(
    $$result,
    {
      row: group.has[0],
      lastDraw,
      addClasses: group.has.length == 1 ? "topRow bottomRow" : "topRow",
      compare,
      capture
    },
    {},
    {}
  )}</tr>
${each(group.has.slice(1, -1), (row) => {
    return `<tr class="${"normalRow svelte-179mrzs"}">${validate_component(DataRow, "DataRow").$$render($$result, { row, lastDraw, compare, capture }, {}, {})}
	</tr>`;
  })}
${group.has.length > 1 ? `<tr class="${"svelte-179mrzs"}">${validate_component(DataRow, "DataRow").$$render(
    $$result,
    {
      row: group.has[group.has.length - 1],
      lastDraw,
      addClasses: "bottomRow",
      compare,
      capture
    },
    {},
    {}
  )}</tr>` : ``}`;
});
const SlotTable_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".table-bordered.svelte-i4pbgc.svelte-i4pbgc{table-layout:fixed;border:1px solid #ddd !important;border-spacing:0!important;border-collapse:collapse;display:block;overflow-x:auto}.container.svelte-i4pbgc.svelte-i4pbgc{width:max-content}table.svelte-i4pbgc caption.svelte-i4pbgc{font-size:large;font-weight:bold;padding:.5em 0}th.svelte-i4pbgc.svelte-i4pbgc{font-size:large;font-weight:bold;border:1px solid black;border-bottom:2px solid black;padding:0}@media screen and (max-width: 767px){table.svelte-i4pbgc caption.svelte-i4pbgc{display:none}}.soldFraction.svelte-i4pbgc.svelte-i4pbgc{display:inline;float:right;margin-right:3px;font-size:small;font-weight:normal;color:#777}",
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
  function filterList(list, option = filterOpt) {
    switch (option) {
      case "showall":
        return list;
      case "hasunsold":
        return list.filter((x) => x.numSold[0] < x.numSold[1]);
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
  $$result.css.add(css$1);
  title = cdData(data2.cd).display;
  expandedData = expandDataList(data2);
  finalTb = sortList(partitionToGroup(filterList(expandedData, filterOpt), groupOpt), sortOpt);
  lastDraw = data2.lastDraw;
  totalSold = expandedData.reduce((prev, curr) => {
    return {
      numSold: [prev.numSold[0] + curr.numSold[0], prev.numSold[1] + curr.numSold[1]]
    };
  }).numSold;
  capture = capture;
  title2 = compare ? cdData(compare.cdData.cd).display : "";
  return `

<div class="${"container svelte-i4pbgc"}"><table class="${"table-bordered svelte-i4pbgc"}"><caption class="${"text-center svelte-i4pbgc"}">${escape(title)} (\u6700\u5F8C\u66F4\u65B0\uFF1A${escape(lastDraw)}\u6B21\u53D7\u4ED8) 
    ${compare ? `\xA0\xA0[ vs ${escape(title2)} ${escape(compare.atdraw)}\u6B21\u53D7\u4ED8 ]` : ``}</caption>
  <thead><tr>
      <th class="${"svelte-i4pbgc"}"></th>
      <th class="${"svelte-i4pbgc"}"><div class="${"soldFraction svelte-i4pbgc"}">${escape(totalSold[0])}/${escape(totalSold[1])}</div></th>
      ${each(data2.meetDates, (date) => {
    return `<th colspan="${"5"}" class="${"svelte-i4pbgc"}">${escape(date)}</th>`;
  })}
      ${compare ? `<th class="${"svelte-i4pbgc"}">\u904E\u53BB\u3068\u306E\u5DEE</th>` : ``}</tr></thead>
  <tbody>${groupOpt == "none" ? `
      ${each(data2.table, (row) => {
    return `<tr>${validate_component(DataRow, "DataRow").$$render($$result, { row, lastDraw, compare, capture }, {}, {})}</tr>`;
  })}` : `${each(finalTb, (rowGp) => {
    return `${validate_component(RowGroups, "RowGroups").$$render($$result, { group: rowGp, lastDraw, compare, capture }, {}, {})}`;
  })}`}</tbody></table></div>
`;
});
const index_svelte_svelte_type_style_lang = "";
const css = {
  code: "input.svelte-1h36lzs.svelte-1h36lzs.svelte-1h36lzs,button.svelte-1h36lzs.svelte-1h36lzs.svelte-1h36lzs{font-size:inherit;font-family:inherit;line-height:1.2}button.svelte-1h36lzs.svelte-1h36lzs.svelte-1h36lzs:focus:not(:focus-visible){outline:none}.optionForm.svelte-1h36lzs.svelte-1h36lzs.svelte-1h36lzs{width:max-content;margin:0 auto;padding:1px 5px;line-height:3.5ch}.optionsContainer.svelte-1h36lzs.svelte-1h36lzs.svelte-1h36lzs{padding:2px 6px;border:1px solid black}ul.twocols.svelte-1h36lzs.svelte-1h36lzs.svelte-1h36lzs{display:inline-block;text-align:left;margin:0;padding:0}ul.twocols.svelte-1h36lzs>li.svelte-1h36lzs.svelte-1h36lzs{margin:15px 0 15px;display:flex;justify-content:left;margin:0}ul.twocols.svelte-1h36lzs>li.svelte-1h36lzs>div.leftcol.svelte-1h36lzs{flex:none;margin:0;width:55px}.advanceOption.svelte-1h36lzs.svelte-1h36lzs.svelte-1h36lzs{padding:2px 6px;border:1px solid black}.inactive.svelte-1h36lzs.svelte-1h36lzs.svelte-1h36lzs{display:none}.main.svelte-1h36lzs.svelte-1h36lzs.svelte-1h36lzs{margin:0 auto;width:max-content;padding:7px}.print.svelte-1h36lzs.svelte-1h36lzs.svelte-1h36lzs{margin-left:auto}",
  map: null
};
const Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let selectedCDdata;
  let selectableDraw;
  let compare;
  let cdlist = data.map((x) => cdData(x.cd)).reverse();
  let selected = 0;
  let filterMethod = [
    { "display": "\u5168\u30E1\u30F3\u30D0\u30FC", "value": "showall" },
    {
      "display": "\u672A\u5B8C\u58F2\u90E8\u6570\u3042\u308A",
      "value": "hasunsold"
    },
    {
      "display": "\u4E00\u90E8\u4EE5\u4E0A\u5B8C\u58F2",
      "value": "hassoldout"
    },
    {
      "display": "\u4E00\u90E8\u4EE5\u4E0A\u5B8C\u58F2\u3001\u5168\u5B8C\u58F2\u306A\u3057",
      "value": "hassoldoutnonfull"
    }
  ];
  let filterOpt = "showall";
  let groupMethod = [
    { "display": "\u671F\u5225\u5206\u3051", "value": "gen" },
    { "display": "\u9078\u629C\u30FB\u30A2\u30F3\u30C0\u30FC\u30FB\u4ED6", "value": "group" },
    { "display": "\u8A95\u751F\u5E74\u5225", "value": "dob-year" },
    {
      "display": "\u5B8C\u58F2\u30FB\u672A\u5B8C\u58F2",
      "value": "soldstatus"
    }
  ];
  let groupOpt = "gen";
  let sortMethod = [
    { "display": "\u4E94\u5341\u97F3\u9806", "value": "kana" },
    { "display": "\u5B8C\u58F2\u6570\u9806", "value": "numsold" }
  ];
  let sortOpt = "kana";
  let compareCD = false;
  let selected2 = -1;
  let capture = false;
  function getCompare() {
    return null;
  }
  function isSelectedGood(s) {
    return s < 0 ? false : s >= cdlist.length ? false : true;
  }
  $$result.css.add(css);
  selectedCDdata = data[cdlist.length - selected - 1];
  selectableDraw = isSelectedGood(selected2) ? min([data[cdlist.length - selected2 - 1].lastDraw, selectedCDdata.lastDraw]) : 0;
  compare = getCompare();
  {
    {
      compare = null;
    }
  }
  return `${$$result.head += `${$$result.title = `<title>\u4E43\u6728\u574246\u30A4\u30F3\u30BF\u30E9\u30AF\u30C6\u30A3\u30D6\u5F0F\u5B8C\u58F2\u8868</title>`, ""}<meta name="${"description"}" content="${"\u4E43\u6728\u574246\u30A4\u30F3\u30BF\u30E9\u30AF\u30C6\u30A3\u30D6\u5F0F\u5B8C\u58F2\u8868"}" data-svelte="svelte-ya5rpn">`, ""}

<div class="${"optionForm svelte-1h36lzs"}"><div class="${"optionsContainer svelte-1h36lzs"}"><ul class="${"twocols svelte-1h36lzs"}"><li class="${"svelte-1h36lzs"}"><div class="${"leftcol svelte-1h36lzs"}">CD:</div>
                <div class="${"rightcol"}"><select id="${"cdSelect"}" name="${"cd"}" style="${"margin-left: 15px; margin-right: 15px"}">${each(cdlist, (cd, i) => {
    return `<option${add_attribute("value", i, 0)}>${escape(cd.display)}</option>`;
  })}</select></div>
                
                <div class="${"print svelte-1h36lzs"}"><button class="${"svelte-1h36lzs"}">\u753B\u50CF\u8F38\u51FA</button>
                    <button title="${"Does not work on Firefox unless ClipboardItem is enabled"}" class="${"svelte-1h36lzs"}">\u753B\u50CF\u30B3\u30D4\u30FC</button></div></li>
            <li class="${"svelte-1h36lzs"}"><div class="${"leftcol svelte-1h36lzs"}">Group:</div>
                <div class="${"rightcol"}">${each(groupMethod, (grp) => {
    return `
                    <label><input type="${"radio"}" name="${"groupOpt"}"${add_attribute("id", grp.value, 0)}${add_attribute("value", grp.value, 0)} class="${"svelte-1h36lzs"}"${grp.value === groupOpt ? add_attribute("checked", true, 1) : ""}>
                        ${escape(grp.display)}</label>
                    `;
  })}</div></li>
            <li class="${"svelte-1h36lzs"}"><div class="${"leftcol svelte-1h36lzs"}">Filter:</div>
                <div class="${"rightcol"}">${each(filterMethod, (filt) => {
    return `
                    <label><input type="${"radio"}" name="${"filterOpt"}"${add_attribute("id", filt.value, 0)}${add_attribute("value", filt.value, 0)} class="${"svelte-1h36lzs"}"${filt.value === filterOpt ? add_attribute("checked", true, 1) : ""}>
                        ${escape(filt.display)}</label>
                    `;
  })}</div></li>
            <li class="${"svelte-1h36lzs"}"><div class="${"leftcol svelte-1h36lzs"}">Sort:</div>
                <div class="${"rightcol"}">${each(sortMethod, (sort) => {
    return `
                    <label><input type="${"radio"}" name="${"sortOpt"}"${add_attribute("id", sort.value, 0)}${add_attribute("value", sort.value, 0)} class="${"svelte-1h36lzs"}"${sort.value === sortOpt ? add_attribute("checked", true, 1) : ""}>
                        ${escape(sort.display)}
                    </label>`;
  })}</div></li></ul></div>
    <div class="${"advanceOption svelte-1h36lzs"}"><label><input type="${"checkbox"}" name="${"compareCD"}" id="${"compareCD"}" class="${"svelte-1h36lzs"}"${add_attribute("checked", compareCD, 1)}>
            \u904E\u53BB\u306E\u58F2\u308A\u4E0A\u3052\u3068\u306E\u5DEE
        </label>
        <span class="${["svelte-1h36lzs", "inactive"].join(" ").trim()}"><label>\u2192 \u5BFE\u8C61CD:
                <select id="${"cd2Select"}" name="${"cd2"}" style="${"margin-left: 5px; margin-right: 5px"}">${each(cdlist, (cd, i) => {
    return `${i != selected ? `<option${add_attribute("value", i, 0)}>${escape(cd.display)}</option>` : ``}`;
  })}</select></label>
            ${isSelectedGood(selected2) ? `<label><select id="${"drawSelect"}" name="${"drawSelect"}" style="${"margin-left: 2px; margin-right: 2px"}">${each([...Array(selectableDraw).keys()], (i) => {
    return `<option${add_attribute("value", i + 1, 0)}>${escape(i + 1)}</option>`;
  })}</select>\u6B21\u53D7\u4ED8</label>` : ``}
            ${``}</span></div></div>

<section id="${"slotstable"}" class="${"main svelte-1h36lzs"}">${validate_component(SlotTable, "SlotTable").$$render(
    $$result,
    {
      data: selectedCDdata,
      filterOpt,
      groupOpt,
      sortOpt,
      compare,
      capture
    },
    {},
    {}
  )}
</section>`;
});
export {
  Routes as default
};

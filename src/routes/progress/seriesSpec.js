import {
    getMember,
    cdAlias,
    getNumSold,
    expandDataList,
} from "$lib/processData.js";
import { fillArrayByLastEntry } from "$lib/util.js";
import { range, find, zip } from "lodash-es";

//#region CDProgressData def
/**
 * @typedef {Object} CDProgressData
 * @property {Object} CDinfo
 * @property {string} memberName
 * @property {number[]} main main series, y-values of graph
 * @property {Object[]} sub supplementary data
 */

/**
 * @return {CDProgressData}
 * @param  {object} cd
 */
function cdprogression(memberName, cd) {
    let res = {
        cd: cd.cd,
        member: memberName,
        main: [], // accummulated num of sold
        sub: Array(cd.lastDraw).fill(0),
    }; //num of sold at particular draw
    let mbTable = find(cd.table, ["member", memberName]);
    if (mbTable) {
        let flatSlots = mbTable.slotsSold.map((row) => row.split("|")).flat();
        flatSlots.map((e) =>
            e.match(/^\d+$/) ? res.sub[parseInt(e) - 1]++ : 0
        );
        let sum = 0;
        res.main = res.sub.map((x) => (sum += x));
    } else if (memberName == "all") {
        let raw = expandDataList(cd);
        res.total = raw["totalSlots"];
        res.sub = zip(
            raw["numSoldAtEach"],
            raw["accumSold"],
            Array(raw["numSoldAtEach"].length).fill(res.total)
        );
        res.main = raw.accumSold.map((s) => (s / res.total) * 100);
        // console.log(res.main);
    }
    return res;
}

export function soldProgressionOverCDs(memberName, invovledCDs, atdraw = -1) {
    let soldatcd = [],
        accum = [];
    let lastNumericIdx = -1;
    for (let i = 0; i < invovledCDs.length; i++) {
        let frac;
        // if (atdraw <= invovledCDs[i].lastDraw) {
        let at = atdraw > -1 ? Math.min(atdraw, invovledCDs[i].lastDraw) : -1;
        frac = getNumSold(
            invovledCDs[i].table.find((x) => x.member == memberName),
            at
        );
        if (frac[1] == "N/A") {
            soldatcd.push(null);
            accum.push("-");
        } else {
            soldatcd.push(frac);
            accum.push(
                lastNumericIdx > -1 ? accum[lastNumericIdx] + frac[0] : frac[0]
            );
            lastNumericIdx = i;
        }
        // } else {
        //     // only here in mode receptionProgression
        //     // atdraw is beyond last draw, so take num from last draw
        //     let num = getNumSold(
        //         invovledCDs[i].table.find((x) => x.member == memberName),
        //         invovledCDs[i].lastDraw
        //     );
        //     soldatcd.push(num);
        //     accum.push(num[0]);
        // }
    }
    return { member: memberName, main: accum, sub: soldatcd };
}

export function extendCDProgressData(data, toLength) {
    data.main = fillArrayByLastEntry(data.main, toLength, "-");
    data.sub = fillArrayByLastEntry(data.sub, toLength, "-");
    if (data.displayChange) {
        data.displayTableMain = fillArrayByLastEntry(
            data.displayTableMain,
            toLength,
            "-"
        );
    }
    // let len = data.main.length;
    // for (let i = len; i < toLength; i++) {
    //     data.main.push("-");
    //     data.sub.push("-");
    //     if (data.displayChange) {
    //         data.displayTableMain.push("-");
    //     }
    // }
}

//#subdata display method
export function subdataDisplayInTable(x, mode) {
    if (!x) return "";
    if (x === "-") return "";
    if (mode.slice(0, 3) == "fix") {
        return mode == "fixAllMB"
            ? `(+${x[0]})<br> =&gt; ${x[1]} / ${x[2]}`
            : `(+${x})`;
        // return `(+${x})`;
    }
    if (mode == "overallProgression") return `(+${x[0]}/${x[1]})`;
    if (mode == "receptionProgression") return `/${x}`;
}

//#region SeriesCollection def
/**
 * @typedef {Object} SeriesCollection
 * @property {string} title
 * @property {number[][]} datum y-values
 * @property {string[]} seriesLabels label for each individual series
 * @property {string[]} xAxisLabels label for items on x-axis
 * @property {number} numSlot maximal num of data in a series
 * @property {string} caption for data table
 * @property {string} subcaption for data table, describe sub-data
 * @property {Object} plotExtraOpts extra options to pass into chartjs
 */

//#region Fix CD
export function prepareFixCD(members, CDData) {
    let datum = [],
        seriesLabels = [];
    members.map((x) => {
        datum.push(cdprogression(x, CDData));
        seriesLabels.push(getMember(x).kanji);
    });
    let title = `対象円盤： ${cdAlias(datum[0].cd).display}`;
    let numSlots = CDData.lastDraw;
    datum.map((t) => extendCDProgressData(t, numSlots));
    let xAxisLabels = range(1, numSlots + 1);
    return {
        title,
        numSlots,
        datum,
        seriesLabels,
        xAxisLabels,
        caption: "累計完売部数の推移",
        subcaption: "(N次受付の完売部数)",
    };
}

//#region Fix Member
export function prepareFixMB(member, CDDatas) {
    let datum = [],
        seriesLabels = [];
    CDDatas.map((x) => {
        datum.push(cdprogression(member, x));
        seriesLabels.push(cdAlias(x.cd).display);
    });
    let title = `対象メンバー： ${getMember(member).kanji}`;
    let numSlots = Math.max(...CDDatas.map((x) => x.lastDraw));
    datum.map((t) => extendCDProgressData(t, numSlots));
    let xAxisLabels = range(1, numSlots + 1);
    return {
        title,
        numSlots,
        datum,
        seriesLabels,
        xAxisLabels,
        caption: "累計完売部数の推移",
        subcaption: "(N次受付の完売部数)",
    };
}

//#region Fix All-Member
export function prepareFixAllMB(CDDatas) {
    let datum = [],
        seriesLabels = [];
    CDDatas.map((x) => {
        let y = cdprogression("all", x);
        datum.push({
            // add custom label to data
            // the `label' value will be shown as datalabel
            // xkey and value are needed for chartjs to understand the data series of interest
            main: y.main.map((d, i) => {
                return {
                    // label: `${d.toFixed(2)}\n[ ${y.sub[i]} / ${y.total} ]`,
                    label: `${d.toFixed(2)}`,
                    xkey: i + 1,
                    value: d,
                };
            }),
            sub: y.sub,
            displayChange: true,
            displayTableMain: y.main.map((d) => `${d.toFixed(2)}%`),
        });
        seriesLabels.push(cdAlias(x.cd).display);
    });
    let numSlots = Math.max(...CDDatas.map((x) => x.lastDraw));
    datum.map((d) => extendCDProgressData(d, numSlots));
    let plotExtraOpts = {
        parsing: {
            xAxisKey: "xkey",
            yAxisKey: "value",
        },
    };
    let xAxisLabels = range(1, numSlots + 1);
    return {
        title: `円盤ごと完売部数`,
        numSlots,
        datum,
        seriesLabels,
        caption: "完売部数比率推移",
        subcaption: "",
        xAxisLabels,
        plotExtraOpts,
    };
}

//#region Overall progress
export function preapreOverallProgress(members, CDDatas) {
    let datum = members.map((x) => soldProgressionOverCDs(x, CDDatas));
    let seriesLabels = members.map((x) => getMember(x).kanji);
    let xAxisLabels = CDDatas.map((x) => cdAlias(x.cd).display);
    return {
        title: "総完売部数推移",
        caption: "累計総完売部数",
        subcaption: "(円盤の総完売部数 / 最大可能完売部数)",
        numSlots: CDDatas.length,
        datum,
        seriesLabels,
        xAxisLabels,
    };
}

//#region reception Progress
// series with data = total number of sold slots up to the N-th draw
export function prepareReceptionProg(members, CDDatas, atdraw) {
    let temp = members.map((x) => soldProgressionOverCDs(x, CDDatas, atdraw));
    console.log(temp);
    //we do not want accumulated data, so swap out sub data (= individual CD sold data)
    let datum = temp.map((x) => {
        return {
            member: x.member,
            main: x.sub.map((y) => (y ? y[0] : null)),
            sub: x.sub.map((y) => (y ? y[1] : null)),
        };
    });
    // console.log(datum);
    let seriesLabels = members.map((x) => getMember(x).kanji);
    let title = `${atdraw}次受付までの完売部数推移`;
    let caption = `${atdraw}次受付までの完売部数`;
    let subcaption = " / 円盤の最大可能完売部数";
    let xAxisLabels = CDDatas.map((x) => cdAlias(x.cd).display);
    return {
        title,
        caption,
        subcaption,
        numSlots: CDDatas.length,
        datum,
        seriesLabels,
        xAxisLabels,
    };
}

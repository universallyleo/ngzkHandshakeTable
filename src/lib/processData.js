import { without, concat, pullAll, zip } from "lodash-es";
import {
    now,
    ISODateToNum,
    dayFrom,
    nearestNumberInSortedArr,
    offsetISOdays,
    datesToRanges,
    isISODate,
    numOfMonthsFromNow,
    nth,
    nthColor,
    bdayToGakunen,
    sortGakunen,
    compareISODateDescend,
    composeCompares,
    fillArrayByLastEntry,
} from "$lib/util.js";

/**  Loading all data */
// * This is BAD PRACTICE
// * In theory, should construct a class, and load data in load function
// * then pass the loaded data to create an object, and process data from that object
// * then return the processed data as output of load function
import basicCDData from "$lib/data/basicData.json";
import members from "$lib/data/members.json";

export const membersdata = members;
const files = import.meta.glob("./data/ended/*.json", {
    eager: true,
});
const currentCD = import.meta.glob("./data/current.json", { eager: true });
export const currentCDData = currentCD["./data/current.json"];
export const fulldata = new Array(basicCDData.length);
Object.keys(files).map((path) => {
    let parts = path.split("/");
    let f = parts[parts.length - 1].split(".")[0];
    fulldata[basicCDData.indexOf(f)] = files[path];
});
fulldata[fulldata.length - 1] = currentCDData;
/*****/

/**
 * GroupedData
 * @typedef {Object} GroupedData
 * @property {string} label
 * @property {string|number} value
 * @property {Array<any>} has
 */

function getCDDateRange() {
    let cdDates = fulldata.map((x) => {
        return {
            cd: cdAlias(x.cd).value,
            release: x.cd.release,
            releaset: new Date(x.cd.release),
            meets: x.meetDates,
        };
    });
    cdDates.sort((a, b) => a.releaset.getTime() - b.releaset.getTime());
    // last day of each cd, each entry is an object {date: string, obj: Date}
    let endDates = cdDates.slice(1).map((x) => x.release);
    // set last date of latest CD as 30 days after final meet
    let lastdate = new Date(cdDates[cdDates.length - 1].meets.slice(-1)[0]);
    lastdate.setDate(lastdate.getDate() + 30);
    endDates.push(lastdate.toISOString().slice(0, 10));

    cdDates[0].start = cdDates[0].release;
    cdDates[0].startt = cdDates[0].releaset;

    for (let i = 0; i < cdDates.length; i++) {
        let trueEnd = offsetISOdays(endDates[i], -1);
        cdDates[i].end = trueEnd.date;
        cdDates[i].endt = trueEnd.obj;
        if (i > 0) {
            let trueStart = offsetISOdays(cdDates[i - 1].meets.slice(-1)[0], 1);
            cdDates[i].start = trueStart.date;
            cdDates[i].startt = trueStart.obj;
        }
        //cdDates[i].ranges = datesToRanges([cdDates[i].start, ...cdDates[i].meets, cdDates[i].end]);
        cdDates[i].dates = [
            cdDates[i].start,
            ...cdDates[i].meets,
            cdDates[i].end,
        ];
        cdDates[i].ranges = datesToRanges(cdDates[i].dates);
    }
    // cdDates[i]={cd, release, start, end, meets, dates=[start,...meets,end], ranges=[0,d1,d2,...]
    //				releaset, startt, endt }
    return cdDates;
}
export var cdDateRange = getCDDateRange();

// determine if mb's bday is within the date range of CD
export function mbBdayInRange(memberName, dateRange) {
    //let dateRange = cdDateRange.filter((x) => x.release == cdData.cd.release)[0];
    let mb = getMember(memberName);
    let bdayCount = dayFrom(mb.dob, dateRange.start);
    let isInRange = bdayCount <= dateRange.ranges[dateRange.ranges.length - 1];
    let res = {
        inRange: false,
        meetDate: "",
        idx: -1,
    };
    if (isInRange) {
        res.inRange = true;
        let rangeInfo = nearestNumberInSortedArr(bdayCount, dateRange.ranges);
        if (rangeInfo.idx == 0) {
            res.idx = 0;
            res.meetDate = dateRange.meets[0];
            return res;
        }
        if (rangeInfo.idx == dateRange.ranges.length - 1) {
            res.idx = dateRange.meets.length;
            res.meetDate = dateRange.meets[dateRange.meets.length - 1];
            return res;
        }
        res.idx = rangeInfo.idx - 1;
        res.meetDate = dateRange.meets[res.idx];
        return res;
    }
    return res;
}

export const isExpandedDatalist = (l) => "slotsSoldex" in l[0];

export function getMember(name) {
    let res = members.filter(({ member }) => member == name);
    if (res.length != 0) {
        res[0]["stripped_kanji"] = res[0].kanji.replace(" ", "");
        return res[0];
    } else {
        return {
            memebr: name,
            kanji: name,
            furi: name,
            stripped_kanji: name,
            gen: 0,
            dob: "1900-01-01",
            from: "",
            graduation: "",
        };
    }
}

export function getMembers(listOfNames) {
    return listOfNames.map((x) => getMember(x));
}

export function getAllMembers() {
    return members.map((x) => {
        x["stripped_kanji"] = x.kanji.replace(" ", "");
        return x;
    });
}

export function getCurrentMembers() {
    return members.reduce(
        (res, { member, graduation }) =>
            graduation === "" || graduation === "rest"
                ? res.push(getMember(member)) && res
                : compareISODateDescend(graduation, now) < 0
                ? res.push(getMember(member)) && res
                : res,
        []
    );
}

/**
 * @param  {object} cdData - full cd data object
 * @param  {string} dataform - default to "full", either "full"->return full member data,  or "name"->return only member name
 */
export function involvedMembers(cdData, dataform = "full") {
    return cdData.table.map(({ member }) =>
        dataform == "name" ? member : getMember(member)
    );
}
/**
 * @param  {Array<string>} memberNameList
 * @return {number} position of the starting cd in fulldata array
 */
export function findStartingCD(memberNameList) {
    for (let i = 0; i < fulldata.length; i++) {
        let found = false;
        for (let mb of memberNameList) {
            found ||= !!fulldata[i].table.find((x) => x.member == mb);
        }
        if (found) return i;
    }
    return fulldata.length; //everyone in list not in any CD, something is strange
}

export function performedInCDs(memberName) {
    return fulldata
        .filter((x) => !!x.table.find((y) => y.member == memberName))
        .map(({ cd }) => cd);
}

const graduation2label = (s) => {
    if (isISODate(s)) {
        return "OG";
    } else {
        return "現役";
    }
};

const groupID2label = (id) => {
    switch (id) {
        case "sbt":
            return "選抜";
        case "und":
            return "アンダー";
        case "grad":
            return "卒業予定";
        default:
            if (id.match(/^(gen)\d+$/)) return `${id.slice(3)}期生`;
            return `?`;
    }
};

/** Compare functions for various orderings;
 */
export const ordering = {
    furi: (a, b) => a.localeCompare(b, "ja"),
    mbfuri: (a, b) =>
        getMember(a.member).furi.localeCompare(getMember(b.member).furi, "ja"),
    gen: (a, b) => a - b,
    height: (a, b) => b - a,
    group: (a, b) => {
        let o = [
            "grad",
            "sbt",
            "und",
            ...[...Array(5).keys()].map((x) => `gen${x + 1}`),
        ];
        return o.indexOf(a) - o.indexOf(b);
    },
    dobyear: (a, b) => a - b,
    nextBDay: (a, b) => dayFrom(a) - dayFrom(b), // input are ISOdates YYYY-MM-DD
    soldstatus: (a, b) => (a ? -1 : b ? 1 : 0),
    genFuri: (a, b) =>
        composeCompares(
            [this.gen, this.furi],
            [a.gen, a.furi],
            [b.gen, b.furi]
        ),
    gakunen: sortGakunen,
    nextDOBMonth: (a, b) => a - b,
    ISODateDescend: compareISODateDescend,
    ISODateAscend: (a, b) => compareISODateDescend(b, a),
    descendingChain: (a, b) => {
        // data should be !increasing! array of numbers
        let zipped =
            a.length < b.length
                ? zip(fillArrayByLastEntry(a, b.length), b).reverse()
                : b.length > a.length
                ? zip(a, fillArrayByLastEntry(b, a.length)).reverse()
                : zip(a, b).reverse();
        let i = 0;
        while (i < zipped.length) {
            let diff = zipped[i][0] - zipped[i][1];
            if (diff != 0) {
                return diff > 0 ? -1 : 1;
            }
            i++;
        }
        return 0; // every accumulative sold data are the same
    },
};

export function compSoldoutDetailed(a, b) {
    let firstComp =
        a.soldoutAt > 0
            ? b.soldoutAt > 0
                ? a.soldoutAt - b.soldoutAt
                : -1 // b not all soldout
            : b.soldoutAt > 0
            ? 1 // b  has all soldout, but a has not
            : "bothRemains"; //both not all sold out

    if (firstComp == "bothRemains") {
        let secComp = b.numSold[0] - a.numSold[0];
        return secComp == 0
            ? ordering.descendingChain(a.accumulative, b.accumulative)
            : secComp;
    }
    // both have all sold out at the same time
    return firstComp == 0
        ? ordering.descendingChain(a.accumulative, b.accumulative)
        : firstComp;
}

export const opt2label = (opt, val) => {
    switch (opt) {
        case "gen":
            return `${val}期生`;
        case "group":
            return groupID2label(val);
        case "height":
            return `${val}cm`;
        case "graduation":
            return graduation2label(val);
        case "bloodtype":
            return val != "不明" ? `${val}型` : "不明";
        case "dobyear":
            return isISODate(val) ? `${val.slice(0, 4)}年` : `${val}年`;
        case "dobmonth":
            return isISODate(val) ? `${val.slice(5, 7)}月` : `${val}月`;
        case "soldstatus":
            return val ? "完売" : "未完売";
        case "from":
        case "gakunen":
        default:
            return val;
    }
};

const expandSoldslots = (mbdata) => {
    if (!("slotsSoldex" in mbdata))
        mbdata["slotsSoldex"] = mbdata.slotsSold.map((x) => x.split("|"));
    return mbdata.slotsSoldex;
};

const accumulativeSum = (arr) => {
    return arr.reduce((result, currentNum) => {
        if (result.length > 0) {
            const lastSum = result[result.length - 1];
            result.push(lastSum + currentNum);
        } else {
            result.push(currentNum);
        }
        return result;
    }, []);
};

/**
 * @typedef {Object} ExpandedMemberSlotData
 * @property {string} member
 * @property {string[]} slotsSoldex
 * @property {[number,number]} numSold how many sold, and number of slots
 * @property {number} soldoutAt when all sold out (not yet sold out if 0)
 * @property {number[]} numSoldAtEach numeSoldAt[i] = number of slots sold at the (i+1)st draw
 * @property {number[]} accumulative accumulative[i] = sum of numSoldAtEach[i] for i=0,...,i
 * @property {string} group sbt (Senbatsu) or und (Under), could be other group
 */
/**
 * @param  {Object} mbdata raw data
 * @param  {Object} groups possible groups in current CD
 * @return {ExpandedMemberSlotData}
 */
export function expandMBData(mbdata, groups) {
    let res = {
        member: mbdata.member,
        slotsSoldex: [],
        numSold: [0, 0],
        soldoutAt: -1,
        numSoldAtEach: [],
        accumulative: [],
        group: "",
    };
    res.group = groups == "" ? "" : determineGroup(mbdata, groups);
    // res.slotsSoldex =
    // 	'slotsSoldex' in mbdata ? mbdata.slotsSoldex : mbdata.slotsSold.map((x) => x.split('|'));
    res.slotsSoldex = expandSoldslots(mbdata);
    let f = res.slotsSoldex.flat();
    let soldatdraws = f.filter((x) =>
        x.match(/^\d+$/) ? parseInt(x) > 0 : false
    );
    res.numSold = [
        soldatdraws.length,
        f.filter((x) => x != "x" && x != "?").length,
    ];
    let lastsoldAt =
        soldatdraws.length > 0
            ? Math.max(...soldatdraws.map((x) => parseInt(x)))
            : 0;
    // console.log(soldatdraws.map((x) => parseInt(x)));
    res.soldoutAt = res.numSold[0] == res.numSold[1] ? lastsoldAt : -1;
    res.numSoldAtEach = Array(lastsoldAt).fill(0);
    soldatdraws.forEach((n) => res.numSoldAtEach[n - 1]++);
    res.accumulative = accumulativeSum(res.numSoldAtEach);

    return res;
}

export function compareData(mbdataNow, mbdataCompare, atdraw = -1) {
    //TODO: rewrite using ExpandedMemberSlotData, which has "soldoutAt" property
    let [m, totalThen] = getNumSold(mbdataCompare, atdraw),
        [n, totalNow] = getNumSold(mbdataNow);
    //let diff = n !== 'N/A' ? `${m - n > 0 ? '+' : ''}${m - n}` : '';
    let lastTimeSoldout = m == totalThen,
        currentSoldout = n == totalNow,
        bothSoldout = lastTimeSoldout && currentSoldout;
    // if (mbdataNow.member == 'Yoda Yuuki') {
    // 	//just check everything is correct...
    // 	console.log(`m=${m}, totalThen=${totalThen}`);
    // 	console.log(`m=${n}, totalThen=${totalNow}`);
    // 	console.log(`last:${lastTimeSoldout}, curr:${currentSoldout}, both:${bothSoldout}`);
    // 	console.log(`old data detail: ${finalSoldoutDraw(mbdataCompare)}`);
    // }

    if (bothSoldout) {
        return {
            prev: m,
            curr: n,
            diff: 0,
            extraprev: `(${finalSoldoutDraw(mbdataCompare)}次)`,
            extracurr: `(${finalSoldoutDraw(mbdataNow)}次)`,
            extradiff: totalThen != "N/A" ? `全完売` : "",
        };
    } else if (lastTimeSoldout && n > m) {
        return {
            prev: `${m}(全)`,
            curr: n,
            diff: "N/A",
        };
    } else if (currentSoldout && n < m) {
        return {
            prev: m,
            curr: `${n}(全)`,
            diff: "N/A",
        };
    } else {
        return {
            prev: totalThen == "N/A" ? "N/A" : m,
            curr: `${n}${currentSoldout ? "(全)" : ""}`,
            diff: m !== "N/A" ? `${n - m > 0 ? "+" : ""}${n - m}` : "",
        };
    }
}

export function expandDataList(cdData) {
    let groups = concat(
        [
            { id: "sbt", has: cdData.sbt },
            { id: "und", has: getUnderList(cdData) },
        ],
        cdData.addgroups ? cdData.addgroups : []
    );
    let dateRange = cdDateRange.filter(
        ({ release }) => release == cdData.cd.release
    )[0];
    // if (cdData.cd.num == 31) {
    // 	console.log('31st single ', dateRange);
    // }
    let res = cdData.table.map((x) => expandMBData(x, groups));
    res.map((x) => {
        let info = mbBdayInRange(x.member, dateRange);
        // if (cdData.cd.num == 31) {
        // 	console.log('member ', x.member, ' in range? ', info.inRange);
        // }
        // info = { inRange: false, meetDate: '', idx: -1 } if mb's bday is not in range
        x["bdayMeet"] = info.inRange
            ? {
                  bday: getMember(x.member).dob.slice(5),
                  meetDate: info.meetDate,
                  idx: info.idx,
              }
            : 0;
    });
    return res;
}

/** total number sold up to and including atdraw
 * @param  {Object} mbdata - Member sold data, with non-empty slotssold
 * @param  {Integer} atdraw - default to -1, meaning after all draw completed
 */
export function getNumSold(mbdata, atdraw = -1) {
    if (!mbdata) return [0, "N/A"];
    let expanded = expandSoldslots(mbdata).flat();
    let bound = atdraw == -1 ? finalSoldoutDraw(mbdata) : atdraw;
    // bound=-1 if atDraw is not specified and there is no soldout at all
    let total = expanded.filter((x) => x != "x" && x != "?").length;
    return bound == -1
        ? [0, total]
        : [
              expanded.filter((x) =>
                  x.match(/^\d+$/) ? parseInt(x) <= bound : false
              ).length,
              total,
          ];
}

export function finalSoldoutDraw(mbdata) {
    return mbdata
        ? expandSoldslots(mbdata)
              .flat()
              .reduce((prev, curr) => {
                  if (String(curr).match(/^\d+$/)) {
                      let c = parseInt(curr);
                      return c > prev ? c : prev;
                  } else {
                      //accummulated value is not number => no sold data yet
                      return String(prev).match(/^\d+$/) ? parseInt(prev) : -1;
                  }
              })
        : -1;
}

/**
 * @param  {Array.<Object>} mbDataList - an array of JSON, each must consist of a "member" key
 * @param  {string} opt - one of gen, bloodtype, status, from, dobyear, dobmonth
 * @param {Array.<any>} includes - foces empty entry presented in includes even if no member satisfies critera
 * @param {boolean} subsort - sort each "has" item using subsortOpt if true
 * @param {string} subsortOrder - ordering used for subsort
 * @return {Array.<GroupedData>}
 */
export function partitionToGroup(
    mbDataList,
    opt = "gen",
    includes = [],
    subsort = false,
    subsortOrder = "ISODateAscend"
) {
    /* ! This better to be rewritten with a more functional approach 
        to allow complex composition of orders
    */
    if (opt == "none") return mbDataList;

    let res = [];
    let withopt = [];

    for (let mbdata of mbDataList) {
        let mb = getMember(mbdata.member);
        let val,
            label = "";
        switch (opt) {
            case "furi":
                val = mb.furi[0];
                break;
            case "gakunen":
                val = bdayToGakunen(mb.dob);
                break;
            case "dobyear":
                val = mb.dob.slice(0, 4);
                break;
            case "dobmonth":
                val = mb.dob.slice(5, 7);
                break;
            case "nextDOBMonth":
                val = numOfMonthsFromNow(mb.dob)[0];
                label = `${ISODateToNum(mb.dob, "m")}月`;
                break;
            case "group":
                val = mbdata.group;
                break;
            case "soldstatus":
                val = mbdata.numSold[0] == mbdata.numSold[1];
                break;
            default:
                val = mb[opt];
                break;
        }
        let i = withopt.indexOf(val);

        if (i != -1) {
            //create new group if value didn't exist
            res[i].has.push(mbdata);
        } else {
            withopt.push(val);
            res.push({
                label: label == "" ? opt2label(opt, val) : label,
                value: val,
                has: [mbdata],
            });
        }
    }
    for (let val of includes) {
        if (withopt.indexOf(val) == -1) {
            withopt.push(val);
            res.push({ label: opt2label(opt, val), value: val, has: [] });
        }
    }
    if (subsort)
        res.forEach((x) => {
            x.has = sortPlainList(x.has, subsortOrder);
        });
    // sort the groups
    return res.sort((a, b) => ordering[opt](a.value, b.value));
}

export function sortList(datalist, opt = "none") {
    //checked if it is a grouped list or ungrouped list
    return "has" in datalist[0]
        ? datalist.map((x) => {
              x.has = sortPlainList(x.has, opt);
              return x;
          })
        : sortPlainList(datalist, opt);
}

//wrapper for sort list of member data
function sortPlainList(mbdatalist, opt = "kana") {
    switch (opt) {
        case "numsold": {
            let t = isExpandedDatalist(mbdatalist)
                ? mbdatalist
                : mbdatalist.map((x) => expandMBData(x, ""));
            return t.sort(compSoldoutDetailed);

            // return t.sort((a, b) => {
            //     // let soldout = [a, b].map((x) => x.numSold[0] == x.numSold[1]);
            //     // compose sort
            //     // let firstSort;
            //     // if (soldout[0]) {
            //     //     firstSort = soldout[1] ? b.numSold[0] - a.numSold[0] : -1;
            //     // } else {
            //     //     firstSort = soldout[1] ? 1 : b.numSold[0] - a.numSold[0];
            //     // }
            //     let firstSort = compareAllSoldOut(a, b);
            //     return firstSort !== 0 ? firstSort : ordering.mbfuri(a, b);
            // });
        }
        case "kana":
            return mbdatalist.sort(ordering.mbfuri);
        case "nextBDay":
            return mbdatalist.sort((a, b) => ordering.nextBDay(a.dob, b.dob));
        case "dobAscend":
            return mbdatalist.sort((a, b) =>
                ordering.ISODateAscend(a.dob, b.dob)
            );
    }
}

export function cdAlias(cd) {
    let value = `${cd.num}${cd.type}`;

    // let type;
    // switch (cd.type) {
    // 	case 'Best':
    // 		type = 'Best Album';
    // 		break;
    // 	default:
    // 		type = cd.type;
    // 		break;
    // }

    let display = `${cd.num}${nth(cd.num)} ${cd.type}`;
    return { display: display, value: value };
}

export function findCDIndex(alias) {
    return fulldata.findIndex((x) => cdAlias(x.cd).value == alias);
}

function getUnderList(cdData) {
    let mblist = cdData.table.map((x) => x.member);
    if ("addgroups" in cdData)
        cdData.addgroups.map((x) => pullAll(mblist, x.has));
    return without(mblist, ...cdData.sbt);
}

function determineGroup(mb, groups) {
    for (let g of groups) {
        if (g.has.indexOf(mb.member) !== -1) return g.id;
    }
    return "NoData";
}

/**
 * ************
 * For chart js
 * ************
 */
// dashed segment for data gap in series
// see: https://www.chartjs.org/docs/latest/samples/line/segments.html
const skipped = (ctx, value) =>
    ctx.p0.skip || ctx.p1.skip ? value : undefined;

export function simpleSeries(label, data, colorIndex = 0) {
    return {
        label: label,
        data: data,
        borderColor: `${nthColor(colorIndex)}`,
        backgroundColor: `${nthColor(colorIndex)}`,
        pointHitRadius: 20, // larger area for intersect detection
        segment: {
            borderColor: (ctx) => skipped(ctx, "rgb(0,0,0,0.5)"),
            borderDash: (ctx) => skipped(ctx, [6, 6]),
        },
        spanGaps: true,
        datalabels: {
            color: "white",
            backgroundColor: `${nthColor(colorIndex)}`,
        },
    };
}

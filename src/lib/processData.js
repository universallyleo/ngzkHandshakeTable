import { without, concat, pullAll } from "lodash-es";
import {
    dayFrom,
    nearestNumberInSortedArr,
    offsetISOdays,
    datesToRanges,
    isISODate,
    nth,
    bdayToGakunen,
    sortGakunen,
    compareISODateDescend,
    composeCompares,
} from "$lib/util.js";
import members from "$lib/data/members.json";
import fulldata from "$lib/data/data.json";

function getCDDateRange() {
    let cdDates = fulldata.map((x) => {
        return {
            cd: cdAlias(x.cd),
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
            graduation: "none",
        };
    }
}

export function getMembers(listOfNames) {
    return listOfNames.map((x) => getMember(x));
}

export function getAllMembers() {
    return members.map(({ member }) => getMember(member));
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
    gen: (a, b) => a - b,
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
    ISODateDescend: compareISODateDescend,
    ISODateAscend: (a, b) => compareISODateDescend(b, a),
};

export const opt2label = (opt, val) => {
    switch (opt) {
        case "gakunen":
            return val;
        case "gen":
            return `${val}期生`;
        case "group":
            return groupID2label(val);
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
            return val;
    }
};

const expandSoldslots = (mbdata) => {
    if (!("slotsSoldex" in mbdata))
        mbdata["slotsSoldex"] = mbdata.slotsSold.map((x) => x.split("|"));
    return mbdata.slotsSoldex;
};

export function expandMBData(mbdata, groups) {
    let res = {
        member: mbdata.member,
        slotsSoldex: [],
        numSold: [0, 0],
        group: "",
    };
    // res.slotsSoldex =
    // 	'slotsSoldex' in mbdata ? mbdata.slotsSoldex : mbdata.slotsSold.map((x) => x.split('|'));
    res.slotsSoldex = expandSoldslots(mbdata);
    let f = res.slotsSoldex.flat();
    res.numSold = [
        f.filter((x) => (x.match(/^\d+$/) ? parseInt(x) > 0 : false)).length,
        f.filter((x) => x != "x" && x != "?").length,
    ];
    res.group = groups == "" ? "" : determineGroup(mbdata, groups);
    return res;
}

export function compareData(mbdataNow, mbdataCompare, atdraw = -1) {
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
 */
export function partitionToGroup(
    mbDataList,
    opt = "gen",
    subsort = null,
    subsortOpt = "dobAscend"
) {
    if (opt == "none") return mbDataList;

    let res = [];
    let withopt = [];

    for (let mbdata of mbDataList) {
        let mb = getMember(mbdata.member);
        let val;
        switch (opt) {
            case "gakunen":
                val = bdayToGakunen(mb.dob);
                break;
            case "dobyear":
                val = mb.dob.slice(0, 4);
                break;
            case "dobmonth":
                val = mb.dob.slice(5, 7);
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
            res.push({ label: opt2label(opt, val), value: val, has: [mbdata] });
        }
    }
    if (subsort)
        res.forEach((x) => {
            x.has = sortList(x.has, subsortOpt);
        });
    // console.log(`Sort by ${opt}`);
    // console.log(ordering[opt]);
    return res.sort((a, b) => ordering[opt](a.value, b.value));
}

export function sortList(datalist, opt = "none") {
    //checked if it is a grouped list or ungrouped list
    return "has" in datalist[0]
        ? datalist.map((x) => {
              return {
                  label: x.label,
                  value: x.value,
                  has: sortPlainList(x.has, opt),
              };
          })
        : sortPlainList(datalist, opt);
}

function sortPlainList(mbdatalist, opt = "kana") {
    switch (opt) {
        case "numsold": {
            // console.log('Sorting by numSold, original list:', mbdatalist);
            let t = isExpandedDatalist(mbdatalist)
                ? mbdatalist
                : mbdatalist.map((x) => expandMBData(x, ""));
            return t.sort((a, b) => {
                let soldout = [a, b].map((x) => x.numSold[0] == x.numSold[1]);
                if (soldout[0])
                    return soldout[1] ? b.numSold[0] - a.numSold[0] : -1;
                //TODO: sort by name
                else return soldout[1] ? 1 : b.numSold[0] - a.numSold[0];
            });
        }
        case "kana":
            // return mbdatalist.sort((a, b) => {
            // 	let [aa, bb] = getMembers([a.member, b.member]);
            // 	return aa.furi.localeCompare(bb.furi, 'ja');
            // });
            return mbdatalist.sort((a, b) => {
                return ordering.furi(
                    getMember(a.member).furi,
                    getMember(b.member).furi
                );
            });
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

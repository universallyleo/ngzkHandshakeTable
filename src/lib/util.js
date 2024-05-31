import { range, sortedIndex } from "lodash-es";

//#region Date string related

export function numberWithCommas(n) {
    // alternatively: return n.toLocaleString("en-US");
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// ! Consdier using date-fns instead of self-written code
/**
 * ISO format date (YYYY-MM-DD)
 * @typedef {string} ISODate
 */

const nowDTObj = new Date();
export const now = nowDTObj.toISOString().slice(0, 10); // in format '20xx-mm-dd'
const monthDays = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];
/**
 * @param  {ISODate} date
 * @param  {string} format day or d, month or m, year or y, md, ym
 * @return {number}
 */
export function ISODateToNum(date, format) {
    let [y, m, d] = date.split("-").map((x) => parseInt(x));
    switch (format) {
        case "day":
        case "d":
            return d;
        case "month":
        case "m":
            return m;
        case "year":
        case "y":
            return y;
        case "md":
            return [m, d];
        case "ym":
            return [y, m];
        default:
            return null;
    }
}
export function dayInYear(mmdd, year) {
    //count the number of day from 1st Jan (1st Jan = 1) in the year
    // assume mmdd is in format 'mm-dd'
    // year needs to be in the range 2001~2099
    if (year <= 2000 || year >= 3000)
        throw new Error(`Year must be in range 2001~2099 (input year ${year})`);
    let m = parseInt(mmdd.slice(0, 2));
    let d = parseInt(mmdd.slice(3));
    // in non-leap year, 02-29 has the same count as 03-01
    return monthDays[m - 1] + d + (year % 4 == 0 && m > 2 ? 1 : 0);
}

/**
 * @param  {ISODate} date - date in string 'yyyy-dd-mm' or 'dd-mm'
 * @param  {ISODate} from - relative to this date 'YYYY-DD-MM'
 * @returns {number} number of day of 'YYYY(+1)-dd-mm' from 'YYYY-DD-MM'
 */
export function dayFrom(date, from = now) {
    let year = parseInt(from.slice(0, 4));
    let dayAtFrom = dayInYear(from.slice(5), year);
    let noyearDate = date.length > 5 ? date.slice(5) : date;
    let diff = dayInYear(noyearDate, year) - dayAtFrom;
    return diff >= 0
        ? diff
        : dayInYear(noyearDate, year + 1) + (365 + (year % 0 != 0) - dayAtFrom);
}

function isFuture(date, shift = 0) {
    let target = new Date(date);
    shift == 0 ? null : target.setDate(target.getDate() + shift);
    return target.getTime() > nowDTObj.getTime();
}

/**
 * @param  {ISODate[]} dates
 * @param  {number} shift
 * @return -1 if all dates are in the past;
 *  otherwise, index of the first date D such that D+shift(days) is in the future
 */
export function firstFutureDate(dates, shift = 0) {
    let firstFuture = -1;
    for (let [i, date] of dates.entries()) {
        if (isFuture(date, shift)) {
            firstFuture = i;
            break;
        }
    }
    return firstFuture;
}

/**
 * [d1,d2,..., dn] -> [0,d2-d1,...,dn-d1]
 * @param  {Array<ISODate>} dates
 * @returns {Arrray<number>}
 */
export function datesToRanges(dates) {
    // following is [d1,d2,..., dn] -> [0,d1,d2-d1,...,dn-d(n-1)]
    // let diffs = dates
    // 	.reduce(
    // 		(prev, curr) => [...prev, [dayFrom(curr, prev[prev.length - 1][1]), curr]],
    // 		[[0, dates[0]]]
    // 	)
    // 	.slice(1);
    let from = dates[0];
    return dates.map((x) => dayFrom(x, from));
}

// return [num of months from current month to month of the date, date with adjusted year]
// adjusted year = this year if month of date is after now; otherwise next year
export function numOfMonthsFromNow(date, from = now) {
    let origin = ISODateToNum(from, "m");
    let target = ISODateToNum(date, "m");
    let thisYr = ISODateToNum(from, "y");
    let md = date.slice(5);
    if (target - origin <= 0) {
        if (target == origin && dayFrom(date, from) < 31) {
            return [target - origin, `${thisYr}-${md}`];
        } else {
            return [target + 12 - origin, `${thisYr + 1}-${md}`];
        }
    } else {
        return [target - origin, `${thisYr}-${md}`];
    }
}

// return array of item, each of the form [d, ["date1", "date2", ...]]
// where d = how many months is today away from date1
// export function upcomingDOBByMonthsFromNow(dates, from = now) {
//     let sortedDates = uniqBy(
//         dates.sort((a, b) => dayFrom(a) - dayFrom(b)),
//         (x) => x.slice(5)
//     ); // list of "mm-dd", in order from TODAY
//     let prevMonth = ISODateToNum(sortedDates[0], "m");
//     let accumDiff = ISODateToNum(sortedDates[0], "m") - ISODateToNum(from, "m");
//     let i = 0;
//     let monthsDiff = [[accumDiff, [sortedDates[0]]]];
//     for (let x of sortedDates.slice(1)) {
//         let thisMonth = ISODateToNum(x, "m");
//         if (thisMonth != prevMonth) {
//             accumDiff +=
//                 thisMonth - prevMonth < 0
//                     ? thisMonth + 12 - prevMonth
//                     : thisMonth - prevMonth;
//             prevMonth = thisMonth;
//             i++;
//             monthsDiff.push([accumDiff, [x]]);
//         } else {
//             monthsDiff[i][1].push(x);
//         }
//     }
//     return monthsDiff;
// }

export function JPDateDisplay(date) {
    let gps = date.split("-");
    return gps.length > 2
        ? `${gps[0]}年${gps[1]}月${gps[2]}日`
        : `${gps[0]}月${gps[1]}日`;
}
/**
 * @param  {ISODate} date fromat "YYYY-MM-DD"
 * @return {string} gakunen, format "yy/YY" where YY=yy+1, e.g. 99/00, 00/01
 */
export function bdayToGakunen(date) {
    let birthyear = parseInt(date.slice(0, 4));
    return parseInt(date.slice(5, 7)) < 4
        ? `${birthyear - 1}`.slice(2, 4) + "/" + date.slice(2, 4)
        : date.slice(2, 4) + "/" + `${birthyear + 1}`.slice(2, 4);
}

//TODO Gakunen (in real time years) -> Gakunen (literally, e.g. 中二, 大一, 社三)

//#region Sort related

export function sortGakunen(a, b) {
    let [c, d] = [a, b].map((x) => parseInt(x.slice(0, 2)));
    [c, d] = [c, d].map((x) => (x > 80 ? 1900 + x : 2000 + x));
    return c - d;
}

export function getAge(date) {
    var today = new Date();
    var birthDate = new Date(date);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    age -= m < 0 || (m === 0 && today.getDate() < birthDate.getDate()) ? 1 : 0;
    return age;
}

export function nearestNumberInSortedArr(target, arr) {
    //more readable version...
    return arr.reduce(
        (best, curr, currIdx) => {
            let diff = target - curr;
            return Math.abs(diff) < Math.abs(best.diff)
                ? { val: curr, idx: currIdx, diff: diff }
                : best;
        },
        { val: arr[0], idx: 0, diff: target - arr[0] }
    );
}

export function nearestNumberInSortedArrEfficient(target, arr) {
    let i = sortedIndex(arr, target); //arr[i] >= target
    if (i == 0) {
        return { val: arr[i], index: i, diff: target - arr[i] }; //diff<=0
    }
    if (i == arr.length) {
        return { val: arr[i - 1], index: i - 1, diff: target - arr[i - 1] }; //diff>=0
    }
    let dStart = target - arr[i - 1]; // dStart >=0
    let dEnd = arr[i] - target; // dEnd >= 0
    return dStart <= dEnd
        ? { val: arr[i - 1], index: i - 1, diff: target - arr[i - 1] } //diff>=0
        : { val: arr[i], index: i, diff: -dEnd }; //diff<=0
}

export function offsetISOdays(date, days) {
    let d = new Date(date);
    d.setDate(d.getDate() + days);
    return { date: d.toISOString().slice(0, 10), obj: d };
}

export const isISODate = (d) =>
    d.match(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);

export function nth(n) {
    return ["st", "nd", "rd"][((((n + 90) % 100) - 10) % 10) - 1] || "th";
}

//#region Colours related

export function nthColor(n) {
    const palette = [
        //from https://sashamaps.net/docs/resources/20-colors
        // c.f. https://stats.stackexchange.com/questions/118033/best-series-of-colors-to-use-for-differentiating-series-in-publication-quality
        "#911eb4", //purple
        "#3cb44b", //green
        "#4363d8", //blue
        "#e6194b", //red
        "#42d4f4", //cyan
        "#f58231", //orange
        "#f032e6", //magenta
        "#469990", //teal
        "#fabed4", //pink
        "#dcbeff", //lavender
        "#9a6324", //brown
        "#fffac8", //beige
        "#800000", //maroon
        "#aaffc3", //mint
        "#000075", //navy
        "#ffe119", //yellow
        "#bfef45", //lime
        "#808000", //olive
        "#ffd8b1", //apricot
        "#000000", //black
    ];
    return n < palette.length ? palette[n] : palette[n % palette.length];
}
/**
 * @param  {ISODate} a format: YYYY-MM-DD
 * @param  {ISODate} b format: YYYY-MM-DD
 * @return {integer} -1 if a is later, +1 if a is earlier, 0 if the same
 */
export function compareISODateDescend(a, b) {
    let da = a.split("-").map((x) => parseInt(x)),
        db = b.split("-").map((x) => parseInt(x));
    return composeCompares(
        [0, 0, 0].map(() => {
            return (a, b) => b - a;
        }),
        da,
        db
    );
}

export function composeCompares(compfuncs, a, b) {
    let c = range(compfuncs.length).map((i) => compfuncs[i](a[i], b[i]));
    return c.reduce((accum, curr) => (accum ? accum : curr));
}

export const colorCode = {
    white: "#FFF",
    orange: "#f39801",
    blue: "#0505ff",
    yellow: "#ffef00",
    purple: "#911eb4",
    green: "#009c4b",
    pink: "#eb79ad",
    red: "#e70012",
    water: "#1e90ff",
    yellowgreen: "#9aff98",
    turquoise: "#66cccc",
};

export const colorJPName = {
    white: "白",
    orange: "オレンジ",
    blue: "青",
    yellow: "黄",
    purple: "紫",
    green: "緑",
    pink: "ピンク",
    red: "赤",
    water: "水色",
    yellowgreen: "黄緑",
    turquoise: "ターコイズ",
};

export const colorContrast = {
    white: "black",
    orange: "white",
    blue: "white",
    yellow: "black",
    purple: "white",
    green: "white",
    pink: "white",
    red: "white",
    water: "white",
    yellowgreen: "black",
    turquoise: "white",
};

export function fillArrayByLastEntry(arr, len, defaultEntry = 0) {
    return arr.length == 0
        ? Array(len).fill(defaultEntry)
        : arr.length == len
        ? arr
        : [...arr, Array(len - arr.length).fill(arr[arr.length - 1])];
}

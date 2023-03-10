import { range, sortedIndex } from 'lodash-es';

const now = new Date().toISOString().slice(0, 10); // in format '20xx-mm-dd'
const monthDays = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];
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
 * @param  {string} date - date in string 'yyyy-dd-mm' or 'dd-mm'
 * @param  {string} from - relative to this date 'YYYY-DD-MM'
 * @returns {number} number of day of 'YYYY(+1)-dd-mm' from 'YYYY-DD-MM'
 */
export function dayFrom(date, from = now) {
	let year = parseInt(from.slice(0, 4));
	let dayAtFrom = dayInYear(from.slice(5), year);
	let noyearDate = date.length > 5 ? date.slice(5) : date;
	let diff = dayInYear(noyearDate, year) - dayAtFrom;
	return diff >= 0 ? diff : dayInYear(noyearDate, year + 1) + (365 + (year % 0 != 0) - dayAtFrom);
}

/**
 * [d1,d2,..., dn] -> [0,d2-d1,...,dn-d1]
 * @param  {string} dates
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

export function JPDateDisplay(date) {
	let gps = date.split('-');
	return gps.length > 2 ? `${gps[0]}年${gps[1]}月${gps[2]}日` : `${gps[0]}月${gps[1]}日`;
}

export function bdayToGakunen(date) {
	let birthyear = parseInt(date.slice(0, 4));
	return parseInt(date.slice(5, 7)) < 4
		? `${birthyear - 1}`.slice(2, 4) + '/' + date.slice(2, 4)
		: date.slice(2, 4) + '/' + `${birthyear + 1}`.slice(2, 4);
}

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
			return Math.abs(diff) < Math.abs(best.diff) ? { val: curr, idx: currIdx, diff: diff } : best;
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

export const isISODate = (d) => d.match(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);

export function nth(n) {
	return ['st', 'nd', 'rd'][((((n + 90) % 100) - 10) % 10) - 1] || 'th';
}

export function nthColor(n) {
	const palette = [
		//from https://sashamaps.net/docs/resources/20-colors
		// c.f. https://stats.stackexchange.com/questions/118033/best-series-of-colors-to-use-for-differentiating-series-in-publication-quality
		'#911eb4', //purple
		'#3cb44b', //green
		'#4363d8', //blue
		'#e6194b', //red
		'#42d4f4', //cyan
		'#f58231', //orange
		'#f032e6', //magenta
		'#469990', //teal
		'#fabed4', //pink
		'#dcbeff', //lavender
		'#9a6324', //brown
		'#fffac8', //beige
		'#800000', //maroon
		'#aaffc3', //mint
		'#000075', //navy
		'#ffe119', //yellow
		'#bfef45', //lime
		'#808000', //olive
		'#ffd8b1', //apricot
		'#000000' //black
	];
	return n < palette.length ? palette[n] : palette[n % palette.length];
}

export function compareISODateDescend(a, b) {
	let da = a.split('-').map((x) => parseInt(x)),
		db = b.split('-').map((x) => parseInt(x));
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

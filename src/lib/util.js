import { without, concat, pullAll, range } from 'lodash-es';
import members from '$lib/data/members.json';
import fulldata from '$lib/data/data.json';

export const isISODate = (d) => d.match(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
export const isExpandedDatalist = (l) => 'slotsSoldex' in l[0];

export function getMember(name) {
	let res = members.filter((x) => x.member == name);
	if (res.length != 0) {
		res[0]['stripped_kanji'] = res[0].kanji.replace(' ', '');
		return res[0];
	} else {
		return {
			memebr: name,
			kanji: name,
			furi: name,
			stripped_kanji: name,
			gen: 0,
			dob: '1900-01-01',
			from: '',
			status: 'none'
		};
	}
}

export function getMembers(listOfNames) {
	return listOfNames.map((x) => getMember(x));
}
/**
 * @param  {object} cdData - full cd data object
 * @param  {string} dataform - default to "full", either "full"->return full member data,  or "name"->return only member name
 */
export function involvedMembers(cdData, dataform = 'full') {
	return cdData.table.map((x) => (dataform == 'name' ? x.member : getMember(x.member)));
}

export function performedInCDs(memberName) {
	return fulldata.filter((x) => !!x.table.find((y) => y.member == memberName)).map((x) => x.cd);
}

const status2label = (s) => {
	if (isISODate(s)) {
		return 'OG';
	} else {
		return '現役';
	}
};

const groupID2label = (id) => {
	switch (id) {
		case 'sbt':
			return '選抜';
		case 'und':
			return 'アンダー';
		case 'grad':
			return '卒業予定';
		default:
			if (id.match(/^(gen)\d+$/)) return `${id.slice(3)}期生`;
			return `?`;
	}
};

/** Compare functions for various orderings;
 */
export const ordering = {
	furi: (a, b) => a.localeCompare(b, 'ja'),
	gen: (a, b) => a - b,
	group: (a, b) => {
		let o = ['grad', 'sbt', 'und', ...[...Array(5).keys()].map((x) => `gen${x + 1}`)];
		return o.indexOf(a) - o.indexOf(b);
	},
	'dob-year': (a, b) => a - b,
	soldstatus: (a, b) => (a ? -1 : b ? 1 : 0),
	genFuri: (a, b) => composeCompares([this.gen, this.furi], [a.gen, a.furi], [b.gen, b.furi]),
	ISODateDescend: compareISODateDescend,
	ISODateAscend: (a, b) => compareISODateDescend(b, a)
};

export const opt2label = (opt, val) => {
	switch (opt) {
		case 'gen':
			return `${val}期生`;
		case 'group':
			return groupID2label(val);
		case 'status':
			return status2label(val);
		case 'bloodtype':
			return val != '不明' ? `${val}型` : '不明';
		case 'dob-year':
			return isISODate(val) ? `${val.slice(0, 4)}年` : `${val}年`;
		case 'dob-month':
			return isISODate(val) ? `${val.slice(5, 7)}月` : `${val}月`;
		case 'soldstatus':
			return val ? '完売' : '未完売';
		case 'from':
			return val;
	}
};

const expandSoldslots = (mbdata) => {
	if (!('slotsSoldex' in mbdata)) mbdata['slotsSoldex'] = mbdata.slotsSold.map((x) => x.split('|'));
	return mbdata.slotsSoldex;
};

export function expandMBData(mbdata, groups) {
	let res = { member: mbdata.member, slotsSoldex: [], numSold: [0, 0], group: '' };
	// res.slotsSoldex =
	// 	'slotsSoldex' in mbdata ? mbdata.slotsSoldex : mbdata.slotsSold.map((x) => x.split('|'));
	res.slotsSoldex = expandSoldslots(mbdata);
	let f = res.slotsSoldex.flat();
	res.numSold = [
		f.filter((x) => (x.match(/^\d+$/) ? parseInt(x) > 0 : false)).length,
		f.filter((x) => x != 'x' && x != '?').length
	];
	res.group = groups == '' ? '' : determineGroup(mbdata, groups);
	return res;
}

export function compareData(mbdataNow, mbdataCompare, atdraw = -1) {
	let [m, totalThen] = getNumSold(mbdataCompare, atdraw),
		[n, totalNow] = getNumSold(mbdataNow, atdraw);
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
			extradiff: totalThen != 'N/A' ? `全完売` : ''
		};
	} else if (lastTimeSoldout && n > m) {
		return {
			prev: `${m}(全)`,
			curr: n,
			diff: 'N/A'
		};
	} else if (currentSoldout && n < m) {
		return {
			prev: m,
			curr: `${n}(全)`,
			diff: 'N/A'
		};
	} else {
		return {
			prev: totalThen == 'N/A' ? 'N/A' : m,
			curr: `${n}${currentSoldout ? '(全)' : ''}`,
			diff: m !== 'N/A' ? `${n - m > 0 ? '+' : ''}${n - m}` : ''
		};
	}
}

export function expandDataList(cdData) {
	let groups = concat(
		[
			{ id: 'sbt', has: cdData.sbt },
			{ id: 'und', has: getUnderList(cdData) }
		],
		cdData.addgroups ? cdData.addgroups : []
	);
	return cdData.table.map((x) => expandMBData(x, groups));
}

/** total number sold up to and including atdraw
 * @param  {Object} mbdata - Member sold data, with non-empty slotssold
 * @param  {Integer} atdraw - default to -1, meaning after all draw completed
 */
export function getNumSold(mbdata, atdraw = -1) {
	if (!mbdata) return [0, 'N/A'];
	let expanded = expandSoldslots(mbdata).flat();
	let bound = atdraw == -1 ? finalSoldoutDraw(mbdata) : atdraw;
	// bound=-1 if atDraw is not specified and there is no soldout at all
	let total = expanded.filter((x) => x != 'x' && x != '?').length;
	return bound == -1
		? [0, total]
		: [expanded.filter((x) => (x.match(/^\d+$/) ? parseInt(x) <= bound : false)).length, total];
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
 * @param  {string} opt - one of gen, bloodtype, status, from, dob-year, dob-month
 */
export function partitionToGroup(mbDataList, opt = 'gen') {
	if (opt == 'none') return mbDataList;

	//TODO: validate opt is valid
	//TODO: advanced key handling: birth year/month, below/above height (for e.g.), kana

	let res = [];
	let withopt = [];

	for (let mbdata of mbDataList) {
		let mb = getMember(mbdata.member);
		let val;
		switch (opt) {
			case 'dob-year':
				val = mb.dob.slice(0, 4);
				break;
			case 'dob-month':
				val = mb.dob.slice(5, 7);
				break;
			case 'group':
				val = mbdata.group;
				break;
			case 'soldstatus':
				val = mbdata.numSold[0] == mbdata.numSold[1];
				break;
			default:
				val = mb[opt];
				break;
		}
		let i = withopt.indexOf(val);

		if (i != -1) {
			res[i].has.push(mbdata);
		} else {
			withopt.push(val);
			res.push({ label: opt2label(opt, val), value: val, has: [mbdata] });
		}
	}
	// console.log(`Sort by ${opt}`);
	// console.log(ordering[opt]);
	return res.sort((a, b) => ordering[opt](a.value, b.value));
}

export function sortList(datalist, opt = 'none') {
	//checked if it is a grouped list or ungrouped list
	return 'has' in datalist[0]
		? datalist.map((x) => {
				return { label: x.label, value: x.value, has: sortPlainList(x.has, opt) };
		  })
		: sortPlainList(datalist, opt);
}

function sortPlainList(mbdatalist, opt = 'kana') {
	switch (opt) {
		case 'numsold': {
			// console.log('Sorting by numSold, original list:', mbdatalist);
			let t = isExpandedDatalist(mbdatalist)
				? mbdatalist
				: mbdatalist.map((x) => expandMBData(x, ''));
			return t.sort((a, b) => {
				let soldout = [a, b].map((x) => x.numSold[0] == x.numSold[1]);
				if (soldout[0]) return soldout[1] ? b.numSold[0] - a.numSold[0] : -1; //TODO: sort by name
				else return soldout[1] ? 1 : b.numSold[0] - a.numSold[0];
			});
		}
		case 'kana':
			// return mbdatalist.sort((a, b) => {
			// 	let [aa, bb] = getMembers([a.member, b.member]);
			// 	return aa.furi.localeCompare(bb.furi, 'ja');
			// });
			return mbdatalist.sort((a, b) => {
				return ordering.furi(getMember(a.member).furi, getMember(b.member).furi);
			});
		default:
			return mbdatalist;
	}
}

export function nth(n) {
	return ['st', 'nd', 'rd'][((((n + 90) % 100) - 10) % 10) - 1] || 'th';
}

export function cdData(cd) {
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

function getUnderList(cdData) {
	let mblist = cdData.table.map((x) => x.member);
	if ('addgroups' in cdData) cdData.addgroups.map((x) => pullAll(mblist, x.has));
	return without(mblist, ...cdData.sbt);
}

function determineGroup(mb, groups) {
	for (let g of groups) {
		if (g.has.indexOf(mb.member) !== -1) return g.id;
	}
	return 'NoData';
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

function compareISODateDescend(a, b) {
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

function composeCompares(compfuncs, a, b) {
	let c = range(compfuncs.length).map((i) => compfuncs[i](a[i], b[i]));
	return c.reduce((accum, curr) => (accum ? accum : curr));
}

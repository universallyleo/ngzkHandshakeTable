import { without, concat, pullAll, find } from 'lodash-es';
import members from '$lib/data/members.json';

export const isISODate = (d) => d.match(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
export const isExpandedDatalist = (l) => 'slotsSoldex' in l[0];

export function getMember(name) {
	let res = members.filter((x) => x.member == name);
	return res.length == 0
		? { memebr: name, kanji: name, furi: name, gen: 0, dob: '1900-01-01', from: '', status: 'none' }
		: res[0];
}

export function getMembers(listOfNames) {
	return listOfNames.map((x) => getMember(x));
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
			return '卒業ソロ';
		default:
			if (id.match(/^(gen)\d+$/)) return `${id.slice(3)}期生`;
			return `?`;
	}
};

export const ordering = {
	gen: (a, b) => a - b,
	group: (a, b) => {
		let o = ['grad', 'sbt', 'und', ...[...Array(5).keys()].map((x) => `gen${x + 1}`)];
		return o.indexOf(a) - o.indexOf(b);
	},
	'dob-year': (a, b) => a - b,
	soldstatus: (a, b) => (a ? -1 : b ? 1 : 0)
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

export function expandMBData(mb, groups, compare = null) {
	let res = { member: mb.member, slotsSoldex: [], numSold: [0, 0], group: '' };
	res.slotsSoldex = mb.slotsSold.map((x) => x.split('|'));
	let f = res.slotsSoldex.flat();
	res.numSold = [
		f.filter((x) => (x.match(/^\d+$/) ? parseInt(x) > 0 : false)).length,
		f.filter((x) => x != 'x' && x != '?').length
	];
	res.group = groups == '' ? '' : determineGroup(mb, groups);
	if (compare) {
		let [n, total] = getNumSold(res.member, compare.cdData, compare.atdraw);
		let d = n !== 'N/A' ? `${res.numSold[0] - n > 0 ? '+' : ''}${res.numSold[0] - n}` : '';
		let lastTimeSoldout = total == n,
			currentSoldout = res.numSold[0] == res.numSold[1];
		// if soldout atdraw, then
		// show difference when currently not soldout
		// if current also sold out, show no difference
		res['compare'] = {
			lasttime: n,
			current: res.numSold[0],
			diff: lastTimeSoldout ? (currentSoldout ? `完売` : d) : d
			//diff: n !== 'N/A' ? res.numSold[0] - n : ''
		};
	}
	return res;
}

export function expandDataList(cdData, compare = null) {
	let groups = concat(
		[
			{ id: 'sbt', has: cdData.sbt },
			{ id: 'und', has: getUnderList(cdData) }
		],
		cdData.addgroups ? cdData.addgroups : []
	);
	return cdData.table.map((x) => expandMBData(x, groups, compare));
}

export function getNumSold(mb, cdData, atdraw) {
	let data = find(cdData.table, ['member', mb]);
	if (!data) return ['N/A', 'N/A'];
	let expanded = data.slotsSold.map((x) => x.split('|')).flat();
	return [
		expanded.filter((x) => (x.match(/^\d+$/) ? parseInt(x) <= atdraw : false)).length,
		expanded.filter((x) => x != 'x' && x != '?').length
	];
}

/**
 * @param  {Array.<Object>} mbDataList
 * @param  {string} opt='gen'
 * mbDataList is an array of JSON, each must consist of a "member" key
 * opt can be: gen, bloodtype, status, from, dob-year, dob-month
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
			return mbdatalist.sort((a, b) => {
				let [aa, bb] = getMembers([a.member, b.member]);
				return aa.furi.localeCompare(bb.furi, 'ja');
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

	let type;
	switch (cd.type) {
		case 'Best':
			type = 'Best Album';
			break;
		default:
			type = cd.type;
			break;
	}

	let display = `${cd.num}${nth(cd.num)} ${type}`;
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

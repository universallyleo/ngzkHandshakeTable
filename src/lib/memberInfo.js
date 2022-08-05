import members from '$lib/data/members.json';
import { isExpandedDatalist, isISODate, expandMBData } from '$lib/util.js';

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
	console.log('Sorting by ', opt);
	return 'has' in datalist[0]
		? datalist.map((x) => {
				return { label: x.label, value: x.value, has: sortPlainList(x.has, opt) };
		  })
		: sortPlainList(datalist, opt);
}

function sortPlainList(mbdatalist, opt = 'kana') {
	switch (opt) {
		case 'numsold':
			// console.log('Sorting by numSold, original list:', mbdatalist);
			let t = isExpandedDatalist(mbdatalist)
				? mbdatalist
				: mbdatalist.map((x) => expandMBData(x, ''));
			return t.sort((a, b) => {
				let soldout = [a, b].map((x) => x.numSold[0] == x.numSold[1]);
				console.log(`${a.member}: soldout=${soldout[0]}`);
				if (soldout[0]) return soldout[1] ? b.numSold[0] - a.numSold[0] : -1; //TODO: sort by name
				else return soldout[1] ? 1 : b.numSold[0] - a.numSold[0];
			});
		case 'kana':
			return mbdatalist.sort((a, b) => {
				let [aa, bb] = getMembers([a.member, b.member]);
				return aa.furi.localeCompare(bb.furi, 'ja');
			});
		default:
			return mbdatalist;
	}
}

<script>
import {getMember,cdData} from '$lib/util.js';
import {range, find} from 'lodash-es';
import ProgressGraph from './ProgressGraph.svelte';

export let member;
export let includings;

/**
 * Return object {total: Array<integer>, diff: Array<integer>}
 * @param  {object} cd
 */
function progression(memberName, cd) {
	let res = { cd: cd.cd, 
        member: memberName,
        total: [], 
        diff: Array(cd.lastDraw).fill(0) };
	let flatSlots = find(cd.table, ['member', memberName])
		.slotsSold.map((row) => row.split('|'))
		.flat();
	flatSlots.map((e) => (e.match(/^\d+$/) ? res.diff[parseInt(e) - 1]++ : 0));
	let sum = 0;
	res.total = res.diff.map((x) => (sum += x));
    return res;
}

function extendProgressData(data,toLength){
    let len = data.total.length;
    for (let i=len; i<toLength; i++){
        data.total.push("-");
        data.diff.push("-");
    }
}

$: mbInfo = getMember(member);
$: numSlots = Math.max(...includings.map((x)=>x.lastDraw));
$: progressData = includings.map(x=>progression(member,x));
$: progressData.map(t=>extendProgressData(t,numSlots));
//$: transposedTotal = progressData[0].total.map((col,i) => progressData.map(row=>row.total[i]));
</script>

<div class="container">
    <table class="table-bordered">
        <caption> 各受付の完売数の差 (メンバー： {mbInfo.kanji})  </caption>
        <thead>
            <th></th>
            {#each range(numSlots) as i}
                <th class="headingRow">{i}→{i+1}</th>
            {/each}
        </thead>
    
        {#each progressData as cdprogress}
            <tr>
                <td class="headingCell cdInfo">{cdData(cdprogress.cd).display}</td>
            {#each cdprogress.diff as slot}
                <td>{slot}</td>
            {/each}
            </tr>
        {/each}
    
        <!-- {#each range(numRows) as i}
            <tr>
                <td>{i}</td>
                {#each transposedTotal[i] as draw}
                    <td>{draw}</td>
                {/each}
            </tr>
        {/each} -->
    
    </table>
</div>

<ProgressGraph {mbInfo} datum={progressData} />

<style>
.container{
/* margin: 0 auto;*/
width: max-content;
/*padding: 7px;*/
}

th,
td{
    text-align:center;
    padding: 2px 5px;
}
.table-bordered {
    table-layout: fixed;
    border: 1px solid #ddd !important;
    border-spacing: 0!important;
    border-collapse: collapse;
    display: block;
    overflow-x: auto;
    margin: 0 auto;
    font-family:Arial, Helvetica, sans-serif;
}

.headingRow{
    border-bottom: 1px solid #ddd;
}
.headingCell{
    padding-left: .4em;
    padding-right: .2em;
    border-right: 1px solid black;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
}

/* .memberName{
    width: 240px;
    max-width: 300px;
} */

.cdInfo{
    width: 100px;
    max-width: 140px;
}
</style>
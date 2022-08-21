<script>
import {getMember,cdData} from '$lib/util.js';
import {range, find} from 'lodash-es';
import ProgressGraph from './ProgressGraph.svelte';

export let members;
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
	let mbTable = find(cd.table, ['member', memberName]);
    if (mbTable){
        let flatSlots = mbTable.slotsSold.map((row) => row.split('|')).flat();
        flatSlots.map((e) => (e.match(/^\d+$/) ? res.diff[parseInt(e) - 1]++ : 0));
        let sum = 0;
        res.total = res.diff.map((x) => (sum += x));
    }
    return res;
}

function extendProgressData(data,toLength){
    let len = data.total.length;
    for (let i=len; i<toLength; i++){
        data.total.push("-");
        data.diff.push("-");
    }
}

$: mode = includings.length>1?"fixMember":"fixCD";
$: numSlots = mode=="fixMember"?Math.max(...includings.map((x)=>x.lastDraw)):includings[0].lastDraw;
$: progressData = mode=="fixCD"?members.map(x=>progression(x,includings[0])):includings.map(x=>progression(members[0],x));
$: progressData.map(t=>extendProgressData(t,numSlots));
//$: transposedTotal = progressData[0].total.map((col,i) => progressData.map(row=>row.total[i]));
</script>

<div class="container">
    <table class="table-bordered">
        <caption> 累計完売数の推移 <span class="weaker">(N次受付の完売数)</span></caption>
        <thead>
            <th></th>
            {#each range(numSlots) as i}
                <th class="headingRow">{i+1}</th>
            {/each}
        </thead>
    
        <tbody>
        {#each progressData as series}
            <tr>
                <td class="headingCell cdInfo">
                {#if mode=='fixMember'}
                    {cdData(series.cd).display}
                {:else}
                    {getMember(series.member).kanji}
                {/if}
                </td>
            {#each range(numSlots) as i}
                <td>{series.total[i]} 
                    {#if series.total[i]!="-"} <span class="weaker">(+{series.diff[i]})</span>{/if}
                </td>
            {/each}
            </tr>
        {/each}
        </tbody>    
    </table>
    <div class="graphContainer">
        [ChartJS fails in Production.  Finding resolution...]
        <ProgressGraph {mode} datum={progressData} />
    </div>
</div>


<style>
.container{
    /* margin: 0 auto;*/
    width: max-content;
    /*padding: 7px;*/
}

.graphContainer{
    width: max-content;
    margin: 0 auto;
}

th,
td{
    text-align:center;
    padding: 4px 5px;
}

.weaker{
    font-size: small;
    color: hsl(0, 0%, 60%);
}

tbody tr:nth-child(odd) { background-color: #efefef; }

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
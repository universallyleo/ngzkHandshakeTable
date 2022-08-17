<script>
import {getMember,cdData,progression} from '$lib/util.js';
import {range} from 'lodash-es';
export let member;
export let includings;

function extendProgressData(data,toLength){
    let len = data.total.length;
    for (let i=len; i<toLength; i++){
        data.total.push("-");
        data.diff.push("-");
    }
}

$: mbInfo = getMember(member);
$: numRows = Math.max(...includings.map((x)=>x.lastDraw));
$: progressData = includings.map(x=>progression(member,x));
$: progressData.map(t=>extendProgressData(t,numRows));
$: transposedTotal = progressData[0].total.map((col,i) => progressData.map(row=>row.total[i]));
</script>

<table class="table-bordered">
    <caption> {mbInfo.kanji} </caption>
    <thead>
        <th></th>
        {#each includings as cd}
            <th class="headingCell cdInfo">{cdData(cd.cd).display}</th>
        {/each}
    </thead>
    
    {#each range(numRows) as i}
        <tr>
            <td>{i}</td>
            {#each transposedTotal[i] as draw}
                <td>{draw}</td>
            {/each}
        </tr>
    {/each}
    
</table>

<style>
td{
    text-align:center;
}
.table-bordered {
    table-layout: fixed;
    border: 1px solid #ddd !important;
    border-spacing: 0!important;
    border-collapse: collapse;
    display: block;
    overflow-x: auto;
}

.headingCell{
    padding-left: .4em;
    padding-right: .2em;
    border-right: 1px solid black;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
}

.memberName{
    width: 240px;
    max-width: 300px;
}

.cdInfo{
    width: 100px;
    max-width: 140px;
}
</style>
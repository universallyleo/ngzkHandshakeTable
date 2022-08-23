<script>
import {getMember,cdData,nthColor,getNumSold} from '$lib/util.js';
import {range, find} from 'lodash-es';
import ProgressGraph from './ProgressGraph.svelte';

export let mode;
export let members;
export let includings;
export let extra={};

/**
 * Return object {main: Array<integer>, sub: Array<integer>}
 * @param  {object} cd
 */
function cdprogression(memberName, cd) {
	let res = { cd: cd.cd, 
        member: memberName,
        main: [], // accummulated num of sold
        sub: Array(cd.lastDraw).fill(0) };  //num of sold at particular draw
	let mbTable = find(cd.table, ['member', memberName]);
    if (mbTable){
        let flatSlots = mbTable.slotsSold.map((row) => row.split('|')).flat();
        flatSlots.map((e) => (e.match(/^\d+$/) ? res.sub[parseInt(e) - 1]++ : 0));
        let sum = 0;
        res.main = res.sub.map((x) => (sum += x));
    }
    return res;
}

function extendCDProgressData(data,toLength){
    let len = data.main.length;
    for (let i=len; i<toLength; i++){
        data.main.push("-");
        data.sub.push("-");
    }
}

function soldProgressionPerCD(memberName, atdraw=-1){
    let soldatcd=[], accum=[];
    let lastNumericIdx = -1;
    for (let i=0; i<includings.length; i++){
        let frac;
        if (atdraw <= includings[i].lastDraw){
            frac = getNumSold(includings[i].table.find((x)=>x.member==memberName), atdraw);
            if (frac[1]=="N/A"){
                soldatcd.push(["-","-"]);
                accum.push("-");
            }else{
                soldatcd.push(frac);
                accum.push((lastNumericIdx > -1)?accum[lastNumericIdx]+frac[0]:frac[0])
                lastNumericIdx = i;
            }
        }else{
            soldatcd.push(["-","-"])
            accum.push("-");
        }
    } 
    return {member: memberName, main: accum, sub: soldatcd};
}

function subdataDisplayInTable(x){
    if (mode.slice(0,3)=="fix") return `(+${x})`;
    if (mode == "overallProgression") return `(+${x[0]}/${x[1]})`;
    if (mode == "receptionProgression") return `/${x}`;
}

let numSlots=0;
let progressData={};
let title="";
let maxlength=0;
let datum=[];
let caption,subcaption;
let seriesLabels=[];
let xAxisLabels=[];
let headings=[];

//see: https://www.chartjs.org/docs/latest/samples/line/segments.html
const skipped = (ctx, value) => ctx.p0.skip || ctx.p1.skip ? value : undefined;

$: {
    //prepare data series
    seriesLabels=[], datum=[], xAxisLabels=[];
    if (mode.slice(0,3)=="fix"){
        if (mode=="fixCD"){
            members.map(x=> {
                datum.push(cdprogression(x,includings[0]));
                seriesLabels.push(getMember(x).kanji);
            });
            title = `対象円盤： ${cdData(datum[0].cd).display}`;
            numSlots = includings[0].lastDraw;
        }
        if (mode=="fixMember"){
            includings.map(x=> {
                datum.push(cdprogression(members[0],x));
                seriesLabels.push(cdData(x.cd).display);
            });
            title = `対象メンバー： ${getMember(datum[0].member).kanji}`;
            numSlots = Math.max(...includings.map((x)=>x.lastDraw));
        }
        datum.map(t=>extendCDProgressData(t,numSlots));
        caption = "累計完売数の推移";
        subcaption = "(N次受付の完売数)";
        let lengths = datum.map(entry => entry.main.length);
        maxlength = Math.max(...lengths);
        xAxisLabels = range(1,maxlength+1);
        headings = xAxisLabels;
    }
    if (mode=="overallProgression"){
        numSlots = includings.length;
        datum = members.map(x=>soldProgressionPerCD(x));
        seriesLabels = members.map(x=>getMember(x).kanji);
        title = "総完売数推移";
        caption = "累計総完売数";
        subcaption = "(円盤の総完売部数 / 最大可能完売数)";
        xAxisLabels = includings.map(x=>cdData(x.cd).display);
        headings = xAxisLabels.map(x=>x.replace(/\s/,'<br>')); // dunno y I can't just {@html lb.replace(...)}
    }
    if (mode=="receptionProgression"){
        numSlots = includings.length;
        if (!("atdraw" in extra)) console.log("Something wrong.  Need to specify 'atdraw' for this option.");
        let temp = members.map(x=>soldProgressionPerCD(x,extra.atdraw));
        console.log(temp);
        //we do not want accumulated data, so swap out sub data (= individual CD sold data)
        datum = temp.map(x=>{ return {member: x.member, main: x.sub.map(y=>y[0]), sub: x.sub.map(y=>y[1])};});
        console.log(datum);
        seriesLabels = members.map(x=>getMember(x).kanji);
        title = `${extra.atdraw}次受付までの完売数推移`;
        caption = `${extra.atdraw}次受付までの完売数`;
        subcaption = " / 円盤の最大可能完売数";
        xAxisLabels = includings.map(x=>cdData(x.cd).display);
        headings = xAxisLabels.map(x=>x.replace(/\s/,'<br>'));
    }
    datum = datum;

    //organise data series into datasets for chart.js
    let graph = { labels: xAxisLabels, datasets:[] };
    for (let i=0; i<datum.length; i++){
        let res = {
            label: seriesLabels[i],
            data: datum[i].main,
            borderColor: `${nthColor(i)}`,
            backgroundColor: `${nthColor(i)}`,
            pointHitRadius: 20, // larger area for intersect detection
            segment: {
                borderColor: ctx => skipped(ctx, 'rgb(0,0,0,0.5)'),
                borderDash: ctx => skipped(ctx, [6, 6]),
            },
            spanGaps: true,
            datalabels: {color: 'white', backgroundColor: `${nthColor(i)}`}
        }
        graph["datasets"].push(res);
    }
    progressData =  graph;
}
</script>

<div class="container">
    <table class="table-bordered">
        <caption> {caption} <span class="weaker">{subcaption}</span></caption>
        <thead>
            <th></th>
            {#each headings as lb}
                <th class="headingRow">{@html lb}</th>
            {/each}
        </thead>
    
        <tbody>
        {#each datum as series,j}
            <tr>
                <td class="headingCell cdInfo">
                    {seriesLabels[j]}
                </td>
            {#each range(numSlots) as i}
                <td>{series.main[i]} 
                    {#if !isNaN(series.main[i])} <span class="weaker">{subdataDisplayInTable(series.sub[i])}</span>{/if}
                </td>
            {/each}
            </tr>
        {/each}
        </tbody>    
    </table>
    <div class="graphContainer">
        <ProgressGraph {title} {progressData} {maxlength}/>
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

.cdInfo{
    width: 100px;
    max-width: 140px;
}
</style>
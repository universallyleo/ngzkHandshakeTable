<script>
import Chart from 'svelte-frappe-charts';
import {range} from 'lodash-es';
import {getMember, cdData} from '$lib/util.js';

export let datum; 
export let mode;

let graphdata = { labels: [], datasets:[] };
let lengths=[];
let maxlength=0;
let thechart;

let lineOptions = {dotSize:6};
let valuesOverPoints = 1; //display values over point
let isNavigable = true; // can transverse data using keyboard
let graphtitle=""
let graphWidth=800;

function organiseDatum(){
    graphtitle = mode=="fixMember"
        ?`対象メンバー： ${getMember(datum[0].member).kanji}`
        :`対象円盤： ${cdData(datum[0].cd).display}`;

    
    lengths = datum.map(entry => entry.total.length);
    maxlength = Math.max(...lengths);
    graphWidth=Math.max(maxlength * 50,800);
    graphdata = { labels: [], datasets:[] };
    graphdata["labels"] = range(1,maxlength+1);
    for (let [i,entry] of datum.entries()){
        let res = {
            name: `${mode=="fixMember"?cdData(entry.cd).display:getMember(entry.member).kanji}`,
            values: entry.total,
            // borderColor: `${nthColor(i)}`,
            // backgroundColor: `${nthColor(i)}`,
            // pointHitRadius: 20, // larger area for intersect detection
            // datalabels: {color: 'white', backgroundColor: `${nthColor(i)}`}
        }
        graphdata["datasets"].push(res);
    }

    console.log(graphWidth);
}

const exportChart = ()=>thechart.exportChart();

$:organiseDatum();
</script>

<div style="width: 700;">
<Chart data={graphdata} title={graphtitle} {valuesOverPoints} {isNavigable} {lineOptions} height="600" type="line" bind:this={thechart}/>
<button on:click={exportChart}>画像輸出</button>
</div>

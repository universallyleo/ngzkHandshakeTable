<script>
import {cdData, nthColor,getMember} from '$lib/util.js';
import {range} from 'lodash-es';
import {onMount, afterUpdate, onDestroy} from 'svelte';
import Chart from 'chart.js/auto/auto.js'; //make everything in Chart available
import ChartDataLabels from 'chartjs-plugin-datalabels';

//to be made export
export let datum; 
export let mode;

let graph = { labels: [], datasets:[] };
let lengths=[];
let maxlength=0;

function organiseDatum(){
    graph = { labels: [], datasets:[] };
    lengths = datum.map(entry => entry.total.length);
    maxlength = Math.max(...lengths);

    graph["labels"] = range(1,maxlength+1);
    config.options.plugins.title.text = mode=="fixMember"
        ?`対象メンバー： ${getMember(datum[0].member).kanji}`
        :`対象円盤： ${cdData(datum[0].cd).display}`;

    for (let [i,entry] of datum.entries()){
        let res = {
            label: `${mode=="fixMember"?cdData(entry.cd).display:getMember(entry.member).kanji}`,
            data: entry.total,
            borderColor: `${nthColor(i)}`,
            backgroundColor: `${nthColor(i)}`,
            pointHitRadius: 20, // larger area for intersect detection
            datalabels: {color: 'white', backgroundColor: `${nthColor(i)}`}
        }
        graph["datasets"].push(res);
    }
    config.data = graph;
}

//$: organiseDatum();


/****** Graph related setup ******/
let canvasContainer;

const tooltipLine = {
    id: 'tooltipLine',
    beforeDraw: chart => {
        if (chart.tooltip._active && chart.tooltip._active.length){
            const ctx = chart.ctx;
            ctx.save();
            const activePoint = chart.tooltip._active[0];
            ctx.beginPath();
            ctx.setLineDash([5,7]);
            ctx.moveTo(activePoint.element.x, chart.chartArea.top);
            ctx.lineTo(activePoint.element.x, chart.chartArea.bottom);
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'black';
            ctx.stroke();
            ctx.restore();
        }
    }
}

const config = {
    type: 'line',
    data: [],
    options:{
        layout:{
            padding: 10
        },
        responsive: true,
        hover: {
            mode: 'dataset',
            intersect: true
        },
        interaction: {
            mode: 'index'
        },
        plugins:{
            legend:{
                position: 'top',
            },
            title:{
                display:true,
                font:{
                    size: 20
                },
                text: ""
            },
            datalabels:{
                borderRadius: 6,
                align: 'center',
                anchor: 'center'
            }
        }
    },
    plugins: [tooltipLine] //see https://youtu.be/rLUwF1UQcbI
}

let thechart;
$: canvasWidth=Math.max(maxlength * 50,800);
onMount(()=>{
    organiseDatum();
    Chart.register(ChartDataLabels);  //make ChartDataLabel available
    const ctx = thechart.getContext('2d'); 
    thechart = new Chart(ctx, config); //initialise
});

afterUpdate(()=>{
    if (!thechart) return;
    organiseDatum();
    thechart.update(); 
});

onDestroy(()=>{
    if (thechart) thechart.destroy();
    thechart = null;
});
</script>

<div bind:this={canvasContainer} style="width:{canvasWidth}px">
    <canvas bind:this={thechart}></canvas>
</div>
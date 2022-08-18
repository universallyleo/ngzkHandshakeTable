<script>
import {cdData, nthColor} from '$lib/util.js';
import {range} from 'lodash-es';
import {onMount} from 'svelte';
import Chart from 'chart.js/auto/auto.js'; //make everything in Chart available
import ChartDataLabels from 'chartjs-plugin-datalabels';

//to be made export
export let datum; 
export let mbInfo;

let graph = { labels: [], datasets:[] };

let lengths = datum.map(entry => entry.total.length);

function organiseDatum(){
    graph["labels"] = range(1,Math.max(...lengths)+1);
    for (let [i,entry] of datum.entries()){
        let res = {
            label: `${cdData(entry.cd).display}`,
            data: entry.total,
            borderColor: `${nthColor(i)}`,
            datalabels: {color: 'white', backgroundColor: `${nthColor(i)}`}
        }
        graph["datasets"].push(res);
    }
}

const config = {
    type: 'line',
    data: graph,
    options:{
        responsive: true,
        plugins:{
            legend:{
                position: 'top',
            },
            title:{
                display:true,
                font:{
                    size: 20
                },
                text: `完売数の受付別推移 (メンバー：${mbInfo.kanji})`
            },
            datalabels:{
                align: 'center',
                anchor: 'center'
            }
        }
    }
}

let canvasElt;
onMount(()=>{
    Chart.register(ChartDataLabels);  //make ChartDataLabel available
    const ctx = canvasElt.getContext('2d'); 
    let myChart = new Chart(ctx, config); //initialise
})

$: organiseDatum();
</script>

<canvas bind:this={canvasElt}></canvas>
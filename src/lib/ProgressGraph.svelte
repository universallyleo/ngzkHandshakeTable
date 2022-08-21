<script>
import {cdData, nthColor,getMember} from '$lib/util.js';
import {range} from 'lodash-es';
import {Line} from 'svelte-chartjs';
import {Chart, Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale} from 'chart.js';

Chart.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale);

//to be made export
export let datum; 
export let mode;

let graph = { labels: [], datasets:[] };
let lengths=[];
let maxlength=0;
let options = {
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
    };

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
            // datalabels: {color: 'white', backgroundColor: `${nthColor(i)}`}
        }
        graph["datasets"].push(res);
    }
    //config.data = graph;
}

$: canvasWidth=Math.max(maxlength * 50,800);
</script>

<Line data={graph} width={canvasWidth} {options}/>
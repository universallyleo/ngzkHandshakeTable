<script>
    import { onMount, afterUpdate, onDestroy } from "svelte";
    import Chart from "chart.js/auto"; //make everything in Chart available
    import ChartDataLabels from "chartjs-plugin-datalabels";

    //to be made export
    export let progressData;
    export let title;
    export let maxlength = 10;

    $: progressData.spanGaps = true;
    $: config.data = progressData;

    /****** Graph related setup ******/
    let canvasContainer;

    const tooltipLine = {
        id: "tooltipLine",
        beforeDraw: (chart) => {
            if (chart.tooltip._active && chart.tooltip._active.length) {
                const ctx = chart.ctx;
                ctx.save();
                const activePoint = chart.tooltip._active[0];
                ctx.beginPath();
                ctx.setLineDash([5, 7]);
                ctx.moveTo(activePoint.element.x, chart.chartArea.top);
                ctx.lineTo(activePoint.element.x, chart.chartArea.bottom);
                ctx.lineWidth = 2;
                ctx.strokeStyle = "black";
                ctx.stroke();
                ctx.restore();
            }
        },
    };

    const config = {
        type: "line",
        data: [],
        options: {
            layout: {
                padding: {
                    left: 20,
                    right: 50,
                    top: 10,
                    bottom: 30,
                },
            },
            responsive: true,
            hover: {
                mode: "dataset",
                intersect: true,
            },
            interaction: {
                mode: "index",
            },
            scales: {
                y: {
                    // max: 30,
                    // suggestedMax: 30
                },
            },
            plugins: {
                legend: {
                    position: "top",
                    labels: { padding: 15 },
                    title: { padding: 15 },
                },
                title: {
                    display: true,
                    font: {
                        size: 20,
                    },
                    text: "",
                    padding: 5,
                },
                datalabels: {
                    borderRadius: 6,
                    align: "center",
                    textAlign: "center",
                    anchor: "center",
                    padding: {
                        top: 2,
                        bottom: 1,
                    },
                },
            },
        },
        plugins: [tooltipLine], //see https://youtu.be/rLUwF1UQcbI
    };

    let thechart;
    $: maxlength = progressData ? progressData.datasets[0].data.length : 0;
    $: canvasWidth = Math.max(maxlength * 80, 1000);
    $: canvasHeight = Math.min(600 + progressData.datasets.length * 20, 900);
    // $: console.log(canvasHeight);
    $: config.options.plugins.title.text = title;
    // $: maxValue = Math.max( ...(progressData.datasets.map( x=>
    //         Math.max( ...(x.data.map(y=> Number.isInteger(y)?y:0 )) )
    //     ).flat()) );
    // $: config.options.scales.y.max =  Math.ceil((maxValue+1)/roundupFactor)*roundupFactor;  //round up (maxValue+1) to the nearest 5s
    onMount(() => {
        Chart.register(ChartDataLabels); //make ChartDataLabel available
        const ctx = thechart.getContext("2d");
        thechart = new Chart(ctx, config); //initialise
    });

    afterUpdate(() => {
        if (!thechart) return;
        thechart.update();
    });

    onDestroy(() => {
        if (thechart) thechart.destroy();
        thechart = null;
    });
</script>

<div
    bind:this={canvasContainer}
    style="width:{canvasWidth}px;height:{canvasHeight}px;"
>
    <canvas bind:this={thechart} />
</div>

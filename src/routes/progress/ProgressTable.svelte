<script>
    import { simpleSeries } from "$lib/processData.js";
    // import { nthColor } from "$lib/util.js";
    import { range } from "lodash-es";
    import { toJpeg } from "html-to-image";
    import {
        subdataDisplayInTable,
        prepareFixCD,
        prepareFixMB,
        prepareFixAllMB,
        preapreOverallProgress,
        prepareReceptionProg,
    } from "./seriesSpec.js";
    import ProgressGraph from "$lib/ProgressGraph.svelte";
    import AccordionItem from "../../lib/AccordionItem.svelte";

    export let mode;
    export let members;
    export let includings;
    export let extra = {};

    let seriesCollection = {};
    let progressData = {};
    let headings = [];
    let tblDom;

    function imgOut(elt) {
        toJpeg(elt, {
            backgroundColor: "#ffffff",
        }).then(function (dataurl) {
            let link = document.createElement("a");
            link.download = `${seriesCollection.caption}.jpg`;
            link.href = dataurl;
            link.target = "_blank";
            link.click();
        });
    }

    $: {
        //#region prepare data series

        switch (mode) {
            case "fixAllMB":
                seriesCollection = prepareFixAllMB(includings);
                headings = seriesCollection.xAxisLabels;
                break;
            case "fixCD":
                seriesCollection = prepareFixCD(members, includings[0]);
                headings = seriesCollection.xAxisLabels;
                break;
            case "fixMember":
                seriesCollection = prepareFixMB(members[0], includings);
                headings = seriesCollection.xAxisLabels;
                break;
            case "overallProgression":
                seriesCollection = preapreOverallProgress(members, includings);
                headings = seriesCollection.xAxisLabels.map((x) =>
                    x.replace(/\s/, "<br>")
                ); // dunno y I can't just {@html lb.replace(...)}
                break;
            case "receptionProgression":
                if (!("atdraw" in extra))
                    console.log("Need to specify 'atdraw' for this option.");
                seriesCollection = prepareReceptionProg(
                    members,
                    includings,
                    extra.atdraw
                );
                headings = seriesCollection.xAxisLabels.map((x) =>
                    x.replace(/\s/, "<br>")
                );
                break;
        }
        seriesCollection = seriesCollection;

        //organise data series into datasets for chart.js
        let graph = { labels: seriesCollection.xAxisLabels, datasets: [] };
        for (let i = 0; i < seriesCollection.datum.length; i++) {
            graph["datasets"].push(
                simpleSeries(
                    seriesCollection.seriesLabels[i],
                    seriesCollection.datum[i].main,
                    i,
                    seriesCollection.plotExtraOpts
                )
            );

            // let res = {
            //     label: seriesLabels[i],
            //     data: datum[i].main,
            //     borderColor: `${nthColor(i)}`,
            //     backgroundColor: `${nthColor(i)}`,
            //     pointHitRadius: 20, // larger area for intersect detection
            //     segment: {
            //         borderColor: (ctx) => skipped(ctx, "rgb(0,0,0,0.5)"),
            //         borderDash: (ctx) => skipped(ctx, [6, 6]),
            //     },
            //     spanGaps: true,
            //     datalabels: {
            //         color: "white",
            //         backgroundColor: `${nthColor(i)}`,
            //     },
            // };
            // graph["datasets"].push(res);
        }
        progressData = graph;
    }
</script>

<!-- #region HTML
-->
<AccordionItem isOpen={false} title="詳細データ">
    <div style="width: fit-content; margin:.2em auto;">
        <button on:click={() => imgOut(tblDom)}>
            詳細データ画像ダウンロード
        </button>
    </div>
    <div style="width: fit-content; margin: 0 auto;">
        <table class="table-bordered" bind:this={tblDom}>
            <caption>
                {seriesCollection.caption}
                <span class="weaker">{seriesCollection.subcaption}</span>
            </caption>
            <thead>
                <th />
                {#each headings as lb}
                    <th class="headingRow">{@html lb}</th>
                {/each}
            </thead>

            <tbody>
                {#each seriesCollection.datum as series, j}
                    <tr>
                        <td class="headingCell cdInfo">
                            {seriesCollection.seriesLabels[j]}
                        </td>
                        {#each range(seriesCollection.numSlots) as i}
                            <td>
                                {series.displayChange
                                    ? series.displayTableMain[i]
                                    : series.main[i]}
                                <!-- {#if !isNaN(series.main[i])} -->
                                <span class="weaker">
                                    {@html subdataDisplayInTable(
                                        series.sub[i],
                                        mode
                                    )}
                                </span>
                                <!-- {/if} -->
                            </td>
                        {/each}
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</AccordionItem>
<div>
    <div class="graphContainer">
        <ProgressGraph
            title={seriesCollection.title}
            {progressData}
            maxlength={seriesCollection.numSlots}
        />
    </div>
</div>

<!-- #region style 
-->

<style>
    .graphContainer {
        width: max-content;
        margin: 0 auto;
    }

    table caption {
        padding-bottom: 0.4em;
        font-weight: bold;
        font-size: large;
    }
    th,
    td {
        text-align: center;
        padding: 4px 5px;
    }

    .weaker {
        font-size: small;
        font-weight: normal;
        color: hsl(0, 0%, 60%);
    }

    tbody tr td {
        white-space: nowrap;
    }

    tbody tr:nth-child(odd) {
        background-color: #efefef;
    }

    .table-bordered {
        width: fit-content;
        /* max-width: 100%; */
        border: 1px solid #ddd !important;
        border-spacing: 0 !important;
        border-collapse: collapse;
        display: block;
        overflow-x: auto;
        /* margin: 0 auto; */
        padding: 0.4em;
        font-family: Arial, Helvetica, sans-serif;
    }

    .headingRow {
        border-bottom: 1px solid #ddd;
    }
    .headingCell {
        padding-left: 0.4em;
        padding-right: 0.2em;
        border-right: 1px solid black;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
    }

    .cdInfo {
        width: 100px;
        max-width: 140px;
    }
</style>

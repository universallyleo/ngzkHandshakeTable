<script>
    import RowGroups from "./RowGroups.svelte";
    import DataRow from "./DataRow.svelte";
    import {
        cdAlias,
        getNumSlotsPerDate,
        expandDataList,
        partitionToGroup,
        sortList,
        finalSoldoutDraw,
    } from "$lib/processData.js";
    import { firstFutureDate } from "$lib/util.js";
    // import { add, zipWith } from "lodash-es";
    export let data;
    //export let group="gen"; allow: gen, dobyear, dobmonth, bloodtype, from
    export let filterOpt;
    export let groupOpt;
    export let sortOpt;
    export let capture;
    export let hideTable = false;
    export let upToDraw = data.lastDraw;
    export let domElt;
    export let displayMethod = (t) => t;
    export let tableTitle = (t) => `${t}次受付結果`;

    let compare = null;
    let blur = -1; //index of first date to unblur = number of blurred dates
    // let isInfo = [];
    let colSpans = getNumSlotsPerDate(data);

    /**
     * @param  {Array<Object>} list
     * @param  {string} option
     * list: same format as finalTb
     * filterOpt: showall, unsoldonly, selectmb (to add more later)
     */
    function filterList(list, option = filterOpt) {
        switch (option) {
            case "showall":
                return list;
            case "hasunsold":
                return list.filter((x) => x.numSold[0] < x.numSold[1]);
            case "hasunsold+latest":
                return list.filter(
                    (x) =>
                        x.numSold[0] < x.numSold[1] ||
                        finalSoldoutDraw(x) == lastDraw
                );
            case "hassoldout":
                return list.filter((x) => x.numSold[0] > 0);
            case "hassoldoutnonfull":
                return list.filter(
                    (x) => x.numSold[0] > 0 && x.numSold[0] < x.numSold[1]
                );
            case "selectmb":
                //TODO
                return list;
        }
    }

    function toggleDateText(index) {
        if (index <= blur) {
            isInfo[index] = !isInfo[index];
        }
    }

    export function updateCompare(comparedata) {
        compare = comparedata;
        hideTable = comparedata ? hideTable : false; //force table to be shown when not comparing
        // console.log("SlotTable.updateCompare ended.  hideTable = ", hideTable);
    }

    //#region reactive update
    $: title = cdAlias(data.cd).display;
    $: lastDraw = data.lastDraw;
    $: expandedData = expandDataList(data);
    $: pair = expandedData.hasPair;
    $: soldPercentage =
        (expandedData.accumSold[upToDraw - 1] / expandedData.totalSlots) * 100;
    $: isInfo = new Array(data.meetDates.length).fill(false);
    $: blur =
        upToDraw == data.lastDraw ? firstFutureDate(data.meetDates, -7) : -1;
    $: finalTb = sortList(
        partitionToGroup(filterList(expandedData.list, filterOpt), groupOpt),
        sortOpt
    );
    $: capture = capture;
    //#region comparison data
    $: title2 = compare ? cdAlias(compare.cdData.cd).display : "";
    $: cmpExpanded = compare ? expandDataList(compare.cdData) : null;
    $: [cmpSold, cmpTtl] = compare
        ? [cmpExpanded.accumSold[compare.atdraw - 1], cmpExpanded.totalSlots]
        : [0, 0];
    // $: w= 240+ numSlots*25 + (groupOpt!="none"?25:0);
    // $: info = `Filter option is ${filterOpt}.  Width should be ${w}\n${compare?compare.atdraw:""}`;
</script>

<!-- not clear why width is not working.... -->
<!-- <table class="table-bordered" style:width={w}> -->
<div class="container" bind:this={domElt}>
    <table class="table-bordered">
        <caption class="text-center"
            >{title} ( {tableTitle(upToDraw)} )
            {#if compare}
                {#if hideTable}
                    <br />
                {/if}
                &nbsp;&nbsp;[ vs {title2}
                {compare.atdraw}次受付結果 ]
            {/if}
        </caption>
        <thead>
            <tr>
                <!-- {#if groupOpt!="none"}
                <th>{groupOpt=="gen"?`期生`:""}</th>
                {/if} -->
                <th class:thickbottom={!("locations" in data)}></th>
                <th class:thickbottom={!("locations" in data)}>
                    {#if compare}
                        <div>過去との差</div>
                    {:else}
                        <div class="soldFraction">
                            <!-- {totalSold[0]}/{totalSold[1]} -->
                            <!-- {accumSold[upToDraw - 1]}/{totalSlots} -->
                            {expandedData.accumSold[
                                upToDraw - 1
                            ]}/{expandedData.totalSlots}
                        </div>
                    {/if}
                </th>
                {#if !hideTable}
                    {#each data.meetDates as date, i}
                        {#if expandedData["hasPair"][i]}
                            <th
                                class:blur={i < blur}
                                class:thickbottom={!("locations" in data)}
                            >
                            </th>
                        {/if}
                        <th
                            colspan={colSpans[i]}
                            class:blur={i < blur}
                            class:thickbottom={!("locations" in data)}
                            on:click={() => toggleDateText(i)}
                        >
                            {i < blur && isInfo[i] ? "受付終了" : date}
                        </th>
                        <!--TODO: calculate weekday-->
                    {/each}
                {/if}
                {#if compare}
                    <th>
                        <span class="cmpCellHead">
                            <div>
                                <span style="font-size:small">
                                    {cmpSold}/{cmpTtl}
                                </span>
                                <br />
                                ( {((cmpSold / cmpTtl) * 100).toFixed(
                                    2
                                )}&percnt; )
                            </div>
                            <div>→</div>
                            <div>
                                <span id="font-size:small">
                                    {expandedData.accumSold[
                                        upToDraw - 1
                                    ]}/{expandedData.totalSlots}
                                </span>
                                <br />
                                ( {soldPercentage.toFixed(2)}&percnt; )
                            </div>

                            <!-- {expandedData.accumSold[upToDraw - 1]}/{expandedData.totalSlots} -->
                        </span>
                    </th>
                {/if}
            </tr>
        </thead>
        <tbody>
            {#if "locations" in data}
                <tr>
                    <td class="subhead"></td>
                    <td class="subhead-title"> 会場&nbsp; </td>
                    {#each data.locations as loc, i}
                        {#if expandedData["hasPair"][i]}
                            <th
                                class="subhead"
                                class:blur={i < blur}
                                class:thickbottom={!("locations" in data)}
                            >
                                ぺアメンバー
                            </th>
                        {/if}
                        <td colspan={colSpans[i]} class="subhead">
                            {loc}
                        </td>
                    {/each}
                </tr>
            {/if}
            {#if groupOpt == "none"}
                <!-- TODO: Something is strange, fix it -->
                {#each expandedData.table as row}
                    <tr><DataRow {row} {lastDraw} {compare} {capture} /></tr>
                {/each}
            {:else}
                {#each finalTb as rowGp}
                    <RowGroups
                        group={rowGp}
                        {lastDraw}
                        {upToDraw}
                        {compare}
                        {capture}
                        {hideTable}
                        {blur}
                        {pair}
                        {displayMethod}
                    />
                {/each}
            {/if}
        </tbody>
    </table>
</div>

<!-- <br><br>
<div class="debugBox">{info}</div> -->
<style>
    /* .debugBox{
  font-size: 2ch;
  width: 800px;
  height: 200px;
  border: 2px solid black;
  margin-top: 1ch; 
}*/
    .table-bordered {
        table-layout: fixed;
        border: 1px solid #ddd !important;
        border-spacing: 0 !important;
        border-collapse: collapse;
        display: block;
        overflow-x: auto;
        overflow-y: hidden;
    }

    .container {
        /* margin: 0 auto;*/
        width: max-content;
        /*padding: 7px;*/
    }

    table caption {
        font-size: large;
        font-weight: bold;
        padding: 0.5em 0;
    }

    th {
        font-size: large;
        font-weight: bold;
        border: 1px solid black;
        padding: 0 0.2em;
    }

    .thickbottom {
        border-bottom: 2px solid black;
    }

    .subhead {
        font-size: small;
        border: 1px solid black;
        border-bottom: 2px solid black;
        text-align: center;
        padding: 0;
    }

    .subhead-title {
        font-size: small;
        border: 1px solid black;
        border-bottom: 2px solid black;
        text-align: right;
        font-weight: bold;
        padding: 0;
    }

    /* @media screen and (max-width: 767px) {
        table caption {
            display: none;
        }
    } */

    .cmpCellHead {
        font-size: small;
        font-weight: normal;
        padding: 0;
        display: grid;
        gap: 0;
        grid-template-columns: 85px 12px 85px;
        grid-template-rows: 100%;
        justify-items: center;
        align-items: stretch;
        align-content: stretch;
    }
    /* 
    .compareCell {
        border: 1px solid #ddd;
        text-align: center;
    } */

    .soldFraction {
        display: inline;
        float: right;
        margin-right: 3px;
        font-size: small;
        font-weight: normal;
        color: #777;
    }

    .blur {
        cursor: pointer;
        color: rgba(0, 0, 0, 0.5);
    }
</style>

<script>
    import RowGroups from "./RowGroups.svelte";
    import DataRow from "./DataRow.svelte";
    import {
        cdAlias,
        expandDataList,
        partitionToGroup,
        sortList,
        finalSoldoutDraw,
        extendArrayByLastEntry,
    } from "$lib/processData.js";
    import { firstFutureDate } from "$lib/util.js";
    import { add, zipWith } from "lodash-es";
    export let data;
    //export let group="gen"; allow: gen, dobyear, dobmonth, bloodtype, from
    export let filterOpt;
    export let groupOpt;
    export let sortOpt;
    export let capture;
    export let hideTable = false;
    export let upToDraw = data.lastDraw;

    let compare = null;
    let blur = -1; //index of first date to unblur = number of blurred dates
    // let isInfo = [];

    $: title = cdAlias(data.cd).display;
    // array of {member, slotsSoldex: Array<Array<String>>, numSold: [int, int]}
    $: lastDraw = data.lastDraw;
    $: expandedData = expandDataList(data);
    $: expandedData.forEach(
        (mb) =>
            (mb.accumulative = extendArrayByLastEntry(
                mb.accumulative,
                data.lastDraw
            ))
    );
    $: [accumSold, totalSlots] = expandedData.reduce(
        (prev, curr) => {
            // the zipWith code is to pointwise add the vector prev[0] with accumulative
            return [
                zipWith(prev[0], curr.accumulative, add),
                prev[1] + curr.numSold[1],
            ];
        },
        [Array(data.lastDraw).fill(0), 0]
    );
    $: isInfo = new Array(data.meetDates.length).fill(false);
    $: blur =
        upToDraw == data.lastDraw ? firstFutureDate(data.meetDates, -7) : -1;
    $: finalTb = sortList(
        partitionToGroup(filterList(expandedData, filterOpt), groupOpt),
        sortOpt
    );
    $: capture = capture;
    $: title2 = compare ? cdAlias(compare.cdData.cd).display : "";
    // $: w= 240+ numSlots*25 + (groupOpt!="none"?25:0);
    // $: info = `Filter option is ${filterOpt}.  Width should be ${w}\n${compare?compare.atdraw:""}`;

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
</script>

<!-- not clear why width is not working.... -->
<!-- <table class="table-bordered" style:width={w}> -->
<div class="container">
    <table class="table-bordered">
        <caption class="text-center"
            >{title} ( {upToDraw}次受付結果 )
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
                <th />
                <th
                    ><div class="soldFraction">
                        <!-- {totalSold[0]}/{totalSold[1]} -->
                        {accumSold[upToDraw - 1]}/{totalSlots}
                    </div></th
                >
                {#if !hideTable}
                    {#each data.meetDates as date, i}
                        <th
                            colspan="5"
                            class:blur={i < blur}
                            on:click={() => toggleDateText(i)}
                        >
                            {i < blur && isInfo[i] ? "受付終了" : date}
                        </th>
                        <!--calculate weekday-->
                    {/each}
                {/if}
                {#if compare}
                    <th>過去との差</th>
                {/if}
            </tr>
        </thead>
        <tbody>
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
        border-bottom: 2px solid black;
        padding: 0;
    }

    /* @media screen and (max-width: 767px) {
        table caption {
            display: none;
        }
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

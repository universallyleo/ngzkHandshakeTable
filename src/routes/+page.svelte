<script>
    import { currentCDData, fulldata, cdAlias } from "$lib/processData.js";
    import { min } from "lodash-es";
    import { toJpeg } from "html-to-image";
    import SlotTable from "$lib/SlotTable.svelte";
    import SlotTableOptions from "$lib/SlotTableOptions.svelte";
    import SelectCDReception from "$lib/SelectCDReception.svelte";
    import { fly, fade } from "svelte/transition";
    import StateButton from "../lib/StateButton.svelte";

    let filterOpt = "showall";
    let groupOpt = "gen";
    let sortOpt = "kana";

    let capture = false;
    let compareToCDData,
        hideTable = false;
    let compareAtDraw, compareIndex;
    let ST, STdom;
    let selectedIndex = 0;
    let selectedCDData = currentCDData;
    let lastDraw = selectedCDData.lastDraw;
    let upToDraw = lastDraw;
    let compareExclusion = 0;

    //#region functions
    function exportImg(dataurl) {
        let link = document.createElement("a");
        let name = `${cdAlias(selectedCDData.cd).value}-Draw${selectedCDData.lastDraw}`;
        name += hideTable
            ? `vs${cdAlias(compareToCDData.cd).value}-Draw${compareAtDraw}.jpg`
            : `.jpg`;
        link.download = name;
        link.href = dataurl;
        link.target = "_blank";
        link.click();
    }

    function imgOut(method) {
        toJpeg(STdom, {
            backgroundColor: "#ffffff",
        }).then(method);
        // method can be function for handling "saving" or just "copy to clipboard" (to be implement)
    }

    function getCompare() {
        let compare =
            compareToCDData.cd === selectedCDData.cd || compareAtDraw < 0
                ? null
                : { cdData: compareToCDData, atdraw: compareAtDraw };
        ST.updateCompare(compare);
        hideTable = !!compare;
    }

    function compareReset() {
        ST.updateCompare(null);
        hideTable = false;
        compareExclusion = selectedIndex;
        compareIndex = selectedCDData.lastDraw;
    }

    // onMount(async () => {
    //     let cdalias = new URL(window.location).searchParams.get("cd");
    //     if (cdalias != null) {
    //         // need to import fulldata from processData.js
    //         // this is the only place that need fulldata; think workaround
    //         selectedIndex = fulldata.length - 1 - findCDIndex(cdalias);
    //         //selectedCDData = fulldata[findCDIndex(cdalias)];
    //     }
    // });

    //#region active udpate
    $: oldSelectableDraw = compareToCDData
        ? min([compareToCDData.lastDraw, upToDraw])
        : 0;
    $: compareAtDraw = oldSelectableDraw ? oldSelectableDraw : 0;
</script>

<!-- #region HTML
-->
<svelte:head>
    <title>乃木坂46インタラクティブ式完売表</title>
    <meta name="description" content="乃木坂46インタラクティブ式完売表" />
</svelte:head>

<div class="optionForm">
    <SlotTableOptions
        bind:filterOpt
        bind:sortOpt
        bind:groupOpt
        bind:selectedCDData
        bind:upToDraw
        {fulldata}
        on:changeSelectedCD={compareReset}
    />
    <!-- #region Adv Opt
    -->
    <div class="advanceOption" in:fade={{ duration: 500 }}>
        <div style="display:flex; flex-grow:1">
            <div>
                過去との差 →
                <span style="margin-right:3px"
                    >対象:
                    <SelectCDReception
                        {fulldata}
                        excludeFrom={compareExclusion}
                        bind:selectedCDData={compareToCDData}
                        bind:selectedIndex={compareIndex}
                        bind:atDraw={compareAtDraw}
                    />
                </span>
            </div>
            <!-- <div
                    in:fly|global={{ x: 300, duration: 800 }}
                    style="margin-left:auto;margin-right:2px;width:max-content;"
                > -->
            <div style="margin-left:auto;margin-rigth:2px;width:max-content;">
                |&nbsp;
                <button on:click={() => getCompare()}>比べる</button>
                <button on:click={() => compareReset()}>クリア</button>
                &nbsp;|&nbsp;
                <StateButton
                    states={["完売表を示す", "完売表をかくす"]}
                    on:changeFrom={(ev) => (hideTable = ev.detail.stateIdx)}
                />
            </div>
        </div>
    </div>
</div>

<section id="slotstable" class="main" in:fly|global={{ y: 200, duration: 500 }}>
    <SlotTable
        bind:this={ST}
        bind:domElt={STdom}
        data={selectedCDData}
        {filterOpt}
        {groupOpt}
        {sortOpt}
        {capture}
        {hideTable}
        {upToDraw}
    />
</section>

<style>
    @import "../style.css";

    .optionForm {
        width: max-content;
        margin: 0 auto;
        padding: 1px 5px;
        line-height: 3.5ch;
    }

    .advanceOption {
        padding: 2px 6px;
        border: 1px solid black;
        display: flex;
    }
</style>

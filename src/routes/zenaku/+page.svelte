<script>
    import SlotTable from "$lib/SlotTable.svelte";
    import SlotTableOptions from "$lib/SlotTableOptions.svelte";
    import { fly } from "svelte/transition";
    import { zenakuData } from "$lib/data/zenaku/loadData.js";

    let currentCDData = zenakuData[zenakuData.length - 1];

    let filterOpt = "showall";
    let groupOpt = "gen";
    let sortOpt = "kana";

    let capture = false;
    let hideTable = false;
    let ST, STdom;
    let selectedCDData = currentCDData;
    let lastDraw = selectedCDData.lastDraw;
    let upToDraw = lastDraw;
    //#region functions

    //#region active udpate
</script>

<!-- #region HTML
-->
<svelte:head>
    <title>乃木坂46インタラクティブ式完売表</title>
    <meta name="description" content="乃木坂46インタラクティブ式完売表" />
</svelte:head>

<div class="infoImportant">
    35枚目シングル以前の全国握手会データの提供をお願いします。🙏
</div>
<div class="info">
    「2n次受付結果」の本当の意味は「n次受付の保障抽選結果」です。<br />
    「(2n+1)次受付結果」の本当の意味は「(n+1)次受付の初抽選結果」です。
</div>

<SlotTableOptions
    bind:filterOpt
    bind:sortOpt
    bind:groupOpt
    bind:selectedCDData
    bind:upToDraw
    fulldata={zenakuData}
/>

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

<div style="margin-top:2em;">
    <div class="info">
        現在、全国握手会のデータは手作業で入力されているため、誤りが発生する可能性があります。
        <br />
        その際には、ご指摘いただけると大変助かります。どうぞよろしくお願いいたします。
    </div>
</div>

<style>
    .infoImportant {
        text-align: center;
        border: 1px solid red;
        font-size: larger;
        color: red;
        width: 80%;
        margin: 0 auto;
        padding: 1px 5px;
        line-height: 3.5ch;
    }

    .info {
        text-align: center;
        width: 80%;
        margin: 0 auto;
        padding: 1px 5px;
        margin-top: 1em;
        line-height: 3.5ch;
    }
</style>

<script>
    import zenaku from "$lib/data/zenaku.json";
    import SlotTable from "$lib/SlotTable.svelte";
    // import SelectOneCD from "$lib/SelectOneCD.svelte";
    import SelectCDReception from "$lib/SelectCDReception.svelte";
    import { fly, fade } from "svelte/transition";

    let filterMethod = [
        { display: "参加者全員", value: "showall" },
        { display: "未完売あり", value: "hasunsold" },
        { display: "未完売あり、又は直近更新あり", value: "hasunsold+latest" },
        { display: "一部以上完売", value: "hassoldout" },
        { display: "一部以上完売、全完売なし", value: "hassoldoutnonfull" },
        // {"display": "Custom", "value": "selectmb"}
    ];
    let filterOpt = "showall";

    let groupMethod = [
        { display: "期別分け", value: "gen" },
        { display: "選抜・アンダー・他", value: "group" },
        { display: "誕生年別", value: "dobyear" },
        { display: "完売・未完売", value: "soldstatus" },
        // {"display": "なし", "value": "none"},
    ];
    let groupOpt = "gen";

    let sortMethod = [
        { display: "五十音順", value: "kana" },
        { display: "完売速度順", value: "numsold" },
    ];
    let sortOpt = "kana";
    let capture = false;
    let hideTable = false;
    let ST, STdom;
    let selectedIndex = 0;
    let selectedCDData = zenaku;
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

<div class="optionForm" in:fade={{ duration: 500 }}>
    <div class="optionsContainer">
        <ul class="twocols">
            <li>
                <div class="leftcol">CD:</div>
                <div class="rightcol">
                    <!-- <SelectCDReception
                        bind:selectedCDData
                        bind:selected={selectedIndex}
                        bind:atDraw={upToDraw}
                    /> -->
                </div>
            </li>
            <li>
                <div class="leftcol">Group:</div>
                <div class="rightcol">
                    {#each groupMethod as grp}
                        <label>
                            <input
                                type="radio"
                                name="groupOpt"
                                bind:group={groupOpt}
                                id={grp.value}
                                value={grp.value}
                            />
                            {grp.display}
                        </label>
                    {/each}
                </div>
            </li>
            <li>
                <div class="leftcol">Filter:</div>
                <div class="rightcol">
                    {#each filterMethod as filt}
                        <label>
                            <input
                                type="radio"
                                name="filterOpt"
                                bind:group={filterOpt}
                                id={filt.value}
                                value={filt.value}
                            />
                            {filt.display}
                        </label>
                    {/each}
                </div>
            </li>
            <li>
                <div class="leftcol">Sort:</div>
                <div class="rightcol">
                    {#each sortMethod as sort}
                        <label>
                            <input
                                type="radio"
                                name="sortOpt"
                                bind:group={sortOpt}
                                id={sort.value}
                                value={sort.value}
                            />
                            {sort.display}
                        </label>
                    {/each}
                </div>
            </li>
        </ul>
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
    @import "../../style.css";

    .optionForm {
        width: max-content;
        margin: 0 auto;
        padding: 1px 5px;
        line-height: 3.5ch;
    }
    /* 
    .advanceOption {
        padding: 2px 6px;
        border: 1px solid black;
        display: flex;
    } */
</style>

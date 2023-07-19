<script>
    import SelectMembersPanel from "$lib/SelectMembersPanel.svelte";
    import DOBInfo from "./DOBInfo.svelte";
    import {
        getMember,
        getAllMembers,
        getCurrentMembers,
        partitionToGroup,
    } from "$lib/processData.js";
    import { colorCode, colorJPName } from "$lib/util.js";
    import { uniq } from "lodash-es";
    import ColorDiv from "../../lib/ColorDiv.svelte";
    //import { fly,fade } from 'svelte/transition';
    //let temp = [ getMember('Yumiki Nao'), getMember('Sato Kaede') ];
    let gpOpt = "none";
    let mbpanel;
    let listType = "nextBday";
    let selectFrom = "current";
    let selectables = getAllMembers();
    let selectedMembers = getCurrentMembers().map((x) => x.member);
    let sorted = [];
    const partitConfig = {
        nextBday: ["nextDOBMonth", "dobAscend"],
        dob: ["gakunen", "dobAscend"],
        height: ["height", "kana"],
    };
    customSort();

    function customSort(mbs = []) {
        let mbdata = mbs.length > 0 ? mbs.map(getMember) : getCurrentMembers();
        sorted = partitionToGroup(
            mbdata,
            partitConfig[listType][0],
            [],
            true,
            partitConfig[listType][1]
        );
        // each item in array is of the form { label: "yy/YY", value: "yy/YY", has: [{mbdata1}, {mbdata2}, ...] ]
        // add further partitions by generations
        let gens = uniq(mbdata.map((x) => x.gen)).sort((a, b) => a - b);
        sorted.forEach(
            (gp) => (gp.hasGen = partitionToGroup(gp.has, "gen", gens))
        );
    }
</script>

<svelte:head>
    <title>乃木坂46 ー 誕生日・学年データ</title>
    <meta name="description" content="乃木坂46誕生日・学年データ" />
</svelte:head>

<div class="main">
    <div class="optionItem">
        <ul class="twocols">
            <li>
                <div class="leftcol">構成メンバー：</div>
                <div class="rightcol">
                    <label
                        ><input
                            type="radio"
                            name="selection"
                            bind:group={selectFrom}
                            value="current"
                            on:click={customSort}
                        />現役全員</label
                    >
                    <label
                        ><input
                            type="radio"
                            name="selection"
                            bind:group={selectFrom}
                            value="all"
                            on:click={(sorted = [])}
                        />カスタマイズ</label
                    >
                    {#if selectFrom == "all"}
                        <SelectMembersPanel
                            bind:selectedMembers
                            {selectables}
                            nolimit={true}
                            bind:this={mbpanel}
                        />
                    {/if}
                </div>
            </li>
            <li>
                <div class="leftcol">ソート：</div>
                <div class="rightcol">
                    <label>
                        <input
                            type="radio"
                            name="list"
                            bind:group={listType}
                            value="nextBday"
                            on:click={(sorted = [])}
                        />次生誕日先</label
                    >
                    <label>
                        <input
                            type="radio"
                            name="list"
                            bind:group={listType}
                            value="dob"
                            on:click={(sorted = [])}
                        />学年/生月日</label
                    >
                    <label>
                        <input
                            type="radio"
                            name="list"
                            bind:group={listType}
                            value="height"
                            on:click={(sorted = [])}
                        />身長</label
                    >
                </div>
            </li>
            <li>
                <div class="leftcol">グループ分け：</div>
                <div class="rightcol">
                    <label>
                        <input
                            type="radio"
                            name="gpOpt"
                            bind:group={gpOpt}
                            value={"none"}
                        /> なし
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="gpOpt"
                            bind:group={gpOpt}
                            value={"gen"}
                        />
                        期別
                    </label>
                </div>
            </li>
        </ul>
    </div>
    <div style="width: 50%; margin: 1ch auto 5px auto;">
        <button
            on:click={() =>
                customSort(selectFrom == "current" ? [] : selectedMembers)}
            class="print">生成</button
        >
    </div>
    <div class="penlightInfo">
        ペンライト（ボタンA）色順番： <br />
        <div class="colorList">
            {#each Object.keys(colorCode) as color}
                <ColorDiv colorName={color} showNumber="true" size="1.8ch" />
                {colorJPName[color]} &nbsp;
            {/each}
        </div>
    </div>
    <div class="timeline">
        {#each sorted as yrgroup}
            <div class="yrgroup">
                <div class="yrCell">
                    <div>{yrgroup.label}</div>
                </div>
                <div
                    class={gpOpt === "none"
                        ? "yrgrouplist"
                        : "yrgrouplistByGen"}
                >
                    {#if gpOpt === "none"}
                        {#each yrgroup.has as memberData}
                            <DOBInfo {memberData} />
                        {/each}
                    {:else}
                        {#each yrgroup.hasGen as groupData}
                            <div class="yrgrpSubcolumn">
                                {#each groupData.has as memberData}
                                    <DOBInfo {memberData} />
                                {/each}
                            </div>
                        {/each}
                    {/if}
                </div>
            </div>
        {/each}
    </div>
</div>

<style>
    ul.twocols {
        display: inline-block;
        text-align: left;
        margin: 0;
        padding: 0;
        /*	background-color: hsl(40, 100%, 95%);*/
    }

    ul.twocols > li {
        margin: 0.5ch 0 0.5ch;
        display: flex;
        justify-content: left;
    }

    ul.twocols > li > div.leftcol {
        flex: none;
        margin: 0;
        width: 8rem;
    }

    .yrgroup {
        border: 1px solid #999;
        display: grid;
        grid-auto-flow: column;
        grid-template-columns: 60px auto;
        grid-gap: 5px;
        height: fit-content;
        padding: 5px;
    }
    .yrCell {
        border-right: 1px solid black;
        align-self: center;
        justify-self: center;
        height: 100%;
        width: 100%;
        display: grid;
    }
    .yrCell > div {
        padding: 5px;
        justify-self: center;
        align-self: center;
    }
    .yrgrouplist {
        display: grid;
        grid-template-columns: repeat(4, 205px);
        grid-template-rows: repeat(auto-fit, 1fr);
        justify-items: center;
        grid-gap: 4px;
    }
    .yrgrouplistByGen {
        display: flex;
        flex-direction: row;
        /*  I don't know why grid is not working the way I want
		display: grid;
		grid-template-columns: repeat(auto-fit, 280px);
		grid-template-rows: 8ch;
		justify-items: center;
		grid-gap: 4px; */
    }
    .yrgrpSubcolumn {
        padding: 1px;
        display: flex;
        flex-direction: column;
        width: 205px;
        /* display: grid;
		grid-auto-flow: row;
		grid-template-columns: 1fr;
		grid-template-rows: repeat(auto-fit, 1fr);
        grid-gap: 5px; */
        /* height: fit-content; */
    }
    /* .yrgrpSubcolumn div {
        margin: 2px;
        align-self: start;
    } */
    .timeline {
        /* width: 1060px; */
        width: max-content;
        display: flex;
        flex-direction: column;
    }
    .print {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    button.print::before,
    button.print::after {
        flex: auto;
        min-width: 50px;
        height: 1px;
        display: block;
        content: "";
        background-color: black;
    }
    button.print::before {
        margin-right: 25px;
    }
    button.print::after {
        margin-left: 25px;
    }

    .optionItem {
        margin-left: 1rem;
        margin-top: 1ch;
        margin-bottom: 1ch;
    }
    .main {
        margin: 0 auto;
        width: max-content;
        padding: 7px;
    }
    .penlightInfo {
        margin-top: 2ch;
        margin-bottom: 1ch;
        /* display: grid;
        grid-template-rows: 1fr;
        grid-template-columns: 1fr;
        align-content: end; */
    }
    div.penlightInfo > .colorList {
        margin: 0 auto;
        width: max-content;
        padding: 0.3em;
    }
</style>

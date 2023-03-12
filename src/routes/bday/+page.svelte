<script>
    import SelectMembersPanel from "$lib/SelectMembersPanel.svelte";
    import DOBInfo from "./DOBInfo.svelte";
    import {
        getMember,
        getAllMembers,
        partitionToGroup,
        ordering,
    } from "$lib/processData.js";
    import { ISODateToNum, upcomingDOBByMonthsFromNow } from "$lib/util.js";
    import { uniq } from "lodash-es";
    //import { fly,fade } from 'svelte/transition';
    //let temp = [ getMember('Yumiki Nao'), getMember('Sato Kaede') ];
    let selectables = getAllMembers();
    let selectedMembers = [];
    let sorted = [];
    let gpOpt = "none";
    let gens = [];
    let mbpanel;
    let listType = "dob";

    function reset() {
        selectedMembers = [];
        sorted = [];
        gens = [];
        mbpanel.reset();
    }

    function sortyear() {
        let mbdata = selectedMembers.map(getMember);
        if (listType == "nextBday") {
            let bdays = mbdata.map((x) => x.dob);
            let groupedMonths = upcomingDOBByMonthsFromNow(bdays);
            // an array with items [d, ["date1", "date2",..]], increasing in d=month of date1, date2,...
            sorted = [];
            for (let monthGp of groupedMonths) {
                let month = ISODateToNum(monthGp[1][0], "m");
                sorted.push({
                    label: `${month}月`,
                    value: month,
                    has: monthGp[1]
                        .map((date) =>
                            mbdata.filter(
                                (x) => x.dob.slice(5) == date.slice(5)
                            )
                        )
                        .flat(),
                });
            }
        } else if (listType == "dob") {
            sorted = partitionToGroup(
                mbdata,
                "gakunen",
                ordering.ISODateAscend
            );
        }
        // each item in array is of the form { label: "yy/YY", value: "yy/YY", has: [{mbdata1}, {mbdata2}, ...] ]
        if (gpOpt == "gen") {
            gens = uniq(mbdata.map((x) => x.gen)).sort((a, b) => a - b);
            for (let yrGp of sorted) {
                yrGp.has = gens.map((i) => {
                    return {
                        label: `${i}期生`,
                        value: i,
                        has: yrGp.has.filter((mb) => mb.gen == i),
                    };
                });
            }
        }
    }
</script>

<svelte:head>
    <title>乃木坂46 ー 誕生日・学年データ</title>
    <meta name="description" content="乃木坂46誕生日・学年データ" />
</svelte:head>

<div class="optionItem">
    <div>
        ソート：
        <label
            ><input
                type="radio"
                name="list"
                bind:group={listType}
                value="dob"
                on:click={reset}
            />生年月日</label
        >
        <label
            ><input
                type="radio"
                name="list"
                bind:group={listType}
                value="nextBday"
                on:click={reset}
            />次生誕日先</label
        >
    </div>
    <div>
        グループ分け：
        <label>
            <input
                type="radio"
                name="gpOpt"
                bind:group={gpOpt}
                value={"none"}
                on:click={reset}
            /> なし
        </label>
        <label>
            <input
                type="radio"
                name="gpOpt"
                bind:group={gpOpt}
                value={"gen"}
                on:click={reset}
            /> 期別
        </label>
    </div>
</div>
<SelectMembersPanel
    bind:selectedMembers
    {selectables}
    nolimit={true}
    bind:this={mbpanel}
/>
<div style="width: 50%; margin: 1ch auto 5px auto;">
    <button on:click={sortyear} class="print">生成</button>
</div>
<div class="timeline">
    {#each sorted as yrgroup}
        <div class="yrgroup">
            <div class="yrCell">
                <div>{yrgroup.label}</div>
            </div>
            {#if gpOpt == "none"}
                <div class="yrgrouplist">
                    {#each yrgroup.has as memberData}
                        <DOBInfo {memberData} />
                    {/each}
                </div>
            {:else}
                <div class="yrgrouplistByGen">
                    {#each yrgroup.has as groupData}
                        <div class="yrgrpSubcolumn">
                            <!-- <span style="width: 50%; margin-left:auto; margin-right:auto;">{groupData.label}</span> -->
                            {#each groupData.has as memberData}
                                <DOBInfo {memberData} />
                            {/each}
                        </div>
                    {/each}
                </div>
            {/if}
        </div>
    {/each}
</div>

<style>
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
        padding: 2px;
        /* border: 1px solid black; */
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
    .yrgrpSubcolumn div {
        align-self: start;
    }
    /* .yrgrouplist div{
    display:block;
    width:100%;
    text-align: center;
    border: 1px solid #BBB;
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
</style>

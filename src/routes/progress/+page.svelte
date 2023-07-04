<script>
    // import membersdata from "$lib/data/members.json";
    import {
        cdAlias,
        membersdata,
        fulldata,
        involvedMembers,
        performedInCDs,
        ordering,
    } from "$lib/processData.js";
    import { union, range, includes } from "lodash-es";
    import { fly } from "svelte/transition";
    import ProgressTable from "./ProgressTable.svelte";
    import SelectOneCD from "$lib/SelectOneCD.svelte";
    import SelectCDs from "$lib/SelectCDs.svelte";
    import RemoveCDTypes from "$lib/RemoveCDTypes.svelte";
    import SelectMembersPanel from "$lib/SelectMembersPanel.svelte";

    let seriesTypes = [
        { display: "個別円盤の各受付完売数推移", value: "cdProgression" },
        { display: "個別メンバーの総完売数推移", value: "overallProgression" },
        {
            display: "個別メンバーのN次受付までの完売数推移",
            value: "receptionProgression",
        },
    ];
    let fixTypes = [
        { display: "円盤", value: "fixCD" },
        { display: "メンバー", value: "fixMember" },
    ];
    let seriesOpt = "cdProgression";
    let fixOpt = "fixCD";
    let mode = "fixCD";

    let members = ["Yumiki Nao", "Kanagawa Saya", "Sato Kaede"];
    let includings = [fulldata[fulldata.length - 1]];

    let selectedCD = fulldata[fulldata.length - 1];
    let selectedMembers = members;
    let selectables = involvedMembers(selectedCD);
    let removeTypes = [];

    let fixingMember = "Yumiki Nao";
    let selectedCDsData = [];

    let lastDraw = 1;
    let selectedDraw = 1;
    let extra = {};

    $: {
        if (seriesOpt == "cdProgression") {
            if (fixOpt == "fixCD") {
                selectables = involvedMembers(selectedCD);
            }
            if (fixOpt == "fixMember") {
                selectables = performedInCDs(fixingMember, fulldata)
                    .map((x) => cdAlias(x))
                    .reverse();
            }
        }
        if (seriesOpt == "overallProgression") {
            selectables = union(fulldata.map((x) => involvedMembers(x)).flat());
        }
        if (seriesOpt == "receptionProgression") {
            selectables = union(fulldata.map((x) => involvedMembers(x)).flat());
            lastDraw =
                selectedCDsData.length > 1
                    ? Math.max(...selectedCDsData.map((x) => x.lastDraw))
                    : 1;
        }
    }

    function findStartingCD(memberNameList) {
        for (let i = 0; i < fulldata.length; i++) {
            let found = false;
            for (let mb of memberNameList) {
                found ||= !!fulldata[i].table.find((x) => x.member == mb);
            }
            if (found) return i;
        }
        return fulldata.length; //everyone in list not in any CD, something is strange
    }

    function processData() {
        if (seriesOpt == "cdProgression") {
            if (fixOpt == "fixCD") {
                members = selectedMembers;
                includings = [selectedCD];
                mode = fixOpt;
            }
            if (fixOpt == "fixMember") {
                members = [fixingMember];
                includings = selectedCDsData;
                mode = fixOpt;
            }
        }
        if (seriesOpt == "overallProgression") {
            //should produce error if all MB not in any recorded cd; but this should not happen
            includings = fulldata
                .slice(findStartingCD(selectedMembers))
                .filter((x) => !includes(removeTypes, x.cd.type));
            members = selectedMembers;
            mode = "overallProgression";
        }
        if (seriesOpt == "receptionProgression") {
            includings = selectedCDsData.sort((a, b) =>
                ordering.ISODateAscend(a.cd.release, b.cd.release)
            );
            members = selectedMembers;
            mode = "receptionProgression";
            extra = { atdraw: selectedDraw };
        }
    }
</script>

<svelte:head>
    <title>乃木坂46完売数推移</title>
    <meta name="description" content="乃木坂46完売数推移" />
</svelte:head>

<div class="optionsContainer">
    <ul class="twocols">
        <li>
            <div class="leftcol">系列構成:</div>
            <div class="rightcol">
                {#each seriesTypes as ser}
                    <label>
                        <input
                            type="radio"
                            name="seriesOpt"
                            bind:group={seriesOpt}
                            id={ser.value}
                            value={ser.value}
                        />
                        {ser.display}
                    </label>
                {/each}
            </div>
        </li>
        <li>
            <div class="leftcol">データ:</div>
            <div class="rightcol">
                {#if seriesOpt == "cdProgression"}
                    <div class="cdProgressionOption">
                        <div class="fixOption">
                            固定対象:
                            {#each fixTypes as ft}
                                <label>
                                    <input
                                        type="radio"
                                        name="fixOpt"
                                        bind:group={fixOpt}
                                        id={ft.value}
                                        value={ft.value}
                                    />
                                    {ft.display}
                                </label>
                            {/each}
                        </div>
                        {#if fixOpt == "fixCD"}
                            <div
                                class="selectFix"
                                in:fly={{ x: 200, duration: 700 }}
                            >
                                <SelectOneCD bind:selectedCDData={selectedCD} />
                            </div>
                            <div
                                class="longSelection"
                                in:fly={{ x: 200, duration: 700 }}
                            >
                                <SelectMembersPanel
                                    bind:selectedMembers
                                    {selectables}
                                />
                            </div>
                        {/if}

                        {#if fixOpt == "fixMember"}
                            <div
                                class="selectFix"
                                in:fly={{ x: 200, duration: 700 }}
                            >
                                <select
                                    id="mbSelect"
                                    name="mbSelect"
                                    bind:value={fixingMember}
                                >
                                    {#each membersdata as mb}
                                        <option value={mb.member}
                                            >{mb.kanji}</option
                                        >
                                    {/each}
                                </select>
                            </div>
                            <div
                                class="cdList"
                                in:fly={{ x: 200, duration: 700 }}
                            >
                                <SelectCDs bind:selectedCDsData {selectables} />
                            </div>
                        {/if}
                    </div>
                {/if}

                {#if seriesOpt == "overallProgression"}
                    <div in:fly={{ x: 200, duration: 700 }}>
                        <RemoveCDTypes bind:removeTypes /> <br />
                        <SelectMembersPanel
                            bind:selectedMembers
                            {selectables}
                        />
                    </div>
                {/if}

                {#if seriesOpt == "receptionProgression"}
                    <div in:fly={{ x: 200, duration: 700 }}>
                        <div
                            style="margin: 5px; padding-bottom: 5px; border-bottom: solid 1px black;"
                        >
                            <SelectCDs
                                bind:selectedCDsData
                                selectAllButton={true}
                            />
                        </div>
                        <div
                            style="margin-top: 1ch; padding-bottom: 5px; border-bottom: solid 1px black;"
                        >
                            (N=
                            <select name="draw" bind:value={selectedDraw}>
                                {#each range(lastDraw) as i}
                                    <option value={i + 1}>{i + 1}</option>
                                {/each}
                            </select>
                            )次受付
                        </div>
                        <div style="margin-top: 1ch">
                            <SelectMembersPanel
                                bind:selectedMembers
                                {selectables}
                            />
                        </div>
                    </div>
                {/if}
            </div>
        </li>
        <li>
            <div style="width: 50%; margin: 1ch auto 5px auto;">
                <button on:click={processData} class="print"
                    >グラフ作成する</button
                >
            </div>
        </li>
    </ul>
</div>

<ProgressTable {mode} {members} {includings} {extra} />

<style>
    input,
    button {
        font-size: inherit;
        font-family: inherit;
        line-height: 1.2;
    }

    button:focus:not(:focus-visible) {
        outline: none;
    }

    .optionsContainer {
        width: max-content;
        margin: 10px 1ch;
        padding: 2px 6px;
        border: 1px solid black;
        display: flex;
    }

    ul.twocols {
        display: inline-block;
        text-align: left;
        margin: 0;
        padding: 0;
        /*	background-color: hsl(40, 100%, 95%);*/
    }

    ul.twocols > li {
        margin: 15px;
        display: flex;
        justify-content: left;
        margin: 0;
    }

    ul.twocols > li > div.leftcol {
        margin-top: 0;
        margin-bottom: 0.5ch;
        margin-right: 0.2em;
        width: 75px;
    }

    ul.twocols > li > div.rightcol {
        margin-top: 0;
        margin-bottom: 0.5ch;
        margin-right: 1em;
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

    .cdList {
        /* grid-area: "longbox";   don't know why this is not working?? */
        grid-area: 2/1/3/3;
    }

    .cdProgressionOption {
        display: grid;
        grid-template-columns: 255px auto;
        grid-template-rows: auto;
        grid-template-areas:
            "row1L row2R"
            "longbox longbox";
    }

    .fixOption {
        grid-area: "row1L";
        margin-left: 5px;
        margin-top: 0.2ch;
        margin-bottom: 1ch;
    }

    .selectFix {
        grid-area: "row1R";
        margin-top: 0.2ch;
        margin-bottom: 1ch;
    }

    .longSelection {
        margin-left: 5px;
        /* grid-area: "longbox";   don't know why this is not working?? */
        grid-area: 2/1/3/3;
    }
</style>

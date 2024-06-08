<script>
    // import membersdata from "$lib/data/members.json";
    import {
        cdAlias,
        membersdata,
        fulldata,
        involvedMembers,
        findStartingCD,
        hasMeetInCD,
        performedInCDs,
        ordering,
        getAllMembers,
    } from "$lib/processData.js";
    import { range, includes } from "lodash-es";
    import { fly } from "svelte/transition";
    import ProgressTable from "./ProgressTable.svelte";
    import SelectOneCD from "$lib/SelectOneCD.svelte";
    import SelectCDs from "$lib/SelectCDs.svelte";
    import RemoveCDTypes from "$lib/RemoveCDTypes.svelte";
    import SelectMembersPanel from "$lib/SelectMembersPanel.svelte";
    import AccordionItem from "../../lib/AccordionItem.svelte";

    let seriesTypes = [
        { display: "個別円盤の各受付完売数推移", value: "cdProgression" },
        { display: "個別メンバーの総完売数推移", value: "overallProgression" },
        {
            display: "個別メンバーのN次受付までの完売数推移",
            value: "receptionProgression",
        },
    ];
    let fixTypes = [
        {
            display: "参加全員",
            value: "fixAllMB",
            selectables: () => null,
        },
        {
            display: "円盤",
            value: "fixCD",
            selectables: () => involvedMembers(selectedCD),
        },
        {
            display: "メンバー",
            value: "fixMember",
            selectables: () =>
                performedInCDs(fixingMember)
                    .map((x) => cdAlias(x))
                    .reverse(),
        },
    ];
    let optionMenuOpened = true;
    let seriesOpt = "cdProgression";
    let fixOpt = "fixCD";
    let mode = "fixCD";

    let members = ["Yumiki Nao", "Kanagawa Saya"];
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
            selectables = fixTypes
                .find((x) => x.value === fixOpt)
                .selectables();
        }
        if (seriesOpt == "overallProgression") {
            //selectables = union(fulldata.map((x) => involvedMembers(x)).flat());
            selectables = getAllMembers();
        }
        if (seriesOpt == "receptionProgression") {
            selectables = getAllMembers();
            lastDraw =
                selectedCDsData.length > 1
                    ? Math.max(...selectedCDsData.map((x) => x.lastDraw))
                    : 1;
        }
    }

    function processData() {
        optionMenuOpened = false;
        if (seriesOpt == "cdProgression") {
            if (fixOpt == "fixCD") {
                includings = [selectedCD];
                members = selectedMembers.filter((mb) =>
                    includings.reduce(
                        (prev, curr) => prev && hasMeetInCD(mb, curr),
                        true
                    )
                );
            }
            if (fixOpt == "fixMember") {
                members = [fixingMember];
                includings = selectedCDsData;
            }
            if (fixOpt == "fixAllMB") {
                includings = selectedCDsData;
                members = [];
            }
            mode = fixOpt;
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
            let startingCD = fulldata[findStartingCD(selectedMembers)].cd;
            includings = selectedCDsData
                .filter(
                    (x) =>
                        ordering.ISODateAscend(
                            startingCD.release,
                            x.cd.release
                        ) <= 0
                )
                .sort((a, b) =>
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

<AccordionItem bind:isOpen={optionMenuOpened} title="推移データ設定">
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
                            {#if fixOpt == "fixAllMB"}
                                <div
                                    class="longSelection"
                                    in:fly|global={{ y: 200, duration: 700 }}
                                >
                                    <SelectCDs
                                        bind:selectedCDsData
                                        selectAllButton={true}
                                    />
                                </div>
                            {/if}
                            {#if fixOpt == "fixCD"}
                                <div
                                    class="selectFix"
                                    in:fly|global={{ y: 200, duration: 700 }}
                                >
                                    <SelectOneCD
                                        bind:selectedCDData={selectedCD}
                                    />
                                </div>
                                <div
                                    class="longSelection"
                                    in:fly|global={{ y: 200, duration: 700 }}
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
                                    in:fly|global={{ y: 200, duration: 700 }}
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
                                    in:fly|global={{ y: 200, duration: 700 }}
                                >
                                    <SelectCDs
                                        bind:selectedCDsData
                                        {selectables}
                                    />
                                </div>
                            {/if}
                        </div>
                    {/if}

                    {#if seriesOpt == "overallProgression"}
                        <div in:fly|global={{ y: 200, duration: 700 }}>
                            <RemoveCDTypes bind:removeTypes /> <br />
                            <SelectMembersPanel
                                bind:selectedMembers
                                {selectables}
                            />
                        </div>
                    {/if}

                    {#if seriesOpt == "receptionProgression"}
                        <div in:fly|global={{ y: 200, duration: 700 }}>
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
</AccordionItem>

<!-- <div class="main"> -->
<ProgressTable {mode} {members} {includings} {extra} />

<!-- </div> -->

<style>
    @import "../../style.css";
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
        grid-template-columns: fit-content auto;
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

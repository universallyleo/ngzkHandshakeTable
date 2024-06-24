<script>
    import {
        cdAlias,
        membersdata,
        currentCDData,
        involvedMembers,
        performedInCDs,
    } from "$lib/processData.js";
    import { fly } from "svelte/transition";
    import SelectOneCD from "$lib/SelectOneCD.svelte";
    import SelectCDs from "$lib/SelectCDs.svelte";
    import SelectMembersPanel from "$lib/SelectMembersPanel.svelte";

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

    let selectedCD = currentCDData;
    let fixingMember = "Yumiki Nao";

    export let fixOpt = "fixCD";
    export let selectedCDsData = [currentCDData];
    export let selectedMembers = members;
    let selectables = involvedMembers(currentCDData);

    let members = ["Yumiki Nao", "Kanagawa Saya"];

    $: {
        if (fixOpt == "fixCD") {
            selectedCDsData = [selectedCD]; //need calling selectedCD to trigger reactive....
        }
        if (fixOpt == "fixMember") {
            selectedMembers = [fixingMember]; //need calling fixingMember trigger reative....
        }
        selectables = fixTypes.find((x) => x.value === fixOpt).selectables();
        selectables = selectables;
    }
</script>

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
        <div class="longSelection" in:fly|global={{ y: 200, duration: 700 }}>
            <SelectCDs bind:selectedCDsData selectAllButton={true} />
        </div>
    {/if}

    {#if fixOpt == "fixCD"}
        <div class="selectFix" in:fly|global={{ y: 200, duration: 700 }}>
            <SelectOneCD bind:selectedCDData={selectedCD} />
        </div>
        <div class="longSelection" in:fly|global={{ y: 200, duration: 700 }}>
            <SelectMembersPanel bind:selectedMembers {selectables} />
        </div>
    {/if}

    {#if fixOpt == "fixMember"}
        <div class="selectFix" in:fly|global={{ y: 200, duration: 700 }}>
            <select id="mbSelect" name="mbSelect" bind:value={fixingMember}>
                {#each membersdata as mb}
                    <option value={mb.member}>{mb.kanji}</option>
                {/each}
            </select>
        </div>
        <div class="cdList" in:fly|global={{ y: 200, duration: 700 }}>
            <SelectCDs bind:selectedCDsData {selectables} />
        </div>
    {/if}
</div>

<style>
    .cdList {
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

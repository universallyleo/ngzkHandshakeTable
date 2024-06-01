<script>
    import { fulldata, cdAlias } from "$lib/processData.js";
    import { find } from "lodash-es";
    import StateButton from "$lib/StateButton.svelte";

    export let selectAllButton = false;
    export let selectedCDsData;
    export let selectables = fulldata.map((x) => cdAlias(x.cd)).reverse();

    let selectedCDs = selectables.map((x) => x.value);

    const toggleSelectAll = (txt) =>
        (selectedCDs = txt.match(/選択$/)
            ? selectables.map((x) => x.value)
            : []);

    function onlySingles(num = 0) {
        let filtered = selectables
            .filter(({ value }) => value.match(/Single$/))
            .map((x) => x.value);

        selectedCDs = num > 0 ? filtered.slice(0, num) : filtered;
    }

    $: selectedCDsData = selectedCDs.map((x) =>
        find(fulldata, (y) => cdAlias(y.cd).value === x)
    );
</script>

{#if selectAllButton}
    <StateButton
        states={["すべて解除", "すべて選択"]}
        on:changeFrom={(ev) => toggleSelectAll(ev.detail.text)}
    />
    <button on:click={onlySingles}> シングルのみ </button>
    <button on:click={() => onlySingles(6)}> 最新6枚シングル </button>
{/if}
<div class="list">
    {#each selectables as cd}
        <label>
            <input
                type="checkbox"
                name="selectedCDs"
                bind:group={selectedCDs}
                value={cd.value}
            />
            {cd.display}
        </label>
    {/each}
</div>

<style>
    [type="checkbox"] {
        vertical-align: middle;
    }

    .list {
        width: max-content;
        display: grid;
        grid-auto-flow: column;
        grid-column-gap: 1.2em;
        grid-template-rows: repeat(5, auto);
    }
</style>

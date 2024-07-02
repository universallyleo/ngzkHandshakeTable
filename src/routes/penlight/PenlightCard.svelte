<script>
    import ColorDiv from "$lib/ColorDiv.svelte";
    import { membersdata, getMember } from "$lib/processData.js";
    export let leftCol;
    export let rightCol;

    let selectedMember;
    let selectMethod;

    $: {
        if (selectMethod === "fromMember" && selectedMember) {
            leftCol = getMember(selectedMember).penlight[0];
            rightCol = getMember(selectedMember).penlight[1];
        }
    }
</script>

<div class="container">
    <div>
        Select from :
        <label>
            <input
                type="radio"
                name="selectMethod"
                bind:group={selectMethod}
                id="fromMember"
                value="fromMember"
            /> member
        </label>
        <label>
            <input
                type="radio"
                name="selectMethod"
                bind:group={selectMethod}
                id="fromCustom"
                value="fromCustom"
            /> custom
        </label>
    </div>
    {#if selectMethod === "fromMember"}
        <div>
            <select id="mbSelect" name="mbSelect" bind:value={selectedMember}>
                {#each membersdata as mb}
                    <option value={mb.member}>{mb.kanji}</option>
                {/each}
            </select>
        </div>
    {/if}
    <!-- {#if member}
        <div>
            from {member}
        </div>
    {/if} -->
    <div class="card">
        <div>
            左:
            {#if leftCol}
                <ColorDiv colorName={leftCol} showNumber={true} size="2ch" />
            {:else}
                Select left color
            {/if}
        </div>
        <div>
            <button> &lt;-&gt; </button>
        </div>
        <div>
            右:
            {#if rightCol}
                <ColorDiv colorName={rightCol} showNumber={true} size="2ch" />
            {:else}
                Select right color
            {/if}
        </div>
    </div>
</div>

<style>
    .container {
        border: 1px solid black;
        display: flex;
        flex-direction: column;
    }
    .card {
        /* width: 200px; */
        width: max-content;
        /* height: 8ch; */
        border: 1px solid hsl(291, 57%, 50%);
        display: grid;
        grid-template-columns: max-content 3em max-content;
        gap: 0.5em;
        margin: 2px;
        padding: 0.2em;
        justify-items: center;
        align-items: center;
        /* height: fit-content; */
    }
    .card > div {
        background-color: #bbb;
    }
</style>

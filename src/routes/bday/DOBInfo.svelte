<script>
    import ColorDiv from "$lib/ColorDiv.svelte";
    import { JPDateDisplay, getAge } from "$lib/util.js";

    export let memberData;

    let genColor = [
        "#643486",
        "#cc0000",
        "#0099D4",
        "#eb7f3bf7",
        "#F680B0",
        "#000000",
    ];
</script>

<div class="card">
    <div class="tbl">
        <div class="cell">{memberData.kanji}</div>
        <div class="cell">
            <!-- <span style="color:#888; font-size:small">コール:</span> -->
            {memberData.call === "" ? "-" : memberData.call}
        </div>
        <div class="cell">
            {getAge(memberData.dob)}歳 ／
            <span style="color: {genColor[memberData.gen - 1]}"
                >{memberData.gen}期生
            </span>
            {#if memberData.penlight[0] !== ""}
                ／
                <ColorDiv colorName={memberData.penlight[0]} />
                <ColorDiv colorName={memberData.penlight[1]} />
            {/if}
        </div>
        <div class="cell">{JPDateDisplay(memberData.dob)}</div>
    </div>
    <!-- TODO: <div class="pic">profile pic</div> -->
</div>

<style>
    .card {
        width: 200px;
        /* height: 8ch; */
        border: 1px solid hsl(291, 57%, 50%);
        /* display: grid; */
        /* grid-template-columns: 200px 70px; */
        margin: 2px;
        height: fit-content;
    }

    .tbl {
        width: 100%;
        display: grid;
        grid-template-rows: repeat(4, 1fr);
        align-items: center;
    }

    /* .pic {
        width: 100%;
        border: 1px solid #bbb;
    } */

    .cell {
        width: 100%;
        text-align: center;
        border: 1px solid #bbb;
        padding-top: 2px;
    }
</style>

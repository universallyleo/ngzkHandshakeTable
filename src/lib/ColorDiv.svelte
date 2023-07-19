<script>
    import { colorCode, colorJPName, colorContrast } from "$lib/util.js";
    export let colorName = "white";
    export let showNumber = false;
    export let size = "1.2ch";
    $: rgb = colorCode[colorName];
</script>

<div class="main" style="background: {rgb}; width: {size}; height: {size};">
    <div class="tt-right">
        {colorJPName[colorName]}
    </div>
    {#if showNumber}
        <div class="number" style="color:{colorContrast[colorName]};">
            {Object.keys(colorCode).indexOf(colorName) + 1}
        </div>
    {/if}
</div>

<!-- 
{#if show}
    <span>
        {colorName}
    </span>
{/if} -->

<style>
    .main {
        display: inline-block;
        position: relative;
        /* height: 1.2ch;
        width: 1.2ch; */
        margin: 3px 0 0 0;
        border: solid 1px black;
        cursor: pointer;
    }
    .tt-right {
        min-width: 100px;
        max-width: 200px;
        top: 50%;
        left: 100%;
        /* margin-left: 20px; */
        transform: translate(-30%, -130%);
        padding: 12px;
        background-color: #ffffe0;
        font-weight: normal;
        font-size: 13px;
        line-height: 1rem;
        border-radius: 8px;
        position: absolute;
        z-index: 99999999;
        box-sizing: border-box;
        box-shadow: 0 1px 7px rgba(0, 0, 0, 0.5);
        display: none;
        text-align: center;
    }
    .main:hover .tt-right {
        display: block;
    }
    .number {
        margin: 0 auto;
        text-align: center;
        font-size: smaller;
        position: relative;
        top: 0px;
    }
</style>

<script>
    import { colorCode, colorJPName, colorContrast } from "$lib/util.js";
    import "balloon-css/balloon.min.css";
    export let colorName = "white";
    export let showNumber = false;
    export let tooltip = "true";
    export let size = "1.2ch";
    $: rgb = colorCode[colorName];
</script>

<div
    class="main"
    style="background: {rgb}; width: {size}; height: {size};"
    aria-label={tooltip == "true" ? colorJPName[colorName] : null}
    data-balloon-pos={tooltip == "true" ? "up" : null}
>
    {#if showNumber}
        <div class="number" style="color:{colorContrast[colorName]};">
            {Object.keys(colorCode).indexOf(colorName) + 1}
        </div>
    {/if}
</div>

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
    .number {
        margin: 0 auto;
        text-align: center;
        font-size: smaller;
        position: relative;
        top: 0px;
    }
</style>

<script>
    import { cdAlias } from "$lib/processData.js";
    import { zip } from "lodash-es";

    export let fulldata;
    export let selectedCDData = fulldata[fulldata.length - 1];
    export let atDraw = selectedCDData ? selectedCDData.lastDraw : 0;
    // export let exclude = { value: -1 };
    export let excludeFrom = -1;

    let reverseIdx = (i) => fulldata.length - 1 - i;
    let cdlist = fulldata.map((x) => cdAlias(x.cd)).reverse();

    let previousExclude = -2;
    let selectables = [];
    let selected = cdlist[0];

    function regenSelectables(e) {
        if (
            (e == previousExclude && previousExclude != -2) ||
            fulldata.length == 0
        ) {
            return;
        }

        let indices = Array(fulldata.length - e - 1)
            .fill(0)
            .map((_, i) => e + 1 + i);
        previousExclude = e;
        selectables = zip(cdlist.slice(e + 1), indices);
        selected = selectables[0][1];
    }
    regenSelectables(parseInt(excludeFrom));

    let getData = (i) => fulldata[reverseIdx(i)];
    $: regenSelectables(parseInt(excludeFrom));
    $: selectedCDData = getData(selected);
    $: atDraw = getData(selected).lastDraw;
</script>

<select id="cdSelect" size="1" name="cd" bind:value={selected} on:change>
    <!-- on:change={() => (atDraw = getData(selected).lastDraw)} -->
    {#each selectables as cdidx}
        <option value={cdidx[1]}>{cdidx[0].display}</option>
    {/each}
</select>
<label>
    <select
        id="drawSelect"
        name="drawSelect"
        bind:value={atDraw}
        style="margin-left: 2px; margin-right: 2px"
        on:change
    >
        {#each [...Array(selectedCDData.lastDraw).keys()].reverse() as i}
            <option value={i + 1}>{i + 1}</option>
        {/each}
    </select>
    次受付
    <!-- <button on:click={() => tableReset()}>再生成</button> -->
</label>

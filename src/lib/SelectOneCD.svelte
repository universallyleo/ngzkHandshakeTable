<script>
    import { fulldata, cdAlias } from "$lib/processData.js";
    import { differenceWith, findIndex, isEqual, zip } from "lodash-es";

    export let selectedCDData = fulldata[fulldata.length - 1];
    export let exclude = [{ value: -1 }]; // type: CDDATATABLE.cd

    let cdlist = fulldata.map((x) => cdAlias(x.cd)).reverse();

    let temp = differenceWith(cdlist, exclude, isEqual);
    let indices = temp.map((x) =>
        findIndex(cdlist, (y) => x.value === y.value)
    );
    let selectables = zip(temp, indices);
    export let selected = selectables[0][1];
    selectedCDData = fulldata[fulldata.length - 1 - selected];

    $: selectedCDData = fulldata[fulldata.length - 1 - selected];
</script>

<select id="cdSelect" size="1" name="cd" bind:value={selected}>
    {#each selectables as cdidx}
        <option value={cdidx[1]}>{cdidx[0].display}</option>
    {/each}
</select>

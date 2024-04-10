<script>
    import { fulldata, cdAlias } from "$lib/processData.js";
    import { findIndex, zip } from "lodash-es";

    export let selectedCDData = fulldata[fulldata.length - 1];
    export let atDraw = selectedCDData.lastDraw;
    // export let exclude = { value: -1 };
    export let excludeFrom = -1;

    let reverseIdx = (i) => fulldata.length - 1 - i;
    // console.log("revIdx(excludeFrom)", reverseIdx(excludeFrom));

    let cdlist = fulldata.map((x) => cdAlias(x.cd)).reverse();
    // console.log(cdlist);

    // let exclude =
    //     excludeFrom != -1
    //         ? [cdAlias(cdlist[reverseIdx(excludeFrom)])]
    //         : [{ value: -1 }];
    // when exclude = [{display:..,value:..}, ... ] from sporadic collection,
    // then can use following line, and remove .slice() in selectables' definition
    // let temp = differenceWith(cdlist, exclude, isEqual);
    // let indices = cdlist.map((x) =>
    //     findIndex(cdlist, (y) => x.value === y.value)
    // );
    // let excludeFrom = findIndex(cdlist, (y) => exclude.value === y.value);
    let indices = Array(fulldata.length - excludeFrom - 1)
        .fill(0)
        .map((_, i) => excludeFrom + 1 + i);
    // excludeFrom > -1
    //     ? console.log("from component: ", excludeFrom, indices[0])
    //     : null;
    let selectables = zip(cdlist.slice(excludeFrom + 1), indices);
    // console.log(selectables);

    export let selected = selectables[0][1];

    let getData = (i) => fulldata[reverseIdx(i)];
    selectedCDData = getData(selected);

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

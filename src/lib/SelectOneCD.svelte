<script>
import data from '$lib/data/data.json';
import {cdData} from '$lib/util.js';

export let selectedCDData;
export let exclude={value:-1}; // type: CDDATATABLE.cd


let cdlist = data.map(x=> cdData(x.cd)).reverse();
let selected = 0;

if (cdlist[selected].value == exclude.value) {
    selected = 1;
}

$: selectedCDData = data[data.length-1-selected];
</script>

<select id="cdSelect" name="cd" bind:value={selected}>
    {#each cdlist as cd,i}
        {#if exclude.value != -1 || exclude.value!=cd.value}
            <option value={i}>{cd.display}</option>
        {/if}
    {/each}
</select>
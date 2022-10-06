<script>
import {cdData} from '$lib/util.js';
import {differenceWith, findIndex, isEqual,  zip} from 'lodash-es';

export let allCDData;
export let selectedCDData;
export let exclude=[{value:-1}]; // type: CDDATATABLE.cd

let cdlist = allCDData.map(x=> cdData(x.cd)).reverse();

let temp = differenceWith(cdlist, exclude, isEqual);
let indices = temp.map( x => findIndex(cdlist, y=>x.value===y.value));
let selectables = zip(temp,indices);
let selected = selectables[0][1];
selectedCDData = allCDData[allCDData.length-1-selected];

$: selectedCDData = allCDData[allCDData.length-1-selected];
</script>

<select id="cdSelect" size="1" name="cd" bind:value={selected}>
    {#each selectables as cdidx}
        <option value={cdidx[1]}>{cdidx[0].display}</option>
    {/each}
</select>
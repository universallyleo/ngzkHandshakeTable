<script>
//import allCDData from '$lib/data/data.json';
import {cdData} from '$lib/util.js';
import {find} from 'lodash-es';
import StateButton from '$lib/StateButton.svelte';

export let allCDData;
export let selectAllButton=false;
export let selectedCDsData;
export let selectables = allCDData.map(x=> cdData(x.cd)).reverse();

let selectedCDs = selectables.map(x=>x.value);

const toggleSelectAll = (txt) => selectedCDs = txt.match(/選択$/)?selectables.map(x=>x.value):[];

$: selectedCDsData = selectedCDs.map( x => find(allCDData, y=> cdData(y.cd).value===x) );
</script>

{#if selectAllButton}
<StateButton states={["すべて解除", "すべて選択"]} on:changeFrom={(ev)=>toggleSelectAll(ev.detail.text)}/>
{/if}
<div class="list">
    {#each selectables as cd}
    <label><input type="checkbox" name="selectedCDs" bind:group={selectedCDs} value={cd.value}>
    {cd.display}</label>
    {/each}
</div>

<style>
    
[type="checkbox"]
{
    vertical-align:middle;
}

.list{
    width: max-content;
    display: grid;
    grid-auto-flow: column;
    grid-column-gap: 1.2em;
    grid-template-rows: repeat(5,auto);
}
</style>
<script>
import { createEventDispatcher } from 'svelte';

export let states = [];

let stateIndex = 0;

const dispatch = createEventDispatcher();

function toggle(){
    dispatch('changeFrom', {
		text: states[stateIndex]
	});
    stateIndex = stateIndex==states.length-1?0:stateIndex+1;
}

export function resetState(s){ stateIndex=s; }
</script>

<button on:click={toggle}>
{states[stateIndex]}
</button>

<style>
button{
    padding: 2px;
    font-size: inherit;
    font-family: inherit;
    line-height:1.2;
}
</style>
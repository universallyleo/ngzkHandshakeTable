<script>
    import { createEventDispatcher } from "svelte";

    export let states = [];
    export let defaultState = null;

    let stateIndex = defaultState == null ? 0 : defaultState;

    const dispatch = createEventDispatcher();

    function toggle() {
        dispatch("changeFrom", {
            text: states[stateIndex],
            stateIdx: stateIndex,
        });
        stateIndex = stateIndex == states.length - 1 ? 0 : stateIndex + 1;
    }

    export function resetState(s) {
        stateIndex = s;
    }
</script>

<button on:click={toggle}>
    {states[stateIndex]}
</button>

<style>
    button {
        padding: 2px;
        font-size: inherit;
        font-family: inherit;
        line-height: 1.2;
    }
</style>

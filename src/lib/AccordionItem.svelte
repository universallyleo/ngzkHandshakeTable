<script>
    import { slide } from "svelte/transition";
    export let title;
    export let isOpen = false;
    const toggle = () => (isOpen = !isOpen);
</script>

<div style="margin-bottom:.2em;">
    <button style="display:flex;" on:click={toggle} aria-expanded={isOpen}>
        <svg
            class="mr-1"
            width="20"
            height="20"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke="currentColor"><path d="M9 5l7 7-7 7" /></svg
        >
        {title}
    </button>

    {#if isOpen}
        <div
            class="content"
            class:hidden={!isOpen}
            transition:slide={{ duration: 300 }}
        >
            <slot />
        </div>
    {/if}
</div>

<style>
    button {
        width: 100%;
        border: none;
        background: #eee;
        color: inherit;
        cursor: pointer;
        margin: 0;
        padding: 0.6rem;
        &[aria-expanded="true"] {
            background: #ccc;
        }
    }

    button:hover {
        background: #ccc;
    }

    svg {
        margin-left: 0.2em;
        margin-right: 0.5em;
        flex-shrink: 0;
        transition: transform 0.2s ease-in;
    }

    [aria-expanded="true"] svg {
        transform: rotate(0.25turn);
    }

    .hidden {
        display: none;
    }

    .content {
        /* border: 1px solid black; */
        border-left: 1px solid #ccc;
        padding: 0.2em 1em;
    }
</style>

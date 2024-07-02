<script>
    import { range } from "lodash-es";
    import PenlightCard from "./PenlightCard.svelte";
    let numColorGroups = 0;
</script>

<div>
    Number of color groups:
    {#each range(1, 5) as i}
        <label>
            <input
                type="radio"
                name="numColorGroups"
                bind:group={numColorGroups}
                id={i}
                value={i}
            />
            {i}
        </label>
    {/each}
</div>

<div>
    {#each range(1, numColorGroups + 1) as i}
        <div>
            <PenlightCard leftCol={null} rightCol={null} />
        </div>
        <div class="arrow-container">
            <div>
                <span class="down-arrow"></span>
            </div>
            <div>
                <span class="down-arrow"></span>
            </div>
        </div>
    {/each}
</div>

<style>
    .arrow-container {
        display: grid;
        grid-template-columns: repeat(2, 15px);
        margin-left: 5em;
        gap: 5em;
        align-items: center;
    }

    .down-arrow {
        display: inline-block;
        margin: 30px;
        width: 15px;
        height: 15px;
        border-top: 2px solid #f10c0c;
        border-left: 2px solid #f10c0c;
        transform-origin: center;
    }
    .down-arrow {
        transform: rotate(-135deg);
    }
    .down-arrow::after {
        content: "";
        display: block;
        width: 2px;
        height: 45px;
        background-color: #f10c0c;
        transform: rotate(-45deg) translate(15px, 4px);
    }
</style>

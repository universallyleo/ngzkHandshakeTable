<script>
    import SelectCDReception from "$lib/SelectCDReception.svelte";
    import { fade } from "svelte/transition";
    import { createEventDispatcher } from "svelte";

    export let filterOpt = "showall";
    export let groupOpt = "gen";
    export let sortOpt = "kana";
    export let fulldata = [];
    export let selectedCDData = [];
    export let upToDraw = selectedCDData.length;
    export let displayMethod = (n) => `${n}次受付結果`;

    const dispatch = createEventDispatcher();

    function chagneSelected() {
        dispatch("changeSelectedCD", {});
    }

    let selectedIndex = 0;
    let filterMethod = [
        { display: "参加者全員", value: "showall" },
        { display: "未完売あり", value: "hasunsold" },
        { display: "未完売あり、又は直近更新あり", value: "hasunsold+latest" },
        { display: "一部以上完売", value: "hassoldout" },
        { display: "一部以上完売、全完売なし", value: "hassoldoutnonfull" },
        // {"display": "Custom", "value": "selectmb"}
    ];

    let groupMethod = [
        { display: "期別分け", value: "gen" },
        { display: "選抜・アンダー・他", value: "group" },
        { display: "誕生年別", value: "dobyear" },
        { display: "完売・未完売", value: "soldstatus" },
        // {"display": "なし", "value": "none"},
    ];

    let sortMethod = [
        { display: "五十音順", value: "kana" },
        { display: "完売速度順", value: "numsold" },
    ];
</script>

<section class="optionForm" in:fade={{ duration: 500 }}>
    <div class="optionsContainer">
        <ul class="twocols">
            <li>
                <div class="leftcol">CD:</div>
                <div class="rightcol">
                    <SelectCDReception
                        {fulldata}
                        bind:selectedCDData
                        bind:selected={selectedIndex}
                        bind:atDraw={upToDraw}
                        on:change={chagneSelected}
                        {displayMethod}
                    />
                </div>
            </li>
            <li>
                <div class="leftcol">Group:</div>
                <div class="rightcol">
                    {#each groupMethod as grp}
                        <label>
                            <input
                                type="radio"
                                name="groupOpt"
                                bind:group={groupOpt}
                                id={grp.value}
                                value={grp.value}
                            />
                            {grp.display}
                        </label>
                    {/each}
                </div>
            </li>
            <li>
                <div class="leftcol">Filter:</div>
                <div class="rightcol">
                    {#each filterMethod as filt}
                        <label>
                            <input
                                type="radio"
                                name="filterOpt"
                                bind:group={filterOpt}
                                id={filt.value}
                                value={filt.value}
                            />
                            {filt.display}
                        </label>
                    {/each}
                </div>
            </li>
            <li>
                <div class="leftcol">Sort:</div>
                <div class="rightcol">
                    {#each sortMethod as sort}
                        <label>
                            <input
                                type="radio"
                                name="sortOpt"
                                bind:group={sortOpt}
                                id={sort.value}
                                value={sort.value}
                            />
                            {sort.display}
                        </label>
                    {/each}
                </div>
            </li>
        </ul>
    </div>
</section>

<style>
    @import "../style.css";

    .optionForm {
        width: max-content;
        margin: 0 auto;
        padding: 1px 5px;
        line-height: 3.5ch;
    }
</style>

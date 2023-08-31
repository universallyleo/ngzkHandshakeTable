<script>
    import DataRow from "$lib/DataRow.svelte";
    export let group;
    export let lastDraw;
    export let compare = null;
    export let capture;
    export let hideTable = false;
    export let blur = -1;
    /*
group: DataList
interface DataList {
    label: string, //what to display for the tag
    value: any,  //value for programming purpose (if there exists any)
    has: Array.<MemberInfo>
}
*/
    function taggingCellMOToggle(e) {
        e.target.classList.toggle("tagCellHover");
        //e.target.classList.add("tagCellHover");
    }
</script>

<tr class="taggedRow">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <td
        rowspan={group.has.length}
        class="tagCell"
        on:click|stopPropagation={taggingCellMOToggle}>{group.label}</td
    >
    <DataRow
        row={group.has[0]}
        {lastDraw}
        addClasses={group.has.length == 1 ? "topRow bottomRow" : "topRow"}
        {compare}
        {capture}
        {hideTable}
        {blur}
    />
</tr>
{#each group.has.slice(1, -1) as row (row.member)}
    <tr class="normalRow">
        <DataRow {row} {lastDraw} {compare} {capture} {hideTable} {blur} />
    </tr>
{/each}
{#if group.has.length > 1}
    <tr>
        <DataRow
            row={group.has[group.has.length - 1]}
            {lastDraw}
            addClasses="bottomRow"
            {compare}
            {capture}
            {hideTable}
            {blur}
        />
    </tr>
{/if}

<style>
    .tagCell {
        font-size: small;
        width: 25px;
        border: 1px solid black;
        padding-left: 2px;
        padding-right: 2px;
        text-align: center;
        background-color: white;
        overflow: clip;
        box-sizing: border-box;
    }

    :global(.tagCellHover) {
        /* need global to force svelte keep this style */
        background-color: hsl(291, 37%, 85%) !important;
        outline: 1px solid red;
    }

    tr {
        line-height: 1.8ch;
    }

    tr:hover {
        background-color: #ddd;
    }
</style>

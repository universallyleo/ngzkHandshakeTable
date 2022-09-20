<script>
let cdTypes = [
    {"display": "Single シングル", "value": "Single"},
    {"display": "Album アルバム", "value": "Album"},
    {"display": "Under Album アンダーアルバム", "value": "U.Album"},
    {"display": "Best Album ベストアルバム", "value": "Best"},
]

export let removeTypes;
</script>

<div class="twocols">
    <div class="leftcol"> 外す：</div>
    <div class="rightcol">
        {#each cdTypes as cdtype,i}
        {#if i%2==0 && i>0}<br>{/if}
        <label><input type="checkbox" name="removeTypes" bind:group={removeTypes} value={cdtype.value} checked>
        {cdtype.display}</label>    
        {/each}
    </div>
</div>

<style>
    
[type="checkbox"]
{
    vertical-align:middle;
}
label {
    margin-right: 2em;
}

.twocols {
    width: max-content;
    display: flex;
    justify-content: left;
    text-align: left;
    margin: 0;
    padding: 0;
    border: 1px solid #ddd;
    /*	background-color: hsl(40, 100%, 95%);*/
}

.twocols>div.leftcol {
    flex: none;
    margin: 0;
    width: 55px;
}
</style>
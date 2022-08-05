<script>	
import data from '$lib/data/data.json';
import {cdData} from '$lib/util.js';
import SlotTable from '$lib/SlotTable.svelte';
import { divide, min } from 'lodash-es';
//import OptionPanel from '$lib/OptionPanel.svelte';

let cdlist = data.map(x=> cdData(x.cd));
let selected = cdlist.length-1;

let filterMethod = [
    {"display": "全メンバー", "value": "showall"}, 
    {"display": "未完売部数あり", "value": "hasunsold"}, 
    {"display": "一部以上完売", "value": "hassoldout"}, 
    {"display": "一部以上完売、全完売なし", "value": "hassoldoutnonfull"}, 
    // {"display": "Custom", "value": "selectmb"}
];
let filterOpt="showall";

let groupMethod=[
    {"display": "期別分け", "value": "gen"},
    {"display": "選抜・アンダー・他", "value": "group"},
    {"display": "誕生年別", "value": "dob-year"},
    // {"display": "学年別 (to be corrected)", "value": "dob-year"},
    {"display": "完売・未完売", "value": "soldstatus"},
    // {"display": "なし", "value": "none"},
];
let groupOpt="gen";

let sortMethod = [
    {"display": "五十音順", "value": "kana"},
    {"display": "完売数順", "value": "numsold"},
    // {"display": "生年月日順", "value": "dob"}
];
let sortOpt="kana";
let compareCD=false;
let selected2 = -1;
let atdraw=-1;

function getCompare(){
    if (!compareCD) return null;
    // console.log("Compare CD=true");

    if (!isSelectedGood(selected2)) return null;
    // console.log("Selected2 is good");

    if (selected2 == selected) return null;
    // console.log("Selected!=Selected2");

    if (atdraw<0) return null;
    console.log("All OK!");

    console.log({"cdData": data[selected2], "atdraw": 2});
    return {"cdData": data[selected2], "atdraw": atdraw};
    // return {cdData: data[2], atdraw: 2};
}

function isSelectedGood(s){
    return s<0?false:s>=cdlist.length?false:true;
}

$: selectedCDdata = data[selected];
$: selectableDraw = isSelectedGood(selected2)?min([data[selected2].lastDraw, selectedCDdata.lastDraw]):0;
$: compare=getCompare();
$: if (!compareCD) {compare=null;}
</script>

<svelte:head>
    <title>乃木坂46インタラクティブ式完売表</title>
    <meta name="description" content="乃木坂46インタラクティブ式完売表" />
</svelte:head>

<div class="optionForm">
    <div class="optionsContainer">
        <ul class="twocols">
            <li>
                <div class="leftcol">CD:</div>
                <div class="rightcol"><select
                    id="cdSelect"
                    name="cd"
                    bind:value={selected}
                    on:change={()=>{compareCD=false; compare=null;}}
                    style="margin-left: 15px; margin-right: 15px"
                >
                {#each cdlist as cd,i}
                    <option value={i}>{cd.display}</option>
                {/each}
                </select>
                <!-- <button id="btnChange" on:click={changeCD}>
                    Change data
                </button> -->
                </div>
            </li>
            <li>
                <div class="leftcol">Group:</div>
                <div class="rightcol">{#each groupMethod as grp}
                    <label>
                        <input type="radio" name="groupOpt" bind:group={groupOpt} id={grp.value} value={grp.value}>
                        {grp.display}
                    </label>
                    {/each}</div>
            </li>
            <li>
                <div class="leftcol">Filter:</div>
                <div class="rightcol">{#each filterMethod as filt}
                    <label>
                        <input type="radio" name="filterOpt" bind:group={filterOpt} id={filt.value} value={filt.value}>
                        {filt.display}
                    </label>
                    {/each}</div>
            </li>
            <li>
                <div class="leftcol">Sort:</div>
                <div class="rightcol">{#each sortMethod as sort}
                    <label>
                        <input type="radio" name="sortOpt" bind:group={sortOpt} id={sort.value} value={sort.value}>
                        {sort.display}
                    </label>
                    {/each}		</div>
            </li>
        </ul>
    </div>
    <div class="advanceOption">
        <label>
            <input type="checkbox" name="compareCD" id="compareCD" bind:checked={compareCD}>
            過去の売り上げとの差
        </label>
        <span class:inactive={!compareCD}>
            <label for="cd2Select"> → 対象CD:</label>
            <select
                id="cd2Select"
                name="cd2"
                bind:value={selected2}
                style="margin-left: 5px; margin-right: 5px"
            >
            {#each cdlist as cd,i}
                {#if i!=selected}
                    <option value={i}>{cd.display}</option>
                {/if}
            {/each}
            </select>
            {#if isSelectedGood(selected2)}
                <select
                    id="drawSelect"
                    name="drawSelect"
                    bind:value={atdraw}
                    style="margin-left: 2px; margin-right: 2px"
                >
                {#each [...Array(selectableDraw).keys()]  as i}
                <option value={i+1}>{i+1}</option>
                {/each}
                </select><label for="drawSelect">次受付</label>
            {/if}
            {#if atdraw>0}
                <button on:click={()=>compare=getCompare()}>比べる</button>
            {/if}
        </span>
    </div>
</div>

<SlotTable data={selectedCDdata} {filterOpt} {groupOpt} {sortOpt} {compare}/>

<footer>
    Author: <a href="https://github.com/universallyleo">universallyleo</a>.  Soruce: <a href="https://github.com/universallyleo/ngzkMeetData">Github</a>	
</footer>

<style>
:root {
	font-family: Arial, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
		Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	--font-mono: 'Fira Mono', monospace;
	--pure-white: #ffffff;
	--primary-color: #b9c6d2;
	--secondary-color: #d0dde9;
	--tertiary-color: #edf0f8;
	--accent-color: #444444;
	--heading-color: rgba(0, 0, 0, 0.7);
	--text-color: #444444;
}

a {
	color: var(--accent-color);
	text-decoration: none;
}

a:hover {
	text-decoration: underline;
}

input,
button {
	font-size: inherit;
	font-family: inherit;
}

button:focus:not(:focus-visible) {
	outline: none;
}

.optionForm{
    width: max-content;
    margin: 0 auto;
    padding: 1px 5px;
    line-height: 3.5ch;
}

.optionsContainer{
    padding: 2px 6px;
    border: 1px solid black;
}

ul.twocols {
    display: inline-block;
    text-align: left;
    margin: 0;
    padding: 0;
    /*	background-color: hsl(40, 100%, 95%);*/
}

ul.twocols>li {
    margin: 15px 0 15px;
    display: flex;
    justify-content: left;
    margin: 0;
}

ul.twocols>li>div.leftcol {
    flex: none;
    margin: 0;
    width: 55px;
}

.advanceOption{
    padding: 2px 6px;
    border: 1px solid black;
}


.inactive{
    display:none;
}

footer{
    width:20%;
    margin: 20px auto;
    display: block;
    justify-content: center;
    align-items: center;
    padding: 40px;
    color: hsl(0, 0%, 65%);
}
</style>

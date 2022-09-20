<script>
import data from '$lib/data/data.json';
import {cdData} from '$lib/util.js';
import { min } from 'lodash-es';
import html2canvas from "html2canvas";
import SlotTable from '$lib/SlotTable.svelte';
import SelectOneCD from '$lib/SelectOneCD.svelte';
import { fly,fade } from 'svelte/transition';

let selected = 0;

let filterMethod = [
    {"display": "全メンバー", "value": "showall"}, 
    {"display": "未完売あり", "value": "hasunsold"}, 
    {"display": "未完売あり、又は直近更新あり", "value": "hasunsold+latest"}, 
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
let atdraw=-1;
let capture=false;
let selectedCD=data[data.length-1], compareToCDData, hideTable=false;

function exportImg(canvas){
    var link=document.createElement("a");
    document.body.appendChild(link);
    link.download = `${data[selected].cd.num}${data[selected].cd.type}-${data[selected].lastDraw}.jpg`;
    link.href = canvas.toDataURL();
    link.target = '_blank';
    link.click();
    capture=false;
}

function copyImg(canvas){
    canvas.toBlob(blob=> {
        navigator.clipboard.write([new ClipboardItem( {'image/png': blob} )])
    });
    alert("Table copied as image to clipboard");
    capture=false;
}

function imgOut(method){
    html2canvas(document.getElementById("slotstable"),{
        background:'#ffffff', 
        scale:2,  //needed to allow rendering 1px border of table
        //allowTaint: true, //needed in order to render css background (NAslots)
        //useCORS: true //needed in order to render css background (NAslots)
    }).then( method );
}

function getCompare(){
    if (!compareCD) return null;
    if (compareToCDData.cd === selectedCD.cd) return null;
    if (atdraw<0) return null;
    return {"cdData": compareToCDData, "atdraw": atdraw};
}

$: selectableDraw = compareToCDData?min([compareToCDData.lastDraw, selectedCD.lastDraw]):0
$: compare=getCompare();
$: if (!compareCD) {compare=null;compareToCDData=null;}
</script>

<svelte:head>
    <title>乃木坂46インタラクティブ式完売表</title>
    <meta name="description" content="乃木坂46インタラクティブ式完売表" />
</svelte:head>

<div class="optionForm" in:fade="{{duration: 500}}">
    <div class="optionsContainer">
        <ul class="twocols">
            <li>
                <div class="leftcol">CD:</div>
                <div class="rightcol">
                    <SelectOneCD bind:selectedCDData={selectedCD} />
                </div>
                
                <div class="print">
                    <button on:click={()=>imgOut(exportImg)}>画像輸出</button>
                    <button on:click={()=>imgOut(copyImg)} title="Does not work on Firefox unless ClipboardItem is enabled">画像コピー</button>
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
            過去との差
        </label>
        {#if compareCD}
        <div style="display:flex; flex-grow:1" in:fly="{{ x: 300, duration: 800 }}">
            → 
            <span style="margin-right:3px">対象:
                <SelectOneCD bind:selectedCDData={compareToCDData} exclude={selectedCD?[cdData(selectedCD.cd)]:[{value:-1}]}/>
            </span>
                <label>
                <select
                    id="drawSelect"
                    name="drawSelect"
                    bind:value={atdraw}
                    style="margin-left: 2px; margin-right: 2px"
                >
                {#each [...Array(selectableDraw).keys()].reverse()  as i}
                <option value={i+1}>{i+1}</option>
                {/each}
                </select>次受付</label>
            {#if atdraw>0}
                <div in:fly="{{ x: 300, duration: 800 }}" style="margin-left:auto;margin-right:2px;width:max-content;">
                <button on:click={()=>compare=getCompare()}>比べる</button>
                <label style="margin-left:auto;">
                    <input type="checkbox" name="hideTable" bind:checked={hideTable}>
                    完売表をかくす
                </label>
                </div>
            {/if}
        </div>
        {/if}
    </div>
</div>

<section id="slotstable" class="main" in:fly="{{ y: 200, duration: 500 }}">
<SlotTable data={selectedCD} {filterOpt} {groupOpt} {sortOpt} {compare} {capture} {hideTable}/>
</section>

<style>
input,
button {
	font-size: inherit;
	font-family: inherit;
    line-height:1.2;
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
    display: flex;
}

.main{
    margin: 0 auto;
    width: max-content;
    padding: 7px;
}

.print{
    margin-left: auto;
}
</style>

<script>
import RowGroups from "./RowGroups.svelte";
import DataRow from "./DataRow.svelte";
import {cdData, expandDataList, partitionToGroup, sortList, finalSoldoutDraw} from '$lib/util.js';
export let data;
//export let group="gen"; //allow: gen, dob-year, dob-month, bloodtype, from
export let filterOpt;
export let groupOpt;
export let sortOpt;
export let compare=null;
export let capture;
export let hideTable=false;

$: title = cdData(data.cd).display;
// array of {member, slotsSoldex: Array<Array<String>>, numSold: [int, int]}
$: expandedData = expandDataList(data);
$: finalTb = sortList(partitionToGroup(filterList(expandedData,filterOpt),groupOpt),sortOpt);
$: lastDraw = data.lastDraw;
$: totalSold = expandedData.reduce((prev,curr)=> { return {numSold: [prev.numSold[0]+curr.numSold[0], prev.numSold[1]+curr.numSold[1]]}; }).numSold;
$: capture = capture;
$: title2 = compare?cdData(compare.cdData.cd).display:"";
$: hideTable = compare?hideTable:false; //force table to be shown when not comparing
  // console.log(curr.numSold););
//$: console.log(expandData);
// $: numSlots = data.meetDates.length*5;
// $: w= 240+ numSlots*25 + (groupOpt!="none"?25:0);
// $: info = `Filter option is ${filterOpt}.  Width should be ${w}\n${compare?compare.atdraw:""}`;


/**
 * @param  {Array<Object>} list
 * @param  {string} option
 * list: same format as finalTb
 * filterOpt: showall, unsoldonly, selectmb (to add more later)
 */
function filterList(list, option=filterOpt) {
	switch(option){
		case "showall":
			return list;
		case "hasunsold":
      return list.filter(x=>x.numSold[0]<x.numSold[1]);
    case "hasunsold+latest":
      return list.filter(x=>x.numSold[0]<x.numSold[1] || finalSoldoutDraw(x)==lastDraw);
    case "hassoldout":
      return list.filter(x=>x.numSold[0]>0);
    case "hassoldoutnonfull":
      return list.filter(x=>x.numSold[0]>0 && x.numSold[0]<x.numSold[1]);
    case "selectmb":
      //TODO
      return list;
	}
}
</script>


<!-- not clear why width is not working.... -->
<!-- <table class="table-bordered" style:width={w}> -->
<div class="container">
<table class="table-bordered">
  <caption class="text-center">{title} (???????????????{lastDraw}?????????) 
    {#if compare}
      {#if hideTable} <br/> {/if}
      &nbsp;&nbsp;[ vs {title2} {compare.atdraw}????????? ]
    {/if}
  </caption>
  <thead>
    <tr>
      <!-- {#if groupOpt!="none"}
      <th>{groupOpt=="gen"?`??????`:""}</th>
      {/if} -->
      <th></th>
      <th><div class="soldFraction">{totalSold[0]}/{totalSold[1]}</div></th>
      {#if !hideTable}
        {#each data.meetDates as date}
            <th colspan="5">{date}</th><!--calculate weekday-->
        {/each}
      {/if}
      {#if compare}
        <th>???????????????</th>
      {/if}
    </tr>
  </thead>
  <tbody>
    {#if groupOpt=="none"}
      <!-- TODO: Something is strange, fix it -->
      {#each data.table as row}
      <tr><DataRow {row} {lastDraw} {compare} {capture}/></tr>
      {/each}
    {:else}
      {#each finalTb as rowGp}
        <RowGroups group={rowGp} {lastDraw} {compare} {capture} {hideTable}/>
      {/each} 
    {/if}
  </tbody>
</table>
</div>
<!-- <br><br>
<div class="debugBox">{info}</div> -->



<style>
/* .debugBox{
  font-size: 2ch;
  width: 800px;
  height: 200px;
  border: 2px solid black;
  margin-top: 1ch; 
}*/
.table-bordered {
  table-layout: fixed;
  border: 1px solid #ddd !important;
  border-spacing: 0!important;
  border-collapse: collapse;
  display: block;
  overflow-x: auto;
  overflow-y: hidden;
}

.container{
  /* margin: 0 auto;*/
  width: max-content;
  /*padding: 7px;*/
}

table caption {
  font-size: large;
  font-weight: bold;
	padding: .5em 0;
}

th {
  font-size: large;
  font-weight: bold;
  border: 1px solid black;
  border-bottom: 2px solid black;
  padding: 0;
}

@media screen and (max-width: 767px) {
  table caption {
    display: none;
  }
}

.soldFraction{
    display:inline;
    float: right;
    margin-right: 3px;
    font-size:small;
    font-weight:normal;
    color: #777;
}
</style>
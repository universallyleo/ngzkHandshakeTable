<script>	
import data from '$lib/data/data.json';
import membersdata from '$lib/data/members.json';
import {cdData, involvedMembers, performedInCDs} from '$lib/util.js';
import {find,remove,uniq} from 'lodash-es';
import { fly } from 'svelte/transition';
import ProgressTable from '$lib/ProgressTable.svelte';
import StateButton from '$lib/StateButton.svelte';

let seriesTypes = [
    {"display": "個別円盤の各受付完売数推移", "value": "cdProgression"}, 
    //{"display": "総完売数推移 (To be implemented)", "value": "overallProgression"}, 
    //{"display": "N次受付の完売数推移 (To be implemented)", "value": "receptionProgression"}, 
];
let fixTypes = [
    {"display": "円盤", "value": "fixCD"}, 
    {"display": "メンバー", "value": "fixMember"}, 
];
let seriesOpt = "cdProgression";
let fixOpt = "fixCD";

let allcds = [{num: 30, type: 'Single'}, {num: 29, type: 'Single'}, {num: 28, type: 'Single'}];

let members = ["Yumiki Nao", "Kanagawa Saya", "Sato Kaede"];
let includings = allcds.map( y => find(data, (x)=>x.cd.num==y.num && x.cd.type==y.type));
let cdlist = data.map(x=> cdData(x.cd)).reverse();

let selAllMBLabel = "全員選択";
let selectGrouping = [];
let selectedCD=0;
let selectedMembers=[];
let selectables=involvedMembers(data[cdlist.length-1-selectedCD]);

let selectedCDs=[];
let fixingMember="Yumiki Nao";

$: {
    if (fixOpt=="fixCD"){
        selectables = involvedMembers(data[cdlist.length-1-selectedCD]);
        selectGrouping = uniq(selectables.map(x=>x.gen)).sort((a,b)=> parseInt(a)-parseInt(b)).map(n=>{
            return { "gen": n,
                "labels": [`全${n}期生選ぶ`, `全${n}期生外す`],
                "consistsOf": selectables.filter(x=>x.gen==n)};
        });
        // selectGroupStatus = selectGrouping.map(x => {return {"gen": x.gen, ""}})
    }
    if (fixOpt=="fixMember"){
        selectables = performedInCDs(fixingMember).map(x=>cdData(x)).reverse();
    }
}

function toggleSelectGroup(group,txt){
    let gp = selectGrouping.find( x=> x.gen==parseInt(group) );
    if (txt.match(/選ぶ$/)){
        for (let x of gp.consistsOf){
            if (!selectedMembers.find(y=>x.member==y.member)){
                selectedMembers.push(x.member);
            }
        }
    } else {
        gp.consistsOf.map( x => remove(selectedMembers, y=>y==x.member) );
    }
    selectedMembers = selectedMembers;
}

function toggleSelAllMembers(){ //TODO: replace with StateButton
    [selAllMBLabel,selectedMembers] = selectedMembers.length > 1
        ?["全員選ぶ", []]
        :["全員外す", selectables.map(x=>x.member)];
}


function processData(){
    if (fixOpt == "fixCD"){
        members = selectedMembers;
        includings = [data[cdlist.length-1-selectedCD]];
    }
    if (fixOpt == "fixMember"){
        members = [fixingMember];
        includings = selectedCDs.map( y => find(data, (x)=>cdData(x.cd).value==y));
    }
}
</script>

<svelte:head>
    <title>乃木坂46完売データ推移</title>
    <meta name="description" content="乃木坂46完売データ推移" />
</svelte:head>

<div class="optionsContainer">
    <ul class="twocols">
        <li>
            <div class="leftcol">系列構成:</div>
            <div class="rightcol">{#each seriesTypes as ser}
                <label>
                    <input type="radio" name="seriesOpt" bind:group={seriesOpt} id={ser.value} value={ser.value}>
                    {ser.display}
                </label>
                {/each}
                <!-- DEBUG: {fixOpt} -->
            </div>
        </li>
        <li>
            <div class="leftcol">固定対象:</div>
            <div class="rightcol">
            {#each fixTypes as ft}
                <label>
                    <input type="radio" name="fixOpt" bind:group={fixOpt} id={ft.value} value={ft.value}>
                    {ft.display}
                </label>
            {/each}                    
            {#if fixOpt=="fixCD"} <!-- TODO: Rewrite as a separate component -->
                <div in:fly="{{ x: 200, duration: 1000 }}">
                    <select id="cdSelect"
                        name="cd"
                        bind:value={selectedCD}>
                    {#each cdlist as cd,i}
                        <option value={i}>{cd.display}</option>
                    {/each}
                    </select>
                    {#if selectables.length>1}
                        <button on:click={toggleSelAllMembers}>{selAllMBLabel}</button> <span class="weaker">18個以下を選択することを推奨します</span> <br>
                    {/if} 
                    <br/>
                    <div class="memberGrouping">
                    {#each selectGrouping as mbgroup}
                        <div class="groupList">
                        <StateButton states={mbgroup.labels}  on:changeFrom={(ev)=>toggleSelectGroup(mbgroup.gen,ev.detail.text)}/>
                        {#each mbgroup.consistsOf as itm}
                            <label>
                            <input type="checkbox" name="selectedMembers" bind:group={selectedMembers} value={itm.member}>
                            {itm.kanji}</label>
                        {/each}
                        </div>
                    {/each}
                    </div>                    
                </div>    
            {/if}
            {#if fixOpt=="fixMember"}
            <div in:fly="{{ x: 200, duration: 1000 }}">
                <select id="mbSelect"
                    name="mbSelect"
                    bind:value={fixingMember}>
                {#each membersdata as mb}
                    <option value={mb.member}>{mb.kanji}</option>
                {/each}
                </select>
                <div class="cdList">
                {#each selectables as cd}
                    <label>
                    <input type="checkbox" name="selectedCDs" bind:group={selectedCDs} value={cd.value}>
                    {cd.display}</label>
                {/each}
                </div>
            </div>
            {/if}
            </div>
            <div class="print">
                <button on:click={processData}>グラフ作成する</button>
            </div>
        </li>
    </ul>
</div>

<ProgressTable {members} {includings}/>


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

.optionsContainer{
    width: max-content;
    margin: 10px 1ch;
    padding: 2px 6px;
    border: 1px solid black;
    display: flex;
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
    width: max-content;
}
/* 
.subOptions{
    padding: 2px 6px;
    border: 1px solid black;
} */

.weaker{
    font-size: small;
    color: hsl(0, 0%, 60%);
}

.print{
    /* margin-left: auto; */
    margin-left: 20px;
    height: 100%;
    margin-top: auto;
    margin-bottom: 5px;
}

[type="checkbox"]
{
    vertical-align:middle;
}
.memberGrouping{
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: repeat(auto-fill,auto);
    grid-column-gap: 1.5em;
}
.groupList{
    display:flex;
    flex-direction: column;
}

.cdList{
    margin-top: 1.2ch;
    display: grid;
    grid-auto-flow: column;
    grid-column-gap: 1.5em;
    grid-template-rows: repeat(10,auto);
}

</style>
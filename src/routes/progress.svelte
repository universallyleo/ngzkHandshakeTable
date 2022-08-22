<script>	
import data from '$lib/data/data.json';
import membersdata from '$lib/data/members.json';
import {cdData, involvedMembers, performedInCDs, getNumSold} from '$lib/util.js';
import {find,union} from 'lodash-es';
import { fly } from 'svelte/transition';
import ProgressTable from '$lib/ProgressTable.svelte';
//import StateButton from '$lib/StateButton.svelte';
import SelectMembersPanel from '$lib/SelectMembersPanel.svelte';

let seriesTypes = [
    {"display": "個別円盤の各受付完売数推移", "value": "cdProgression"}, 
    {"display": "個別メンバーの総完売数推移", "value": "overallProgression"}, 
    //{"display": "N次受付の完売数推移 (To be implemented)", "value": "receptionProgression"}, 
];
let fixTypes = [
    {"display": "円盤", "value": "fixCD"}, 
    {"display": "メンバー", "value": "fixMember"}, 
];
let seriesOpt = "cdProgression";
let fixOpt = "fixCD";
let mode = "fixCD";

let cdlist = data.map(x=> cdData(x.cd)).reverse();
let members = ["Yumiki Nao", "Kanagawa Saya", "Sato Kaede"];
let includings = [data[cdlist.length-1]];

//let selAllMBLabel = "全員選択";
let selectedCD=0;
let selectedMembers=members;
let selectables=involvedMembers(data[cdlist.length-1-selectedCD]);

let selectedCDs=[];
let fixingMember="Yumiki Nao";

$: {
    if (seriesOpt == "cdProgression"){
        if (fixOpt=="fixCD"){
            selectables = involvedMembers(data[cdlist.length-1-selectedCD]);
        }
        if (fixOpt=="fixMember"){
            selectables = performedInCDs(fixingMember).map(x=>cdData(x)).reverse();
        }
    }
    if (seriesOpt == "overallProgression"){
        selectables = union(data.map(x=>involvedMembers(x)).flat());
    }
}

function findStartingCD(memberNameList){
    for (let i=0; i<data.length; i++){
        let found = false;
        for (let mb of memberNameList){
            found ||= !!data[i].table.find((x)=>x.member==mb);
        }
        if (found) return i;
    }
    return data.length; //everyone in list not in any CD, something is strange
}

function processData(){
    if (seriesOpt == "cdProgression"){
        if (fixOpt == "fixCD"){
            members = selectedMembers;
            includings = [data[cdlist.length-1-selectedCD]];
            mode = fixOpt;
        }
        if (fixOpt == "fixMember"){
            members = [fixingMember];
            includings = selectedCDs.map( y => find(data, (x)=>cdData(x.cd).value==y));
            mode = fixOpt;
        }
    }
    if (seriesOpt == "overallProgression"){
        //should produce error if all MB not in any recorded cd; but this should not happen
        includings = data.slice(findStartingCD(selectedMembers));  
        members = selectedMembers;
        mode="overallProgression";
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
            </div>
        </li>
        <li>
            <div class="leftcol">固定対象:</div>
            <div class="rightcol">
            {#if seriesOpt=="cdProgression"}  
                {#each fixTypes as ft}
                <label>
                    <input type="radio" name="fixOpt" bind:group={fixOpt} id={ft.value} value={ft.value}>
                    {ft.display}
                </label>
                {/each}                  
                {#if fixOpt=="fixCD"} 
                <div in:fly="{{ x: 200, duration: 1000 }}">
                    <select id="cdSelect"
                        name="cd"
                        bind:value={selectedCD}>
                    {#each cdlist as cd,i}
                        <option value={i}>{cd.display}</option>
                    {/each}
                    </select>
                    <SelectMembersPanel bind:selectedMembers={selectedMembers} {selectables} />
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
            {/if}
            {#if seriesOpt=="overallProgression"}
            <SelectMembersPanel bind:selectedMembers={selectedMembers} {selectables} />
            {/if}
        </li>
        <li>
            <div class="print">
                <button on:click={processData}>グラフ作成する</button>
            </div>
        </li>
    </ul>
</div>

<ProgressTable {mode} {members} {includings}/>

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

.print{
    margin-left: auto;
    margin-top: 1ch;
    margin-bottom: 5px;
}

[type="checkbox"]
{
    vertical-align:middle;
}

.cdList{
    margin-top: 1.2ch;
    display: grid;
    grid-auto-flow: column;
    grid-column-gap: 1.5em;
    grid-template-rows: repeat(10,auto);
}

</style>
<script>
import {remove,uniq,} from 'lodash-es';
import StateButton from '$lib/StateButton.svelte';

export let selectables;
export let selectedMembers;

$: selectGrouping = uniq(selectables.map(x=>x.gen)).sort((a,b)=> parseInt(a)-parseInt(b)).map(n=>{
                return { "gen": n,
                    "labels": [`全${n}期生選ぶ`, `全${n}期生外す`],
                    "consistsOf": selectables.filter(x=>x.gen==n)};
            });

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
    selectedMembers = selectedMembers; // force svelte update the array
}

const toggleSelectAll = (txt) => selectedMembers = txt.match(/選ぶ$/)?selectables.map(x=>x.member):[];
</script>

{#if selectables.length>1}
<StateButton states={["全員選ぶ", "全員外す"]} on:changeFrom={(ev)=>toggleSelectAll(ev.detail.text)}/>
<span class="weaker">18個以下を選択することを推奨します</span> <br>
{/if}
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


<style>
.weaker{
    font-size: small;
    color: hsl(0, 0%, 60%);
}
[type="checkbox"]
{
    vertical-align:middle;
}
.memberGrouping{
    margin-top: 1ch;
    margin-right: 2em;
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: repeat(auto-fill,auto);
    grid-column-gap: 1.5em;
}
.groupList{
    display:flex;
    flex-direction: column;
}
</style>
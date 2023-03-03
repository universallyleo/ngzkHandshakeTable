<script>
    // import fulldata from '$lib/data/data.json';
    // import membersdata from '$lib/data/members.json';
    import SelectMembersPanel from '$lib/SelectMembersPanel.svelte';
    import DOBInfo from './DOBInfo.svelte';
    import {getMember,getAllMembers} from '$lib/processData.js';
    import {ordering} from '$lib/processData.js';
    import {bdayToGakunen, sortGakunen} from '$lib/util.js';
    import {groupBy} from 'lodash-es';
    //import { fly,fade } from 'svelte/transition';
    //let temp = [ getMember('Yumiki Nao'), getMember('Sato Kaede') ];
    let selectables = getAllMembers();
    let selectedMembers=[];
    let sorted=[];

    function sortyear(){
        let mbdata = selectedMembers.map(x=>{
            let y=getMember(x);
            y["yr"] = bdayToGakunen(y["dob"]);
            return y;
        });
        let yrGroupsArr = Object.entries(groupBy(mbdata, ({yr})=>yr )).sort((a,b)=>sortGakunen(a[0],b[0]));
        // each item in array is of the form [ "yy/YY", [{mbdata1}, {mbdata2}, ...] ]
        sorted = yrGroupsArr.map(x=>[x[0], x[1].sort((a,b)=>ordering.ISODateAscend(a["dob"],b["dob"]))]);        
    }
</script>

<svelte:head>
    <title>乃木坂46 ー 誕生日・学年データ</title>
    <meta name="description" content="乃木坂46誕生日・学年データ" />
</svelte:head>

<SelectMembersPanel bind:selectedMembers={selectedMembers} {selectables} nolimit={true}/>
<div style="width: 50%; margin: 1ch auto 5px auto;">
    <button on:click={sortyear} class="print">生成</button>
</div>
<div class="timeline">
    {#each sorted as yrgroup}
    <div class="yrgroup">
        <div class="yrCell">
        <div>{yrgroup[0]}</div>
        </div>
        <div class="yrgrouplist">
            {#each yrgroup[1] as memberData}
            <DOBInfo {memberData}></DOBInfo>
            <!-- <div>
            {mb["kanji"]} <br> ({JPDateDisplay(mb["dob"].slice(5))})
            </div> -->
            {/each}
        </div>
    </div>
    {/each}
</div>

<style>
.yrgroup{
    border:1px solid #999;
    display:grid;
    grid-auto-flow: column;
    grid-template-columns: max-content auto;
    grid-gap: 5px;
    height: fit-content;
    padding: 5px;
}
.yrCell{
    border-right:1px solid black; 
    align-self:center;
    justify-self:center;
    height: 100%;
    display: grid;
}
.yrCell > div{
    padding: 5px;
    align-self:center;
}
.yrgrouplist{
    display:grid;
    grid-template-columns: repeat(4,max-content);
    grid-template-rows: repeat(auto-fit, 1fr);
    justify-items: center;
    grid-gap: 4px;
}
/* .yrgrouplist div{
    display:block;
    width:100%;
    text-align: center;
    border: 1px solid #BBB;
} */
.timeline{
    /* width: 1060px; */
    width: max-content;
    display:flex;
    flex-direction: column;
}
.print{
    display: flex;
    justify-content: center;
    align-items: center;
}
button.print::before,
button.print::after {
    flex: auto;
    min-width: 50px;
    height: 1px;
    display: block;
    content: "";
    background-color: black;
}
button.print::before {
    margin-right: 25px;
}
button.print::after {
    margin-left: 25px;
}
</style>
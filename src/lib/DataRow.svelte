<script>
import {getMember,compareData} from '$lib/util.js';
import {find, slice} from 'lodash-es';
import Index from '../routes/index.svelte';
export let row;
export let lastDraw;
export let addClasses="";
export let compare=null;
export let capture;

$: mbInfo = getMember(row.member);
//$: splitTbl = row.slotsSold.map(x=>x.split("|"));

const decoratedItem = (c)=>{
    if (c=="x") return {content: "x", classes: "NAslot"};
    if (c!="?" && lastDraw==parseInt(c)) return {content: c, classes: "slot lastDrawSlot"}; 
    if (c!="?" && parseInt(c)>0 && parseInt(c)<lastDraw) return {content: c, classes: "slot soldSlot"};
    //if (lastDraw-1>0 && lastDraw-1==parseInt(c)) return {content: c, classes: "slot lastlastDrawSlot"}; 
    return {content: c, classes: "slot"};
};

$: decoratedTbl = row.slotsSoldex.map( dayslots => {
    let res=[];
    for (let s of dayslots) { 
        let itm = decoratedItem(s);
        //itm.classes += i==0?" firstcell":i==dayslots.length-1?" lastcell":"";
        //itm.classes += i==dayslots.length-1?" lastcell":"";
        itm.classes += ` ${addClasses}`;
        res.push(itm); 
    }
    return res;
});

$: classesOnMbCell = `memberName ${addClasses}`;
$: compareCellClasses = `compareCell lastcell ${addClasses}`;
$: compareOutput = compare!=null?compareData(row,find(compare.cdData.table, ['member',row.member]),compare.atdraw):null;
</script>


<td class={classesOnMbCell}>{mbInfo.kanji}
    <div class="soldFraction">{row.numSold[0]}/{row.numSold[1]}</div>
</td>

<!-- TODO: look up member info to determine display method -->
{#each decoratedTbl as daySlots}
    {#each daySlots as slot,i (i)}
    <!-- border-left with 1px is not renderable...... so just handle last cell is enough -->   
    <td class={slot.classes} class:lastcell={i==daySlots.length-1}>
        {#if slot.content != "x"} {slot.content} {:else if capture}x{/if}
        </td>
    {/each}
{/each}
{#if compare}
    <td class={compareCellClasses}>
        <div class="compareGrid">
            <div>{compareOutput.prev}
                {#if compareOutput.extraprev}
                    <br/>{compareOutput.extraprev}
                {/if}
            </div>
            <div>→</div>
            <div>{compareOutput.curr}
                {#if compareOutput.extracurr}
                    <br/>{compareOutput.extracurr}
                {/if}
            </div>
            <div class:plusCell={compareOutput.diff[0]==="+"} class:minusCell={compareOutput.diff[0]==="-"}>
                {#if compareOutput.diff!='0'}
                    <span class="color:black">[ </span>
                    {compareOutput.diff}
                    <span class="color:black"> ]</span>
                {/if}
                {#if compareOutput.extradiff}
                    <br/>{compareOutput.extradiff}
                {/if}
            </div>
        </div>
    </td>
{/if}

<style>
.soldFraction{
    display:inline;
    float: right;
    color: #777;
}
.memberName{
    width: 240px;
    max-width: 300px;
    padding-left: .4em;
    padding-right: .2em;
    border-right: 1px solid black;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    /* box-sizing: border-box; */
    /* display: inline-block; */
}
.NAslot{
    width: 26px;
    height: 1.8ch;
    padding: 0;
    box-sizing: border-box;
    border: 1px solid #ddd;
    /* All of below shows what I want (a cross spanning the whole cell), but none will work correctly with html2canvas even with allowTaint and useCORS..... */
    background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' preserveAspectRatio='none' viewBox='0 0 100 100'><line x1='0' y1='0' x2='100' y2='100' stroke='black' vector-effect='non-scaling-stroke'/><line x1='0' y1='100' x2='100' y2='0' stroke='black' vector-effect='non-scaling-stroke'/></svg>");
    /* background: url("$lib/cross.svg"); */
    /* background: linear-gradient(to top left,
             rgba(0,0,0,0) 0%,
             rgba(0,0,0,0) calc(50% - 0.8px),
             rgba(0,0,0,1) 50%,
             rgba(0,0,0,0) calc(50% + 0.8px),
             rgba(0,0,0,0) 100%),
         linear-gradient(to top right,
             rgba(0,0,0,0) 0%,
             rgba(0,0,0,0) calc(50% - 0.8px),
             rgba(0,0,0,1) 50%,
             rgba(0,0,0,0) calc(50% + 0.8px),
             rgba(0,0,0,0) 100%); */
    background-color: hsl(0, 0%, 80%);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 1.75ch;
    text-align: center;
}


.slot{
    width: 26px;
    height: 1.8ch;
    padding: 0;
    overflow:clip;
    box-sizing: border-box;
    border: 1px solid #ddd;
    text-align: center;
}
.lastDrawSlot{
    background-color: yellow;
}
.soldSlot{
    background-color: hsl(211, 62%, 80%);
}
.lastcell{
    border-right: 1px solid black !important;
}
/* .firstcell{
    border-left: 1px solid black !important;
} */
.topRow{
    border-top: 1px solid black !important;
}
.bottomRow{
    border-bottom: 1px solid black !important;
}
.compareCell{
    border: 1px solid #ddd;
    text-align: center;
}

.compareGrid{
    width: 167px;
    min-height: 100%;
    height: 100%;
    margin:0;
    display: grid;
    gap: 0;
    grid-template-columns: 50px 12px 50px 55px;
    grid-template-rows: 100%;
    justify-items: center;
    align-items: stretch;
    align-content: stretch;
}

.plusCell{
    color: hsl(120, 100%, 40%);
}
.minusCell{
    color: red;
}
</style>
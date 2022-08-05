<script>
import {getMember} from '$lib/memberInfo.js';
export let row;
export let lastDraw;
export let addClasses="";
export let compare=null;

$: mbInfo = getMember(row.member);
//$: splitTbl = row.slotsSold.map(x=>x.split("|"));

const decoratedItem = (c)=>{
    if (c=="x") return {content: "", classes: "NAslot"};
    if (lastDraw==parseInt(c)) return {content: c, classes: "slot lastDrawSlot"}; 
    if (lastDraw-1>0 && lastDraw-1==parseInt(c)) return {content: c, classes: "slot lastlastDrawSlot"}; 
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
</script>


<td class={classesOnMbCell}>{mbInfo.kanji}
    <div class="soldFraction">{row.numSold[0]}/{row.numSold[1]}</div>
</td>

<!-- TODO: look up member info to determine display method -->
{#each decoratedTbl as daySlots}
    {#each daySlots as slot,i (i)}
    <!-- border-left with 1px is not renderable...... so just handle last cell is enough -->   
    <td class={slot.classes} class:lastcell={i==daySlots.length-1}>{slot.content}</td>
    {/each}
{/each}
{#if compare}
    <td class={compareCellClasses}>
        <div class="compareGrid">
            <div>{row.compare.lasttime}</div>
            <div>→</div>
            <div>{row.compare.current}</div>
            <div class:plusCell={row.compare.diff[0]==="+"} class:minusCell={row.compare.diff[0]==="-"}>
                {#if row.compare.diff==`完売`}
                    [完売]
                {:else if row.compare.diff!=0}
                    <span class="color:black">[ </span>
                    {row.compare.diff}
                    <span class="color:black"> ]</span>
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
    background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' preserveAspectRatio='none' viewBox='0 0 100 100'><line x1='0' y1='0' x2='100' y2='100' stroke='black' vector-effect='non-scaling-stroke'/><line x1='0' y1='100' x2='100' y2='0' stroke='black' vector-effect='non-scaling-stroke'/></svg>");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 1.75ch;
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
.lastlastDrawSlot{
    background-color: hsl(86, 80%, 50%);
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
}

.compareGrid{
    width: 125px;
    min-height: 100%;
    height: 100%;
    margin:0;
    display: grid;
    gap: 0;
    grid-template-columns: 35px 12px 30px 48px;
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
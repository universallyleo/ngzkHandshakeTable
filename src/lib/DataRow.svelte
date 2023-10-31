<script>
    import { getMember, compareData } from "$lib/processData.js";
    import "balloon-css/balloon.min.css";
    import { find } from "lodash-es";
    export let row;
    export let lastDraw;
    export let addClasses = "";
    export let compare = null;
    export let capture;
    export let hideTable;
    export let blur = -1;

    $: mbInfo = getMember(row.member);
    //$: splitTbl = row.slotsSold.map(x=>x.split("|"));

    const decoratedItem = (c, alpha = false) => {
        if (c == "x")
            return {
                content: "x",
                classes: `NAslotBase NAslot${alpha ? "Opaq" : ""}`,
            };
        if (c == "?")
            return {
                content: "?",
                classes: `slot unconfirmedSlot${alpha ? "Opaq" : ""}`,
            };
        if (c != "?" && lastDraw == parseInt(c))
            return { content: c, classes: "slot lastDrawSlot" };
        if (c != "?" && parseInt(c) > 0 && parseInt(c) < lastDraw)
            return {
                content: c,
                classes: `slot soldSlot${alpha ? "Opaq" : ""}`,
            };
        //if (lastDraw-1>0 && lastDraw-1==parseInt(c)) return {content: c, classes: "slot lastlastDrawSlot"};
        return { content: c, classes: "slot" };
    };

    const bdayText = (bdayMeet) => {
        return `誕生:${bdayMeet.bday.slice(0, 2)}月${bdayMeet.bday.slice(
            3
        )}日 → ${bdayMeet.meetDate}`;
    };

    $: decoratedTbl = row.slotsSoldex.map((dayslots, i) => {
        let res = [];
        for (let s of dayslots) {
            let itm = decoratedItem(s, i < blur);
            //itm.classes += i==0?" firstcell":i==dayslots.length-1?" lastcell":"";
            //itm.classes += i==dayslots.length-1?" lastcell":"";
            itm.classes += ` ${addClasses}`;
            res.push(itm);
        }
        return res;
    });

    $: classesOnMbCell = `memberName ${addClasses}`;
    $: compareCellClasses = `compareCell lastcell ${addClasses}`;
    $: compareOutput =
        compare != null
            ? compareData(
                  row,
                  find(compare.cdData.table, ["member", row.member]),
                  compare.atdraw
              )
            : null;
</script>

<td class={classesOnMbCell}
    >{mbInfo.kanji}
    {#if row.bdayMeet != 0}
        <div
            aria-label={bdayText(row.bdayMeet)}
            data-balloon-pos="up-left"
            class="bdayMark"
        >
            [誕]
        </div>
    {/if}
    <div class="soldFraction">{row.numSold[0]}/{row.numSold[1]}</div>
</td>

<!-- TODO: look up member info to determine display method -->
{#if !hideTable}
    {#each decoratedTbl as daySlots}
        {#each daySlots as slot, i (i)}
            <!-- border-left with 1px is not renderable...... so just handle last cell is enough -->
            <td class={slot.classes} class:lastcell={i == daySlots.length - 1}>
                {#if slot.content != "x"}
                    {slot.content}
                {:else if capture}x{/if}
            </td>
        {/each}
    {/each}
{/if}
{#if compare}
    <td class={compareCellClasses}>
        <div class="compareGrid">
            <div>
                {compareOutput.prev}
                {#if compareOutput.extraprev}
                    <br />{compareOutput.extraprev}
                {/if}
            </div>
            <div>→</div>
            <div>
                {compareOutput.curr}
                {#if compareOutput.extracurr}
                    <br />{compareOutput.extracurr}
                {/if}
            </div>
            <div
                class:plusCell={compareOutput.diff[0] === "+"}
                class:minusCell={compareOutput.diff[0] === "-"}
            >
                {#if compareOutput.diff != "0"}
                    <span class="color:black">[ </span>
                    {compareOutput.diff}
                    <span class="color:black"> ]</span>
                {/if}
                {#if compareOutput.extradiff}
                    <br />{compareOutput.extradiff}
                {/if}
            </div>
        </div>
    </td>
{/if}

<style>
    :root {
        --balloon-color: #777;
        --balloon-font-size: 11pt;
    }

    .bdayMark {
        display: inline-block;
        position: relative;
        transform: translate(0, -3px);
        border-bottom: 1px dotted #666;
        text-align: left;
        color: #777;
        font-size: 11px;
        line-height: 11px;
        margin: 0;
        cursor: pointer;
    }
    .soldFraction {
        display: inline;
        float: right;
        color: #777;
    }
    .memberName {
        width: 240px;
        max-width: 300px;
        padding-left: 0.4em;
        padding-right: 0.2em;
        border-right: 1px solid black;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        /* box-sizing: border-box; */
        /* display: inline-block; */
    }
    .NAslotBase {
        width: 26px;
        height: 1.8ch;
        padding: 0;
        box-sizing: border-box;
        border: 1px solid #ddd;
        text-align: center;
    }
    .NAslot {
        /* All of below shows what I want (a cross spanning the whole cell), but none will work correctly with html2canvas even with allowTaint and useCORS..... */
        background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' preserveAspectRatio='none' viewBox='0 0 100 100'><line x1='0' y1='0' x2='100' y2='100' stroke='black' vector-effect='non-scaling-stroke'/><line x1='0' y1='100' x2='100' y2='0' stroke='black' vector-effect='non-scaling-stroke'/></svg>");
        background-color: hsl(0, 0%, 80%);
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 100% 1.75ch;
    }
    .NAslotOpaq {
        background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' preserveAspectRatio='none' viewBox='0 0 100 100' opacity='0.5'><line x1='0' y1='0' x2='100' y2='100' stroke='black' vector-effect='non-scaling-stroke'/><line x1='0' y1='100' x2='100' y2='0' stroke='black' vector-effect='non-scaling-stroke'/></svg>");
        background-color: hsla(0, 0%, 80%, 0.5);
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 100% 1.75ch;
    }

    .slot {
        width: 26px;
        height: 1.8ch;
        padding: 0;
        overflow: clip;
        box-sizing: border-box;
        border: 1px solid #ddd;
        text-align: center;
        z-index: 0;
    }
    .lastDrawSlot {
        background-color: yellow;
    }
    .soldSlot {
        background-color: hsl(211, 62%, 80%);
    }
    .soldSlotOpaq {
        background-color: hsla(211, 63%, 80%, 0.5);
        color: rgba(0, 0, 0, 0.5);
    }
    .unconfirmedSlot {
        background-color: hsl(0, 0%, 80%);
    }
    .unconfirmedSlotOpaq {
        background-color: hsla(0, 0%, 80%, 0.5);
        color: rgba(0, 0, 0, 0.5);
    }
    /* cannot use this because opacity destroy z-index
    .blur {
        opacity: 0.6;
        z-index: 0;
    } */
    .lastcell {
        border-right: 1px solid black !important;
    }
    /* .firstcell{
    border-left: 1px solid black !important;
} */
    .topRow {
        border-top: 1px solid black !important;
    }
    .bottomRow {
        border-bottom: 1px solid black !important;
    }
    .compareCell {
        border: 1px solid #ddd;
        text-align: center;
    }
    .compareGrid {
        width: 180px;
        min-height: 100%;
        height: 100%;
        margin: 0;
        display: grid;
        gap: 0;
        grid-template-columns: 55px 12px 55px 60px;
        grid-template-rows: 100%;
        justify-items: center;
        align-items: stretch;
        align-content: stretch;
    }

    .plusCell {
        color: hsl(120, 100%, 40%);
    }
    .minusCell {
        color: red;
    }
</style>

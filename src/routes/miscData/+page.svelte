<script>
    import salesData from "$lib/data/sales_data.json";
    import { cdAlias } from "$lib/processData.js";
    import { numberWithCommas } from "$lib/util.js";
    import { zip } from "lodash-es";

    let mx = salesData.map((x) => [
        cdAlias(x.cd).display,
        x.cd.shortTitle,
        x.cd.release,
        ...x.sales.daily,
        x.sales.daily.reduce((prev, curr) => prev + curr),
        x.sales.bi.soku,
        x.sales.weekOne,
        x.sales.bi.weekOne,
        x.sales.accumulate,
        x.sales.bi.accumulate,
    ]);
    mx = [
        [
            "",
            "",
            "発売日",
            "初日",
            "二日目",
            "三日目",
            "四日目",
            "五日目",
            "六日目",
            "合計",
            "BiB速報",
            "オリ初週",
            "BiB初週",
            "オリ累計",
            "BiB累計",
        ],
        ...mx,
    ];
    let transposed = zip(...mx);
    let types = transposed[0];
    let aliases = transposed[1];
    let dates = transposed[2];
    let sales = transposed.slice(3);
    // console.log(transposed);
</script>

<div class="main">
    <h3>Sales Data</h3>
    <table class="table-bordered">
        <thead>
            <tr>
                {#each types as cdtype}
                    <th>{cdtype}</th>
                {/each}
            </tr>
            <tr>
                {#each aliases as name}
                    <th>{name}</th>
                {/each}
            </tr>
            <tr>
                {#each dates as date}
                    <th>{date}</th>
                {/each}
            </tr>
        </thead>
        <tbody>
            {#each sales as row}
                <tr>
                    {#each row as item}
                        <td>{numberWithCommas(item)}</td>
                    {/each}
                </tr>
            {/each}
        </tbody>
    </table>

    <div style="margin-top:2ch; text-align:end;">
        Last updated: {salesData.slice(-1)[0].updated}
    </div>
</div>

<style>
    .main {
        margin: 0 auto;
        width: max-content;
        padding: 2em;
    }
    .table-bordered {
        table-layout: fixed;
        border: 1px solid #ddd !important;
        border-spacing: 0 !important;
        border-collapse: collapse;
        display: block;
        overflow-x: auto;
        overflow-y: hidden;
    }

    th {
        /* font-size: large; */
        font-weight: bold;
        border: 1px solid black;
        border-bottom: 2px solid black;
        padding-left: 5px;
        padding-right: 5px;
    }

    tr:hover {
        background-color: #eee;
    }

    tbody > tr > td {
        padding: 4px;
        text-align: end;
    }

    tbody > tr:nth-child(6),
    tbody > tr:nth-child(8),
    tbody > tr:nth-child(10) {
        border-bottom: 1px dashed black;
    }

    tbody > tr > td:nth-child(1) {
        padding: 1px 5px;
        border-right: 1px solid black;
    }

    tbody > tr > td:not(:nth-child(1)) {
        font-family: "Courier New", Courier, monospace;
        font-size: large;
    }
</style>

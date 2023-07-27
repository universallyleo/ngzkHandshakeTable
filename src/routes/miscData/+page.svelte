<script>
    import salesData from "$lib/data/sales_data.json";
    import { cdAlias } from "$lib/processData.js";
    import { zip } from "lodash-es";

    let mx = salesData.map((x) => [
        cdAlias(x.cd).display,
        x.cd.release,
        ...x.sales.daily,
        x.sales.weekOne,
        x.sales.accumulate,
    ]);
    mx = [
        [
            "",
            "発売日",
            "初日",
            "二日目",
            "三日目",
            "四日目",
            "五日目",
            "六日目",
            "初週",
            "累計",
        ],
        ...mx,
    ];
    let transposed = zip(...mx);
    let aliases = transposed[0];
    let dates = transposed[1];
    let sales = transposed.slice(2);
    // console.log(transposed);
</script>

<h3>Sales Data</h3>
<table class="table-bordered">
    <thead>
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
                    <td>{item}</td>
                {/each}
            </tr>
        {/each}
    </tbody>
</table>

<style>
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
        font-size: large;
        font-weight: bold;
        border: 1px solid black;
        border-bottom: 2px solid black;
        padding: 2px;
    }

    tbody > tr > td {
        text-align: end;
    }
</style>

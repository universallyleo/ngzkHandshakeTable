<script>
    export let from="2014";
    export let date;
    let year;
    let month;

    // **** gen selectable years
    let years = [new Date().getFullYear()];
    let y=years[0]-1;
    while (y>=parseInt(from)){years.push(y);y--;}

    $: date = `${year}${month}`;
</script>
<select name="year" bind:value={year}>
    {#each years as yr}
    <option value={yr}>{yr}</option>
    {/each}
    <!-- <option value="2023">2023</option>
    <option value="2022">2022</option>
    <option value="2021">2021</option>
    <option value="2020">2020</option>
    <option value="2019">2019</option>
    <option value="2018">2018</option>
    <option value="2017">2017</option>
    <option value="2016">2016</option>
    <option value="2015">2015</option>
    <option value="2014">2014</option> -->
</select>
<select name="month" bind:value={month}>
    <option value="01">1</option>
    <option value="02">2</option>
    <option value="03">3</option>
    <option value="04">4</option>
    <option value="05">5</option>
    <option value="06">6</option>
    <option value="07">7</option>
    <option value="08">8</option>
    <option value="09">9</option>
    <option value="10">10</option>
    <option value="11">11</option>
    <option value="12">12</option>
</select>
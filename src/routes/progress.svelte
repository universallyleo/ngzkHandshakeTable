<script>	
import data from '$lib/data/data.json';
import {find} from 'lodash-es';
import ProgressTable from '$lib/ProgressTable.svelte';

let cds = [{num: 30, type: 'Single'}, {num: 29, type: 'Single'}, {num: 28, type: 'Single'}];

let includings = cds.map( y => find(data, (x)=>x.cd.num==y.num && x.cd.type==y.type));
</script>

<ProgressTable member="Sato Kaede" {includings}/>
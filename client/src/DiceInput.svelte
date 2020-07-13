<script>
    import { modValidator } from './validators.js';
    export let dice = [
    {id:0, label:"D4", range:4, qty:0, result:0},
    {id:1, label:"D6", range:6, qty:0, result:0},
    {id:2, label:"D8", range:8, qty:0, result:0},
    {id:3, label:"D10", range:10, qty:0, result:0},
    {id:4, label:"D12", range:12, qty:0, result:0},
    {id:5, label:"D20", range:20, qty:0, result:0},
    {id:6, label:"D100", range:100, qty:0, result:0},
    ]
    export let modifier = '';


    function randomInt(dieid, qty){
        let range = dice[dieid]['range'];
        let res = 0;
        if (qty > 0){
        for (let index = 0; index < qty; index++) {
            let r = Math.random() * 100;
            let mod = range/100;
            let d = Math.round(r*mod);
            res = res + d;
           
        }
        }
        modifier = res;
        console.log("modifier",modifier);
        return res;

    }

let latestroll = 0;

</script>

{#each dice as die}
<label>
	{die.label} <input type=number bind:value={die.qty} min=0 max=20>
</label>
{/each}
<label>
	Mod <input pattern="[+-]*[0-9]{1,3}" title="(+/-)# please" size=5 type=text bind:value={modifier}> {modValidator(modifier)}

</label>

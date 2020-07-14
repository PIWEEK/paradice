<script>
  import { modValidator } from './validators.js';

  import { writable } from "svelte/store";

  export let dice = [
    { id: 0, label: "D4", range: 4, qty: parseInt(localStorage.getItem("D4")) || 0, result: 0 },
    { id: 1, label: "D6", range: 6, qty: parseInt(localStorage.getItem("D6")) || 0, result: 0 },
    { id: 2, label: "D8", range: 8, qty: parseInt(localStorage.getItem("D8")) || 0, result: 0 },
    { id: 3, label: "D10", range: 10, qty: parseInt(localStorage.getItem("D10")) || 0, result: 0 },
    { id: 4, label: "D12", range: 12, qty: parseInt(localStorage.getItem("D12")) || 0, result: 0 },
    { id: 5, label: "D20", range: 20, qty: parseInt(localStorage.getItem("D20")) || 0, result: 0 },
    { id: 6, label: "D100", range: 100, qty: parseInt(localStorage.getItem("D100")) || 0, result: 0 },
  ]
  export let modifier = '';

  $: {
    dice.forEach((d) => {
      localStorage.setItem(d.label, d.qty);
    })
  }

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
    return res;
  }

  let latestroll = 0;

</script>

<style>

.test {
  color: white;
}
</style>


{#each dice as die}
<label class="test">
	{die.label} <input type=number bind:value={die.qty} min=0 max=20>
</label>
{/each}
<label class="test">
	Mod <input pattern="[+-]*[0-9]{1,3}" title="(+/-)# please" size=5 type=text bind:value={modifier}> {modValidator(modifier)}

</label>

<script>
  import { modValidator } from './validators.js';
  import { writable } from "svelte/store";

  export let dice = [
    { id: 0, label: "D4", range: 4, qty: parseInt(localStorage.getItem("D4")) || 0, factor: 1, mod: 5, result: 0 },
    { id: 1, label: "D6", range: 6, qty: parseInt(localStorage.getItem("D6")) || 0, factor: 1, mod: 7, result: 0 },
    { id: 2, label: "D8", range: 8, qty: parseInt(localStorage.getItem("D8")) || 0, factor: 1, mod: 9, result: 0 },
    { id: 3, label: "D10", range: 10, qty: parseInt(localStorage.getItem("D10")) || 0, factor: 1, mod: 11, result: 0 },
    { id: 4, label: "D12", range: 12, qty: parseInt(localStorage.getItem("D12")) || 0, factor: 1, mod: 13, result: 0 },
    { id: 5, label: "D20", range: 20, qty: parseInt(localStorage.getItem("D20")) || 0, factor: 1, mod: 21, result: 0 },
    { id: 6, label: "D100", range: 10, qty: parseInt(localStorage.getItem("D100")) || 0, factor: 10, mod: 100, result: 0 },
  ]
  export let modifier = localStorage.getItem("modifier") || '';
  export let wipe = true;

  $: {
    dice.forEach((d) => {
      localStorage.setItem(d.label, d.qty);
    });
    localStorage.setItem("modifier", modifier);
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

  .sidebar-item {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  h2 {
    font-size: 1.2rem;
    margin-bottom: .8rem;
    margin-top: 0;
  }

  .dice-input {
    align-items: center;
    display: flex;
    margin-bottom: .5rem;
  }

  .dice-input span {
    font-size: .8rem;
    width: 32px;
  }

  .dice-input input {
    border-color: #CDB4CF;
    color: #CF4AD9;
    font-size: .9rem;
    margin-bottom: 0;
    padding: .3rem .5rem;
    width: 57px;
  }

  .input-checkbox {
    cursor: pointer;
    font-size: .9rem;
    margin-top: .5rem;
  }

</style>

<div class="sidebar-item">
  <h2>Select your dice!</h2>
  {#each dice as die}
  <label class="dice-input">
    <span>{die.label}</span>
    <input type=number bind:value={die.qty} min=0 max=20 size=4>
  </label>
  {/each}
  <label class="dice-input">
    <span>MOD</span>
    <input pattern="[+-]*[0-9]{1,3}" title="(+/-)# please" size=5 type=text bind:value={modifier}>
  </label>
  <label class="input-checkbox">
	  <input type=checkbox bind:checked={wipe}>
	    Wipe table?
  </label>
</div>


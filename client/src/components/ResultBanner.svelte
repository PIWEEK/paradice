<script>
  export let player = null;
  export let latestRoll = null;
  import DiceResult from './DiceResult.svelte';

  function singleDieMod(die, mod, factor){
    return die*factor+mod;
  }

  let splitResult = "";
  $: {
    let result = [];
    latestRoll && latestRoll.dice
      .filter(element => element.qty > 0)
      .forEach(element => {
        console.log("-->",element);


        result.push(`${element.label}[${element.result.map(e => e*element.factor  + latestRoll.modifier).join(',')}]`);

});
    splitResult = result.join(' ');
  }
</script>

<style>

.roll-result {
  background-color: rgba(55, 27, 62, 0.8);
  padding: 0.6rem 1rem;
  color: #CF4AD9;
  position: fixed;
  font-size: 1.6rem;
  left: 46%;
  top: 1.6rem;
  z-index: 1000;
}

.roll-result span {
  color: #ffffff;
  margin-left: .6rem;
}

.roll-result span.maths {
  color: rgba(255,255,255,.5);
}

</style>

{#if (player)}

  <div class="roll-result">
    {player.username} got
    <span>
    {#if latestRoll.split}
      {splitResult}
    {:else}
      {latestRoll.result}
    {/if}
    </span>
    <span class="maths"><DiceResult bind:roll={latestRoll}/></span>
  </div>
{/if}
<script>
  import { DICE_TEXTURES } from '../constants';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  let selectedDice = localStorage.getItem("dicetexture");
  let selectedSetimg = localStorage.getItem("dicesetimg");
  if (!selectedDice) {
    setDiceImage(DICE_TEXTURES[0].path, DICE_TEXTURES[0].setimg);
  }

  function setDiceImage(path, setimg) {
    selectedDice = path;
    selectedSetimg = setimg;
    localStorage.setItem("dicetexture", path);
    localStorage.setItem("dicesetimg", setimg);

		dispatch('diceTextureSelected', {
      dicetexture: path,
      dicesetimg: setimg
		});
  }
</script>

<style>
  .row-flex {
    margin-bottom: 1rem;
  }
  .selectedtexture {
    border: 0.1em solid #371B3E;
    border-radius: 50%;
    cursor: pointer;
    height: 40px;
    flex-shrink: 0;
    margin: 0 .2rem;
    padding: 0.1em;
    width: 40px;
  }

  .texturesample {
    border: 0.1em solid #CDB4CF;
    border-radius: 50%;
    cursor: pointer;
    height: 30px;
    flex-shrink: 0;
    margin: 0 .2rem;
    padding: 0.1em;
    width: 30px;
  }

  .texturesample:hover {
    border-color:#CF4AD9 ;
  }

  .dice-set-img {
    height: 90px;
    margin-bottom: 1rem;
    max-width: 80%;
    width: 350px;
  }
</style>

<div class="row-flex">
  {#each DICE_TEXTURES as { id, path, setimg }, i}
  {#if path == selectedDice}
  <img on:click|preventDefault={() => setDiceImage(path, setimg)} class="selectedtexture"  src="{path}" alt="{id}"/>
  {:else}
  <img on:click|preventDefault={() => setDiceImage(path, setimg)} class="texturesample"  src="{path}" alt="{id}"/>
  {/if}
  {/each}
</div>

<img class="dice-set-img" src={selectedSetimg} alt="Dice set">
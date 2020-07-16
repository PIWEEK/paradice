<script>
  import { TABLE_TEXTURES, DICE_TEXTURES } from '../constants';

  let username = localStorage.getItem("username");
  if (!username) {
    username = "Your name";
  }

  $: {
    localStorage.setItem("username", username);
  }

  let selectedTable = localStorage.getItem("tabletexture");
  if (!selectedTable) {
    setTableImage(TABLE_TEXTURES[0].path);
  }
  let selectedDice = localStorage.getItem("dicetexture");
  if (!selectedDice) {
    setDiceImage(DICE_TEXTURES[0].path);
  }

  function setTableImage(path) {
    selectedTable = path;
    localStorage.setItem("tabletexture", path);
  }

  function setDiceImage(path) {
    selectedDice = path;
    localStorage.setItem("dicetexture", path);
  }
</script>

<style>
  h1 {
    margin-top: 0;
  }

  .logo-small {
    display: flex;
    max-width: 330px;
    margin: 1rem auto .5rem;
    width: 100%;
  }

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


<img class="logo-small" src="/images/logo-small.png" alt="PARADICE" border="0">
<div class="content-center">

  <h1>You're the Host!</h1>
  <label>YOUR NAME</label>
  <input class="input-center" type=text bind:value={username} max=40>

  <p>Table Skin</p>

  <div class="row-flex">
    {#each TABLE_TEXTURES as { id, path }, i}
    {#if path == selectedTable}
    <img on:click|preventDefault={() => setTableImage(path)} class="selectedtexture"  src="{path}" alt="{id}"/>
    {:else}
    <img on:click|preventDefault={() => setTableImage(path)} class="texturesample"  src="{path}" alt="{id}"/>
    {/if}
    {/each}
  </div>

  <p>Dice Skin</p>

  <div class="row-flex">
    {#each DICE_TEXTURES as { id, path }, i}
    {#if path == selectedDice}
    <img on:click|preventDefault={() => setDiceImage(path)} class="selectedtexture"  src="{path}" alt="{id}"/>
    {:else}
    <img on:click|preventDefault={() => setDiceImage(path)} class="texturesample"  src="{path}" alt="{id}"/>
    {/if}
    {/each}
  </div>

  <img class="dice-set-img" src="/dice/img/set-00.jpg" alt="Dice set">


  <a class="btn-primary" href="/#/game/paradice-testing-game">Start Playing</a>
</div>

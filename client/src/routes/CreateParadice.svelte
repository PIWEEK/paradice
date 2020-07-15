<script>
  let username = localStorage.getItem("username");
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let tabletextures = [
    { id: 0, name: "Skin #1", path: 'table/img/table00.jpg', color:"#761CEC", selected:true},
    { id: 1, name: "Skin #2", path: 'table/img/table01.jpg', color:"#FC8EAC", selected:false},
    { id: 2, name: "Skin #3", path: 'table/img/table02.jpg', color:"#A60570", selected:false},
    { id: 3, name: "Skin #4", path: 'table/img/table03.jpg', color:"#A60570", selected:false},
    { id: 4, name: "Skin #5", path: 'table/img/table04.jpg', color:"#000000", selected:false},
  ];

  let dicetextures = [
    { id: 0, name: "Dice #1", path: 'dice/img/dice00.jpg', color:"#761CEC", selected:true},
    { id: 1, name: "Dice #2", path: 'dice/img/dice01.jpg', color:"#FC8EAC", selected:false},
    { id: 2, name: "Dice #3", path: 'dice/img/dice02.jpg', color:"#A60570", selected:false},
  ];


  let selectedtable = 0;
  let selecteddice = 0;

  localStorage.setItem("dicetexture", dicetextures[selecteddice]['path']);
  localStorage.setItem("tabletexture", tabletextures[selectedtable]['path']);

  let textureindex = 2;
  let text = "Game table selected by default";

  export let selectedImage = tabletextures[selectedtable]['path'];
  export const selectedDiceImage = dicetextures[selecteddice]['path'];

  export let matchingcolor;

  function setTableImage(i) {
    selectedImage = tabletextures[i]['path'];
    matchingcolor = tabletextures[i]['color'];
    tabletextures[selectedtable].selected = false;
    tabletextures[i].selected = true;
    selectedtable = i;

    localStorage.setItem("tabletexture", tabletextures[i]['path']);
  }

  function setDiceImage(i) {
    selectedImage = dicetextures[i]['path'];
    matchingcolor = dicetextures[i]['color'];
    dicetextures[selecteddice].selected = false;
    dicetextures[i].selected = true;
    selecteddice = i;

    localStorage.setItem("dicetexture", dicetextures[i]['path']);
  }
</script>

<style>
  h1 {
    margin-top: 0;
  }

  .logo-small {
    display: flex;
    max-width: 330px;
    margin: 2rem auto;
    width: 100%;
  }

  .row-flex {
    margin-bottom: 2rem;
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

</style>


<img class="logo-small" src="/images/logo-small.png" alt="PARADICE" border="0">
<div class="content-center">

  <h1>You're the Host!</h1>
  <label>YOUR NAME</label>
  <input class="input-center" type=text bind:value={username} max=40>

  <p>Table Skin</p>

  <div class="row-flex">
    {#each tabletextures as { id, path, selected }, i}
    {#if selected}
    <img on:click|preventDefault={() => setTableImage(i)} class="selectedtexture"  src="{path}" alt="{id}"/>
    {:else}
    <img on:click|preventDefault={() => setTableImage(i)} class="texturesample"  src="{path}" alt="{id}"/>
    {/if}
    {/each}
  </div>

  <p>Dice Skin</p>

  <div class="row-flex">
    {#each dicetextures as { id, path, selected }, i}
    {#if selected}
    <img on:click|preventDefault={() => setDiceImage(i)} class="selectedtexture"  src="{path}" alt="{id}"/>
    {:else}
    <img on:click|preventDefault={() => setDiceImage(i)} class="texturesample"  src="{path}" alt="{id}"/>
    {/if}
    {/each}
  </div>

  <a class="btn-primary" href="/#/game/paradice-testing-game">Start Playing</a>
</div>

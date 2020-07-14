
<script>
  let username = localStorage.getItem("username");
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let tabletextures = [
    { id: 0, name: "Tavern #1", path: 'table/img/table00.jpg', color:"#761CEC", selected:true},
    { id: 1, name: "Tavern #2", path: 'table/img/table01.jpg', color:"#FC8EAC", selected:false},
    { id: 2, name: "Tavern #3", path: 'table/img/table02.jpg', color:"#A60570", selected:false},
  ];

  let dicetextures = [
    { id: 0, name: "Tavern #1", path: 'table/img/table00.jpg', color:"#761CEC", selected:true},
    { id: 1, name: "Tavern #2", path: 'table/img/table01.jpg', color:"#FC8EAC", selected:false},
    { id: 2, name: "Tavern #3", path: 'table/img/table02.jpg', color:"#A60570", selected:false},
  ];


  let selectedtable = 0;
  let selecteddice = 0;

  localStorage.setItem("dicetexture", dicetextures[selecteddice]['path']);
  localStorage.setItem("tabletexture", tabletextures[selectedtable]['path']);

  let textureindex = 2;
  let text = "Game table selected by default";

  export let selectedImage = tabletextures[selectedtable]['path'];
  export let selectedDiceImage = dicetextures[selecteddice]['path'];

  export let matchingcolor;

  function setTableImage(i) {
    selectedImage = tabletextures[i]['path'];
    matchingcolor = tabletextures[i]['color'];
    tabletextures[selectedtable].selected = false;
    tabletextures[i].selected = true;
    selectedtable = i;

		dispatch('textureSelected', {
			path: tabletextures[i]['path']
        });
    localStorage.setItem("tabletexture", tabletextures[i]['path']);
  }

  function setDiceImage(i) {
    selectedImage = dicetextures[i]['path'];
    matchingcolor = dicetextures[i]['color'];
    dicetextures[selecteddice].selected = false;
    dicetextures[i].selected = true;
    selecteddice = i;

		dispatch('textureDiceSelected', {
			path: dicetextures[i]['path']
        });
     localStorage.setItem("dicetexture", dicetextures[i]['path']);
  }
</script>

<style>
img {
    padding: 0.5em;
    border: 0.1em solid aquamarine;

}

.selectedtabletexture {
    padding: 0.1em;
    border-radius: 50%;
    width: 20px;
    border: 0.1em solid red;

}

.texturetablesample {
  padding: 0.1em;
  border-radius: 50%;
  width: 20px;
}


.selecteddicetexture {
    padding: 0.1em;
    border-radius: 50%;
    width: 20px;
    border: 0.1em solid red;

}

.texturedicesample {
  padding: 0.1em;
  border-radius: 50%;
  width: 20px;
}

</style>


<h1>You're the Host!</h1>
<label class="hostsname">
	<input type=text bind:value={username} max=40>
</label>

<p>Table Skin</p>

{#each tabletextures as { id, path, selected }, i}
{#if selected}
<img on:click|preventDefault={() => setTableImage(i)} class="selectedtabletexture"  src="{path}" alt="{id}"/>
{:else}
<img on:click|preventDefault={() => setTableImage(i)} class="texturetablesample"  src="{path}" alt="{id}"/>
{/if}
{/each}

<p>Dice Skin</p>

{#each dicetextures as { id, path, selected }, i}
{#if selected}
<img on:click|preventDefault={() => setDiceImage(i)} class="selecteddicetexture"  src="{path}" alt="{id}"/>
{:else}
<img on:click|preventDefault={() => setDiceImage(i)} class="texturedicesample"  src="{path}" alt="{id}"/>
{/if}
{/each}


<br/><br/><br/><br/>
<a class="btn-primary" href="/#/game/paradice-testing-game">Start Playing</a>

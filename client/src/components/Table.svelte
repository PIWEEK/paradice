<script>
	import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let tabletextures = [
    { id: 0, name: "Skin #1", path: 'table/img/table00.jpg', repeats: 5, color: "#761CEC", soundpath: 'table/snd/table00.mp3'},
  { id: 1, name: "Skin #2", path: 'table/img/table01.jpg', repeats: 5, color: "#FC8EAC", soundpath: 'table/snd/table01.mp3'},
  { id: 2, name: "Skin #3", path: 'table/img/table02.jpg', repeats: 5, color: "#A60570", soundpath: 'table/snd/table02.mp3'},
  { id: 3, name: "Skin #4", path: 'table/img/table03.jpg', repeats: 5, color: "#A60570", soundpath: 'table/snd/table03.mp3'},
  { id: 4, name: "Skin #5", path: 'table/img/table04.jpg', repeats: 5, color: "#000000", soundpath: 'table/snd/table04.mp3'},
  { id: 5, name: "Skin #6", path: 'table/img/table05.jpg', repeats: 5, color: "#000000", soundpath: 'table/snd/table05.mp3'},
  { id: 6, name: "Skin #7", path: 'table/img/table06.jpg', repeats: 1, color: "#000000", soundpath: 'table/snd/table01.mp3'},
  ];


  let selected = 0;
  let textureindex = 2;
  let text = "Game table selected by default";

  export let selectedImage = tabletextures[textureindex]['path'];
  export let matchingcolor;

  function setImage(i) {
    selectedImage = tabletextures[i]['path'];
    text = "You chose "+tabletextures[i]['name'];
    matchingcolor = tabletextures[i]['color'];
    tabletextures[selected].selected = false;
    tabletextures[i].selected = true;
    selected = i;

		dispatch('textureSelected', {
      path: tabletextures[i]['path'],
		});
  }

</script>

<style>
img {
    padding: 0.5em;
    border: 0.1em solid aquamarine;

}

.selectedtexture {
    padding: 0.5em;
    border-radius: 10%;
    width: 100px;
    border: 0.1em solid red;

}

.texturesample {
  padding: 0.5em;
  border-radius: 10%;
  width: 100px;
}

</style>

<h1>Choose your game table texture</h1>

{#each tabletextures as { id, path, selected }, i}
{#if selected}
<img on:click|preventDefault={() => setImage(i)} class="selectedtexture"  src="{path}" alt="{id}"/>
{:else}
<img on:click|preventDefault={() => setImage(i)} class="texturesample"  src="{path}" alt="{id}"/>
{/if}
{/each}


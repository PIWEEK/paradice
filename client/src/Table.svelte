<script>

    let tabletextures = [
		{ id: 0, name: "Tavern #1", path: 'table/img/table00.jpg', color:"#761CEC", selected:true},
		{ id: 1, name: "Tavern #2", path: 'table/img/table01.jpg', color:"#FC8EAC", selected:false},
		{ id: 2, name: "Tavern #3", path: 'table/img/table02.jpg', color:"#A60570", selected:false},
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


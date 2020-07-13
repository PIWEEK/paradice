<script>

    let tabletextures = [
		{ id: 0, name: "Tavern #1", path: 'table/img/table00.jpg'},
		{ id: 1, name: "Tavern #2", path: 'table/img/table01.jpg'},
		{ id: 2, name: "Tavern #3", path: 'table/img/table02.jpg'},
    ];
    
    let textureindex = 2; 
    let selectedImage = tabletextures[textureindex]['path'];
    let text = "Game table selected by default";

    function setImage(i) {
        selectedImage = tabletextures[i]['path'];
        text = "You chose "+tabletextures[i]['name'];
    }

</script>

<style>
img {
    padding: 0.5em;
}
</style>

<h1>Choose your game table texture</h1>

{#each tabletextures as { id, path }, i}
<img on:click|preventDefault={() => setImage(i)} width="100px" src="{path}" alt="{id}"/>
{/each}
<br/>
<img src="{selectedImage}" alt="Table texture #1"/>
<p>{text}</p>


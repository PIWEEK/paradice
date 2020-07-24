<script>
  import { TABLE_TEXTURES } from '../constants';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let selectedTable = localStorage.getItem("tabletexture");
  if (!selectedTable) {
    setTableImage(TABLE_TEXTURES[0].path,TABLE_TEXTURES[0].repeats);
  }

  function setTableImage(path) {
    selectedTable = path;
    let repeats = TABLE_TEXTURES[5].repeats;
    localStorage.setItem("tabletexture", path);
    localStorage.setItem("repeats", repeats);

    console.log("DISPATCH tableTextureSelected")
    dispatch('tableTextureSelected', {
      tabletexture: path,
      repeats: repeats
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

  @media (max-width: 480px) {
    .row-flex {
      flex-wrap: wrap;
      text-align: center;
      justify-content: center;
      margin-bottom: 0;
    }

    .selectedtexture {
      height: 30px;
      width: 30px;
    }

    .texturesample {
      height: 20px;
      width: 20px;
    }
  }
</style>

<div class="row-flex">
  {#each TABLE_TEXTURES as { id, path }, i}
  {#if path == selectedTable}
  <img on:click|preventDefault={() => setTableImage(path)} class="selectedtexture"  src="{path}" alt="{id}"/>
  {:else}
  <img on:click|preventDefault={() => setTableImage(path)} class="texturesample"  src="{path}" alt="{id}"/>
  {/if}
  {/each}
</div>
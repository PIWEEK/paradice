<script>
	import CopyClipBoard from './CopyClipBoard.svelte';

  export let game = "No name?";

  const shareUrl = `${window.location.origin}/#/create?game=${game}`;

  let showShareUrl = false;

  function toggleShowShareUrl() {
    showShareUrl = !showShareUrl;
  }

  function copy() {
		const app = new CopyClipBoard({
			target: document.getElementById('clipboard'),
			props: { shareUrl },
		});
		app.$destroy();
  }

</script>
<style>
  h2 {
    font-size: 1.2rem;
    margin: 0;
    white-space: nowrap;
  }

  .row-flex {
    align-items: center;
    justify-content: space-between;
    margin-bottom: .5rem;
    width: 100%;
  }

  .copy-link {
    background-color: #371B3E;
    cursor: pointer;
    display: flex;
    height: 16px;
    padding: .2rem .3rem;
    width: 16px;
  }

  .copy-link:hover {
    background-color: #CF4AD9;
  }

  .copy-link img {
    width: 100%;
  }

  .input-url {
    border-color: #CDB4CF;
    color: #CF4AD9;
    font-size: .8rem;
    margin-right: .6rem;
    width: 140px;
  }

  .btn-primary {
    box-shadow: 0px 0px 0px 3px #371B3E;
    font-size: .9rem;
    padding: .1rem .6rem;
  }

</style>

<div class="row-flex">
  <h2>{game}</h2>
  <span class="copy-link">
    <img  value="HEY!" src="/images/share-table.png" alt="SHARE TABLE" on:click={toggleShowShareUrl}>
  </span>
</div>
{#if showShareUrl}
<div class="row-flex">
  <input class="input-url" value="{shareUrl}">
  <button class="btn-primary" on:click={copy}>Copy</button>
</div>
{/if}
<div id="clipboard"></div>

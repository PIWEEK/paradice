<script>
export let playername = '';
export let latestroll = 0;
</script>
<p>Soy ResultBanner</p>
{#if playername!=''}
<p>Player {playername} got {latestroll}</p>
{/if}
<script>

    export let latestrolls = [];
    let username = localStorage.getItem("username");

</script>

<style>

</style>

<p>Soy LatestRolls</p>
<ul>
{#each latestrolls as lr}
{#if lr==username}
    <li>{lr} (You)</li>
{:else}
    <li>{lr}</li>

{/if}
{/each}
</ul>
<script>

    export let playername = 'Anonymous player';
    export let latestroll = 0;

</script>

<style>

.playername {

    background-color: rgb(172, 100, 190);
    border: 1em;
    padding: 0.2em;
}

</style>

<h2 class="playername">Welcome {playername}!</h2>
<p class="latestroll">Your latest roll was: {latestroll}</p>
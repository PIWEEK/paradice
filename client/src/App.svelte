<style>
	#ThreeJS {
    position: absolute;
    left: 0px;
    top: 0px;
	}
  #foreground {
    z-index: 1000;
    position: absolute;
    left: 0px;
    top: 0px;
  }
  .test {
  color: white;
}
</style>

<script>
	import { onMount } from 'svelte';
  import io from 'socket.io-client';
  import Table from './Table.svelte';
  import Player from './Player.svelte';
  import DiceInput from './DiceInput.svelte';
  import Roll, { initRollDice, rollDice, changeTexture } from './Roll.svelte';

  const apiURL = API_URL || "https://guarded-stream-90676.herokuapp.com";
  const username = prompt("Please enter your user name", "");
  //const username = "p";

  const socket = io(apiURL + "/?username=" + username);
  let userDict = {};
  let userList = [];
  let rolls = [];
  let mylatestroll = 0;
  let diceinput;
  let modinput;
  $: diceandmodinput = {dice: diceinput, mod: modinput};
  let floorcolor = "#00aa00";
  let texturepath;

  onMount(()=> {
    initRollDice();
  });

  function roll() {
  	socket.emit("roll");
  }

  // listen for roll event
  socket.on("roll", (userId, result) => {
    console.log("received roll", userId, result);
    rollDice(result);
	  if (userDict[userId]==username){
		  mylatestroll = result;
	  }
    rolls = [{
      user: userDict[userId],
      result: result
    }, ...rolls];
    console.log(rolls);
  });

  // listen for user list event
  socket.on("users-list", (data) => {
    console.log("received users-list", data);
    userDict = data;
    userList = Object.values(data);
  });

</script>

<Roll/>

<div id="foreground">
  <Player playername={username} latestroll={mylatestroll}/>

  <h2>Rollers</h2>
  <ul>
    {#each userList as user, i}
      <li>
        {user}
      </li>
    {/each}
  </ul>

  <button on:click={roll}>Roll dice</button>

  <h2>Rolls</h2>
  <ul>
    {#each rolls as {user, result}, i}
      <li>
        {user}: {result}
      </li>
    {/each}
  </ul>

  <Table bind:selectedImage={texturepath}/>
  <br/>
  <button on:click={changeTexture(texturepath)}>
    Click to change texture
  </button>
  <DiceInput bind:dice={diceinput} bind:modifier={modinput}/>
  <h3 class="test">Objeto diceandmodinput en App para poder pasar a roll en algún momento</h3>
  <p class="test">{JSON.stringify(diceandmodinput, null, 2)}</p>

</div>

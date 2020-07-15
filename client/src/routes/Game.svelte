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
  import Table from '../Table.svelte';
  import Player from '../Player.svelte';
  import DiceInput from '../DiceInput.svelte';
  import Roll, { initRollDice, rollDice, changeTexture } from '../Roll.svelte';
  import ParadiceLogo from '../ParadiceLogo.svelte';
  import LatestRolls from '../LatestRolls.svelte';
  import RollLog from '../RollLog.svelte';
  import RollDice from '../RollDice.svelte';
 

  export let params = {};

  const apiURL = API_URL || "https://guarded-stream-90676.herokuapp.com";

  let username = localStorage.getItem("username");
  if (!username) {
    username = prompt("Please enter your user name", "");
    localStorage.setItem("username", username);
  }

  let dicetexture = localStorage.getItem("dicetexture");
  let tabletexture = localStorage.getItem("tabletexture");
  

  const socket = io(`${apiURL}/?username=${username}&game=${  params.gameId}`);

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
    changeTexture(tabletexture);

  });

  function roll() {
    socket.emit("roll", diceandmodinput);
    new Audio('sounds/dice.mp3').play()
  }

  function handleTextureUpdated(event) {
    changeTexture(event.detail.path);
  }

  // listen for roll event
  socket.on("roll", (userId, diceInput) => {
    rollDice(diceInput);
	  if (userDict[userId]==username){
		  mylatestroll = diceInput.result;
	  }
    rolls = [{
      user: userDict[userId],
      result: diceInput.result
    }, ...rolls];
  });

  // listen for user list event
  socket.on("users-list", (data) => {
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

  <ParadiceLogo/>
<LatestRolls/>
<RollLog/>
  <DiceInput bind:dice={diceinput} bind:modifier={modinput}/>

<RollDice/>
</div>

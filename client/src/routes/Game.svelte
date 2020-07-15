<style>
	#ThreeJS {
    position: absolute;
    left: 0px;
    top: 0px;
  }

  #foreground {
    box-sizing: border-box;
    left: 1rem;
    position: absolute;
    top: 0;
    z-index: 1000;
  }

  .sidebar-content {
    background-color: #ffffff;
    box-sizing: border-box;
	  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.35);
    display: flex;
    flex-direction: column;
    max-width: 230px;
    padding: .5rem;
    width: 100%;    
  }

  .sidebar-item {
    align-items: center;
    border: 1px solid #CDB4CF;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    margin: .5rem 0;
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
  import ResultBanner from '../ResultBanner.svelte';

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
  $: diceandmodinput = {dice: diceinput, mod: modinput, texture: localStorage.getItem("dicetexture")};
  let floorcolor = "#00aa00";
  let texturepath;
  let latestplayer;
  let latestroll;

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
    latestplayer = userDict[userId];
    latestroll = diceInput.result;
	  
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

  <ResultBanner playername={latestplayer} latestroll={latestroll}/>
  <ParadiceLogo/>
  <div class="sidebar-content">
    <div class="sidebar-item">
      <LatestRolls bind:latestrolls={userList}/>
    </div>
    <Player playername={username} latestroll={mylatestroll}/>


    <button on:click={roll}>Roll dice</button>

    <h2>Rolls</h2>
    <ul>
      {#each rolls as {user, result}, i}
        <li>
          {user}: {result}
        </li>
      {/each}
    </ul>

    <RollLog/>
      <DiceInput bind:dice={diceinput} bind:modifier={modinput}/>

    <RollDice/>
  </div>
</div>

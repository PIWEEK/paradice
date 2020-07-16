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
  import { DICE_TEXTURES } from '../constants';

  export let params = {};

  const apiURL = API_URL || "https://guarded-stream-90676.herokuapp.com";

  let username = localStorage.getItem("username");
  let dicetexture = localStorage.getItem("dicetexture");
  let tabletexture = localStorage.getItem("tabletexture");

  const socket = io(`${apiURL}/?username=${username}&game=${params.gameId}&diceTexture=${dicetexture}`);

  let userDict = {};
  let userList = [];
  let rolls = [];
  let mylatestroll = 0;
  let diceinput;
  let modinput;

  $: diceandmodinput = {
    dice: diceinput,
    mod: modinput,
    fontColor: DICE_TEXTURES.find((texture) => texture.path == localStorage.getItem("dicetexture")).fontColor,
    texture: localStorage.getItem("dicetexture")
  };

  let floorcolor = "#00aa00";
  let texturepath;
  let latestPlayer;
  let latestroll;
  let latestRolls = {};

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
    latestPlayer = userId;
    latestRolls[userId] = diceInput;

    rolls = [{
      user: userDict[userId],
      ...diceInput
    }, ...rolls];
  });

  // listen for user list event
  socket.on("users-list", (data) => {
    userDict = data;
    userList = Object.values(data);
  });

</script>

<style>

	#ThreeJS {
    position: absolute;
    left: 0px;
    top: 0px;
  }

  .btn-primary {
    padding: .3rem;
    margin: .6rem .3rem;
  }

</style>

<Roll/>

<div id="foreground">
  <ResultBanner player={userDict[latestPlayer]} latestRoll={latestRolls[latestPlayer]}/>
  <ParadiceLogo/>
  <div class="sidebar-content">
    <div class="sidebar-item">
      <LatestRolls latestRolls={latestRolls} userList={userList}/>
    </div>
    <RollLog bind:rolls={rolls}/>
    <DiceInput bind:dice={diceinput} bind:modifier={modinput}/>
    <button class="btn-primary" on:click={roll}>Roll dice</button>
  </div>
</div>

<script>
  import { onMount } from 'svelte';
  import io from 'socket.io-client';
  import Table from '../components/Table.svelte';
  import DiceInput from '../components/DiceInput.svelte';
  import Roll, { initRollDice, rollDice, changeTexture } from '../components/Roll.svelte';
  import ParadiceLogo from '../components/ParadiceLogo.svelte';
  import LatestRolls from '../components/LatestRolls.svelte';
  import RollLog from '../components/RollLog.svelte';
  import ResultBanner from '../components/ResultBanner.svelte';
  import GameInfo from '../components/GameInfo.svelte';
  import { DICE_TEXTURES, TABLE_TEXTURES } from '../constants';
  import TableTextureSelector from '../components/TableTextureSelector.svelte';
  import DiceTextureSelector from '../components/DiceTextureSelector.svelte';

  export let params = {};

  const apiURL = API_URL || "https://theparadice.online";

  let username = localStorage.getItem("username");
  let dicetexture = localStorage.getItem("dicetexture");
  let tabletexture = localStorage.getItem("tabletexture");
  let game = localStorage.getItem("game");
  if (!game) {
    game = "your-game";
  }

  const socket = io(`${apiURL}/?username=${username}&game=${params.gameId}&diceTexture=${dicetexture}`);

  let userDict = {};
  let userList = [];
  let rolls = [];
  let mylatestroll = 0;
  let diceinput;
  let modifier;
  let wipevalue = true;
  let split = false;
  let soundpath = 'sounds/dice.mp3';
  let visibleBanner = false;

  $: diceandmodinput = {
    dice: diceinput,
    fontColor: DICE_TEXTURES.find((texture) => texture.path == dicetexture).fontColor,
    texture: dicetexture,
    modifier: modifier,
    wipe: wipevalue,
    split: split,
    modifier: parseInt(modifier) || ''
  };

  $: rollDiceEnabled = diceinput ? diceinput.reduce((prev, cur) => prev + cur.qty, 0) > 0 : false;

  let floorcolor = "#00aa00";
  let texturepath;
  let latestPlayer;
  let latestroll;
  let latestRolls = {};

  var SCREEN_WIDTH = window.innerWidth;
  let showMobileLatestRolls, showMobileRollLog = true;
  let showMobileDiceInput = true;
  var mobileThreshold = 480;

  if (SCREEN_WIDTH <= mobileThreshold){
  showMobileLatestRolls, showMobileRollLog = false;
  }
  

  function showModule(choice) {
    if (choice == 'latestrolls'){
      if (showMobileLatestRolls){
      showMobileLatestRolls = false;

      }
      else{
      showMobileLatestRolls = true;
      showMobileDiceInput = false;
      showMobileRollLog = false;
    }
    }
    if (choice == 'inputdice'){
      if (showMobileDiceInput){
        showMobileDiceInput = false;
      }
      else{
      showMobileLatestRolls = false;
      showMobileDiceInput = true;
      showMobileRollLog = false;
    }
    }
    if (choice == 'rolllog'){
      if (showMobileRollLog){
        showMobileRollLog = false;
      }
      else{
      showMobileLatestRolls = false;
      showMobileDiceInput = false;
      showMobileRollLog = true;
    }
    }
  }

  onMount(()=> {
    initRollDice();
    changeTexture(tabletexture);

  });

  function roll() {
    visibleBanner = false;
    showMobileLatestRolls = false;
    showMobileDiceInput = false;
    showMobileRollLog = false;
    socket.emit("roll", diceandmodinput);
    
  }

  function handleTextureUpdated(event) {
    changeTexture(event.detail.path);
  }

  function handleDiceTextureUpdated(event) {
    dicetexture = event.detail.dicetexture;
  }

  function handleTableTextureUpdated(event) {
    console.log("handleTableTextureUpdated", event)
    tabletexture = event.detail.tabletexture;
    // initRollDice();
    changeTexture(tabletexture);
  }

  // listen for roll event
  socket.on("roll", (userId, diceInput) => {
    rollDice(diceInput, () => {
      setTimeout(() => {
        latestPlayer = userId;
        visibleBanner = true;
        latestRolls[userId] = diceInput;
        rolls = [{
          user: userDict[userId],
          ...diceInput
          }, ...rolls
        ];
      },
      2500);
    });
    var numdice = diceInput.dice.reduce((prev, cur) => prev + cur.qty, 0);

    soundpath = TABLE_TEXTURES.find((texture) => texture.path == localStorage.getItem("tabletexture")).soundpath;
    if (numdice == 1){
        soundpath = soundpath.replace('.mp3','_1.mp3');
    } else if (numdice == 2){
        soundpath = soundpath.replace('.mp3','_2.mp3');
    }
    new Audio(soundpath).play();
  });

  // listen for user list event
  socket.on("users-list", (data) => {
    userDict = data;
    userList = Object.keys(data).map(userId => {
      return {
        ...data[userId],
        userId: userId
      }
    });
  });

</script>

<style>

  body {
	  overflow: hidden; /* Hide scrollbars */
  }

	#ThreeJS {
    position: absolute;
    left: 0px;
    top: 0px;
  }

  .btn-primary {
    padding: .3rem;
    margin: .6rem .3rem;
  }

  .mobile-nav {
    align-items: center;
    background-color: rgba(0,0,0,.5);
    background: linear-gradient(180deg, rgba(40, 18, 46, 0) 0%, rgb(39, 16, 44) 100%);
    bottom: 0;
    box-sizing: border-box;
    display: none;
    left: 0;
    height: 70px;
    justify-content: space-around;
    padding: 1rem;
    position: absolute;
    width: 100%;
    z-index: 1000;
  }

  .mobile-nav img {
    display: flex;
    max-width: 55px;
    margin-bottom: .6rem;
    opacity: .6;
    transition: all .3s ease;
    width: 100%;
  }

  .mobile-nav img.selected {
    opacity: 1;
  }

  @media (max-width: 480px) {
    #foreground {
      display: flex;
      height: calc(100% - 2rem);
      margin: 1rem;
      padding-bottom: 9vh;
      width: calc(100% - 2rem);
    }

    .sidebar-content {
      margin-top: auto;
      max-width: 100%;
    }

    .mobile-nav {
      display: flex;
    }
  }

</style>

<Roll/>

<div id="foreground">

  {#if visibleBanner}
  <ResultBanner player={userDict[latestPlayer]} latestRoll={latestRolls[latestPlayer]}/>
  {/if}
  <ParadiceLogo/>
  <div class="sidebar-content">
  
    <GameInfo bind:game={game}/>
      {#if showMobileLatestRolls}
    <LatestRolls latestRolls={latestRolls} userList={userList}/>
      {/if}
      {#if showMobileRollLog}
    <RollLog bind:rolls={rolls}/>
    {/if}
    {#if showMobileDiceInput}
    <DiceInput bind:dice={diceinput} bind:modifier={modifier} bind:wipe={wipevalue} bind:split={split}/>
    {/if}
    <!-- <p>Table Skin</p>
    <TableTextureSelector on:tableTextureSelected={handleTableTextureUpdated}/>

    <p>Dice Skin</p>
    <DiceTextureSelector on:diceTextureSelected={handleDiceTextureUpdated}/> -->

    <button class="btn-primary {rollDiceEnabled ? 'enabled' : 'disabled'}" on:click={roll}>Roll dice</button>
  </div>

</div>

<div class="mobile-nav">
    <img class="{showMobileLatestRolls === true ? 'selected' : ''}" on:click={() => showModule("latestrolls")} src="images/icon-3d-players.png" alt="Players list">
    <img class="{showMobileDiceInput === true ? 'selected' : ''}" on:click={() => showModule("inputdice")} src="images/icon-3d-roll.png" alt="Roll dice">
    <img class="{showMobileRollLog === true ? 'selected' : ''}" on:click={() => showModule("rolllog")} src="images/icon-3d-log.png" alt="Roll log">
</div>

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
  import ResultBanner from '../ResultBanner.svelte';
  import GameInfo from '../GameInfo.svelte';
  import { DICE_TEXTURES, TABLE_TEXTURES } from '../constants';

  export let params = {};

  const apiURL = API_URL || "https://guarded-stream-90676.herokuapp.com";

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
  let soundpath = 'sounds/dice.mp3';

  $: diceandmodinput = {
    dice: diceinput,
    fontColor: DICE_TEXTURES.find((texture) => texture.path == localStorage.getItem("dicetexture")).fontColor,
    texture: localStorage.getItem("dicetexture"),
    modifier: modifier,
    wipe: wipevalue,
    modifier: parseInt(modifier) || ''
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
    
  }

  function handleTextureUpdated(event) {
    changeTexture(event.detail.path);
  }

  // listen for roll event
  socket.on("roll", (userId, diceInput) => {

    rollDice(diceInput, () => {
      console.log(diceInput);
      setTimeout(() => {
        latestPlayer = userId;
        latestRolls[userId] = diceInput;
        rolls = [{
          user: userDict[userId],
          ...diceInput
          }, ...rolls
        ];
      },
      1000);
    });
  var numdice = diceInput.dice.reduce(function(prev, cur) {
  return prev + cur.qty;
  }, 0);
  soundpath = TABLE_TEXTURES.find((texture) => texture.path == localStorage.getItem("tabletexture")).soundpath;
  
  if (numdice == 1){
      soundpath = soundpath.replace('00','00_1');      
      console.log(soundpath);
  } else if (numdice == 2){
      soundpath = soundpath.replace('00','00_2');      
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
      <GameInfo bind:game={game}/>
      <LatestRolls latestRolls={latestRolls} userList={userList}/>
    </div>
    <RollLog bind:rolls={rolls}/>
    <DiceInput bind:dice={diceinput} bind:modifier={modifier} bind:wipe={wipevalue}/>
    <button class="btn-primary" on:click={roll}>Roll dice</button>
  </div>
</div>

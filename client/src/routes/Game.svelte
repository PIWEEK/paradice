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
  let soundpath = 'sounds/dice.mp3';

  $: diceandmodinput = {
    dice: diceinput,
    fontColor: DICE_TEXTURES.find((texture) => texture.path == localStorage.getItem("dicetexture")).fontColor,
    texture: localStorage.getItem("dicetexture"),
    modifier: modifier,
    wipe: wipevalue,
    modifier: parseInt(modifier) || ''
  };

  $: rollDiceEnabled = diceinput ? diceinput.reduce((prev, cur) => prev + cur.qty, 0) > 0 : false;

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
      setTimeout(() => {
        latestPlayer = userId;
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
    <button class="btn-primary {rollDiceEnabled ? 'enabled' : 'disabled'}" on:click={roll}>Roll dice</button>
  </div>
</div>

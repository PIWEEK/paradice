<script>
  import * as queryString from 'query-string';

  import TableTextureSelector from '../components/TableTextureSelector.svelte';
  import DiceTextureSelector from '../components/DiceTextureSelector.svelte';

  let username = localStorage.getItem("username");

  if (!username) {
    username = "Your name";
  }

  const gameParam = queryString.parse(window.location.hash)["/create?game"];
  let game = gameParam || localStorage.getItem("game");
  if (!game) {
    game = "your-game";
  }

  $: {
    localStorage.setItem("username", username);
    localStorage.setItem("game", game);
  }

</script>

<style>
  h1 {
    margin-top: 0;
  }

  .logo-small {
    display: flex;
    max-width: 330px;
    margin: 1rem auto .5rem;
    width: 100%;
  }

  .row-flex {
    margin-bottom: 1rem;
  }

  .column-flex {
    margin: 0 .5rem;
  }

  @media (max-width: 480px) {
    .logo-small {
      max-width: 230px;
    }

    h1 {
      font-size: 1.5rem;
    }

    .row-flex {
      flex-wrap: wrap;
      text-align: center;
      justify-content: center;
      margin-bottom: 0;
    }
  }

</style>

<img class="logo-small" src="/images/logo-small.png" alt="PARADICE" border="0">
<div class="content-center">

  <h1>Welcome to PARADICE!</h1>
  <div class="row-flex">
    <div class="column-flex">
      <label>Your name</label>
      <input class="input-center" type=text bind:value={username} max=40>
    </div>
    <div class="column-flex">
      <label>Game</label>
      <input class="input-center" type=text bind:value={game} max=40>
    </div>
  </div>

  <p>Table Skin</p>
  <TableTextureSelector/>

  <p>Dice Skin</p>
  <DiceTextureSelector/>

  <a class="btn-primary" href="/#/game/{game}">Start Playing</a>
</div>

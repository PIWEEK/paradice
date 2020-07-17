<script>
  import DiceResult from './DiceResult.svelte';
  export let rolls = [];
  console.log("rolls", rolls)
</script>

<style>

.sidebar-item {
    padding: 0;
}

.color-user {
    background-color: aqua;
    background-position: center; /* Center the image */
    background-repeat: no-repeat; /* Do not repeat the image */
    background-size: cover; /* Resize the background image to cover the entire container */
    border: 1px solid #333333;
    border-radius: 50%;
    flex-shrink: 0;
    height: 6px;
    margin-right: .3rem;
    width: 6px;
}

.roll-log-list {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    list-style: none;
    overflow-y: auto;
    margin: -1px 2px 0 0;
    height: 153px;
    padding: 0 .5rem;
    width: 100%;
}

.roll-log-list li {
    border-top: 1px solid #CDB4CF;
    padding: .3rem 0;
    display: flex;
    font-size: .8rem;
    flex-direction: column;
}

.roll-op {
  color: #CF4AD9;
    font-size: .8rem;
}

/* SCROLLBAR */

.roll-log-list::-webkit-scrollbar {
    width: .3em;
}

.roll-log-list::-webkit-scrollbar-track {
    background-color:  transparent;
}

.roll-log-list::-webkit-scrollbar-thumb {
    background-color: #ccacce;
}

</style>

<div class="sidebar-item">
  <ul class="roll-log-list">
    {#each rolls.slice(0,50) as roll}
      <li>
        <div class="row-flex">
          <div class="color-user" style="background-image: url({roll.user.diceTexture});"></div>
          <span>{roll.user.username}</span>
        </div>
        <span class="roll-op"><DiceResult roll={roll}/> = {roll.result}</span>
      </li>
    {/each}
  </ul>
</div>
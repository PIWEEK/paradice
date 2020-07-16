<script>
  import DiceResult from './DiceResult.svelte';
  export let rolls = [];
  console.log("rolls", rolls)
</script>

<style>

.sidebar-item {
    padding: 0;
}

.roll-log-list {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    list-style: none;
    overflow-y: auto;
    margin: -1px 2px 0 0;
    height: 178px;
    padding: 0 .5rem;
    width: 100%;
}

.roll-log-list li {
    border-top: 1px solid #CDB4CF;
    padding: .3rem 0;
    display: flex;
    font-size: .9rem;
    flex-direction: column;
}

.roll-op {
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
        <span>{roll.user.username}</span>
        <span class="roll-op"><DiceResult roll={roll}/> = {roll.result}</span>
      </li>
    {/each}
  </ul>
</div>
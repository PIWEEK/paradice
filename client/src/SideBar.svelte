<script>

import ParadiceLogo from './ParadiceLogo.svelte';
import LatestRolls from './LatestRolls.svelte';
import RollLog from './RollLog.svelte';
import RollDice from './RollDice.svelte';

</script>

<style>
  .sidebar-content {
    align-items: center;
    background-color: #ffffff;
	  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.35);
    display: flex;
    flex-direction: column;
    margin: 1rem;
    max-width: 230px;
    padding: .5rem;
    width: 100%;
  }

  .sidebar-item {
    align-items: center;
    border: 1px solid #CDB4CF;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    margin: .5rem 0;
    padding: 1rem;
    width: 100%;
  }
</style>

<ParadiceLogo/>

<div class="sidebar-content">
  <div class="sidebar-item">
    <LatestRolls/>
  </div>
  <div class="sidebar-item">
    <RollLog/>
  </div>
  <div class="sidebar-item">
    <RollDice/>
  </div>
</div>

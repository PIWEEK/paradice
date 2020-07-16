<script>
  export let player = null;
  export let latestRoll = null;
</script>

<style>

.roll-result {
  background-color: rgba(55, 27, 62, 0.8);
  padding: 0.6rem 1rem;
  color: #CF4AD9;
  position: fixed;
  font-size: 1.6rem;
  left: 46%;
  top: 1.6rem;
  z-index: 1000;
}

.roll-result span {
  color: #ffffff;
  margin-left: .6rem;
}

.roll-result span.maths {
  color: rgba(255,255,255,.5);
}

</style>

{#if player}
  <div class="roll-result">{player.username} got <span>{latestRoll.result}</span> <span class="maths">1d6 + 2d10 + 6</span></div>
{/if}
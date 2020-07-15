<script>

    export let rolls = {};

</script>


    <h2>Latest 50 Rolls</h2>
    <div style="width: 200px; height: 100px; overflow-y: scroll;">
      {#each rolls.slice(0,50) as {user, result}, i}

          {user}<br/>
          2D4 + 1d20 +6 = {result}
          <br/>

      {/each}
    </div>
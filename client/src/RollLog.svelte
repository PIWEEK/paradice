<script>

    export let rolls = {};

</script>


    <h2>Latest 5 Rolls</h2>
    <ul>
      {#each rolls.slice(0,5) as {user, result}, i}
        <li>
          {user}: {result}
        </li>
      {/each}
    </ul>
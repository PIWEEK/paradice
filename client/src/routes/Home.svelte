<script>
  import {link} from 'svelte-spa-router'
</script>


<style>

  .home-section {
    align-items: center;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    max-width: 900px;
    margin-top: 5vh;
    padding: 2rem;
  }

  .big-logo {
    font-size: .1px;
  }

  .big-logo img {
    width: 100%;    
  }

  .btn-primary {
    margin-top: 5vh;
    font-size: 24px;
  }

</style>

<div class="home-section">

  <h1 class="big-logo">
    <img src="/images/logo.png" alt="PARADICE" border="0">
    PARADICE
  </h1>

  <a class="btn-primary" href="/create" use:link>Start Paradice</a>

</div>

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

  .big-logo img {
    width: 100%;
  }

  .btn-primary {
    margin-top: 5vh;
    font-size: 24px;
  }

  .footer-link {
    bottom: 2rem;
    font-size: .9rem;
    font-weight: 500;
    position: absolute;
    text-align: center;
    width: 100%;
  }

  .footer-link a {
    color: #ffffff;
  }

</style>

<div class="home-section">

  <h1 class="big-logo">
    <img src="/images/logo.png" alt="PARADICE" border="0">
  </h1>

  <a class="btn-primary" href="/create" use:link>Start Paradice</a>

  <span class="footer-link">Made with love at PIWEEK 
    <a href="https://github.com/PIWEEK/paradice" target="_blank">[ Github ]</a>
    <a href="https://twitter.com/myparad1c3" target="_blank">[ Twitter ]</a>
    <a href="https://piweek.com" target="_blank">[ Piweek ]</a>
  </span>

</div>

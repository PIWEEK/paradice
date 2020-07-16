<script>
 
export let game = "No name?";

</script>
<style>
   

  h2 {
    font-size: 1.2rem;
    margin: 0;
    white-space: nowrap;
  }

  .row-flex {
    align-items: center;
    justify-content: space-between;
    margin-bottom: .5rem;
    width: 100%;
  }

  .copy-link {
    background-color: #371B3E;
    cursor: pointer;
    display: flex;
    height: 16px;
    padding: .2rem .3rem;
    width: 16px;
  }

  .copy-link:hover {
    background-color: #CF4AD9;
  }

  .copy-link img {
    width: 100%;
  }

</style>

<div class="row-flex">
  <h2>{game}</h2>
  <span class="copy-link">
    <img  value="HEY!" src="/images/share-table.png" alt="SHARE TABLE">
  </span>
</div>
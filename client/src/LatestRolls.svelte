<script>

    export let latestrolls = {};
    let username = localStorage.getItem("username");
    $: latestrollsbinded = Object.keys(latestrolls);
    let dicetexture = localStorage.getItem("dicetexture");
    console.log(dicetexture);
    
    

</script>

<style>
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
        width: 100%;
    }

    li {
        align-items: center;
        padding: .1rem 0;
        display: flex;
        width: 100%;
    }

    .color-user {
        background-color: aqua;
       
        background-position: center; /* Center the image */
        background-repeat: no-repeat; /* Do not repeat the image */
        background-size: cover; /* Resize the background image to cover the entire container */
        border: 1px solid #333333;
        border-radius: 50%;
        flex-shrink: 0;
        height: 14px;
        margin-right: .4rem;
        width: 14px;
    }

    .color-otheruser {
        background-color: aqua;
        background-image: url({dicetexture}); 
        border: 1px solid #333333;
        border-radius: 50%;
        flex-shrink: 0;
        height: 14px;
        margin-right: .4rem;
        width: 14px;
    }

</style>

<ul>
    {#each latestrollsbinded as p}
    {#if p==username}
        <li>
            <div class="color-user" style=" background-image: url({dicetexture});"></div>
            <span>{p} (You): {latestrolls[p]}</span>
        </li>
    {:else}
        <li>
            <div class="color-otheruser"></div>
            <span>{p}</span>
        </li>

    {/if}
    {/each}
</ul>
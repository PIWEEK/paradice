<script>
    export let latestRolls = {};
    export let userList = [];
    let username = localStorage.getIte</script>

<style>
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
        width: 100%;
    }

    li {
        align-items: center;
        padding: .2rem 0;
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
        border: 1px solid #333333;
        border-radius: 50%;
        flex-shrink: 0;
        height: 14px;
        margin-right: .4rem;
        width: 14px;
    }

    .last-roll {
        background-color: #F1E2F4;
        margin-left: auto;
        padding: .1rem .2rem;
        text-align: center;
        width: 20px;
    }

</style>

<ul>
    {#each userList as user}
    {#if user == username}
        <li>
            <div class="color-user" style="background-image: url({user.diceTexture});"></div>
            <span>{user.username} (You)</span>
            <span class="last-roll">{latestRolls[user.userId] ? latestRolls[user.userId].result : '--'}</span>
        </li>
    {:else}
        <li>
            <div class="color-otheruser" style="background-image: url({user.diceTexture});"></div>
            <span>{user.username}</span>
            <span class="last-roll">{latestRolls[user.userId] ? latestRolls[user.userId].result : '--'}</span>
        </li>
    {/if}
    {/each}
</ul>
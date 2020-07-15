<script>

    export let latestrolls = [];
    let username = localStorage.getItem("username");

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
        border: 1px solid #333333;
        border-radius: 50%;
        flex-shrink: 0;
        height: 14px;
        margin-right: .4rem;
        width: 14px;
    }
</style>

<ul>
    {#each latestrolls as lr}
    {#if lr==username}
        <li>
            <div class="color-user"></div>
            <span>{lr} (You)</span>
        </li>
    {:else}
        <li>
            <div class="color-user"></div>
            <span>{lr}</span>
        </li>

    {/if}
    {/each}
</ul>
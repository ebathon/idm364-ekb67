<script lang="js">
    import { onMount } from "svelte";

    let posts = null; // Initialize as null to handle loading state

    onMount(async () => {
        posts = await getPosts();
    });

    const getPosts = async () => {
        const res = await fetch("https://www.eventbriteapi.com/v3/events/1098389515609/?token=2SLILYR52FG7TI5JKOK7");
        const data = await res.json();
        console.log(data); // Inspect the API response
        return data;
    };
</script>

{#if !posts}
    <p>Pulling info...</p>
{:else}
    <div class="grid">
        <h1>{posts.name.text}</h1>
        {#if posts.logo}
            <img src={posts.logo.url} alt={posts.name.text} />
        {:else}
            <p>No image available</p>
        {/if}
        <p>{posts.description.text}</p>
    </div>
{/if}

<style>
    .grid {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }

    img {
        max-width: 100%;
        height: auto;
        border-radius: 8px;
    }
</style>
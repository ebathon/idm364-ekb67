<script>
    import { onMount } from 'svelte';
    import { fetchEventbriteData } from '../lib/eventbrite';
  
    let events = [];
    let error = null;
  
    onMount(async () => {
      try {
        const data = await fetchEventbriteData('events/search/?q=svelte');
        events = data.events;
      } catch (err) {
        error = err.message;
      }
    });
  </script>
  
  <main>
    {#if error}
      <p>Error: {error}</p>
    {:else if events.length}
      <ul>
        {#each events as event}
          <li>
            <h2>{event.name.text}</h2>
            <p>{event.description.text}</p>
            <a href={event.url} target="_blank">View Event</a>
          </li>
        {/each}
      </ul>
    {:else}
      <p>Loading events...</p>
    {/if}
  </main>
  
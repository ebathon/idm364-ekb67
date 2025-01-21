<script>
    import { onMount } from 'svelte';
    import { getEventsFromNearbyVenues } from '$lib/eventbrite.js'; // Import the updated API service

    let events = [];
    let error = null;

    onMount(async () => {
        try {
            // Fetch events from nearby venues
            events = await getEventsFromNearbyVenues('Philadelphia', '10km', 10, 5); // Adjust parameters as needed
        } catch (err) {
            error = err.message;
        }
    });
</script>

<main>
    <h1>Local Events</h1>
    {#if error}
        <p class="error">{error}</p>
    {:else if events.length === 0}
        <p>Loading events...</p>
    {:else}
        <ul>
            {#each events as event}
                <li>
                    <h2>{event.name}</h2> <!-- Changed property to match the API response -->
                    <p>{event.start.local} - {event.end.local}</p> <!-- Assuming start and end times are available -->
                    {#if event.venue && event.venue.name && event.venue.address}
                        <p>{event.venue.name}, {event.venue.address.localized_address_display}</p>
                    {/if}
                    <a href={event.url} target="_blank">View Event</a>
                </li>
            {/each}
        </ul>
    {/if}
</main>

<style>
    .error {
        color: red;
        font-weight: bold;
    }
</style>

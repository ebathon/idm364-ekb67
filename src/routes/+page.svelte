<script>
    import { onMount } from "svelte";

    let currentCity = "Unknown";
    let events = [];
    let error = null;

    // Function to generate a simple hash from a string (URL)
    function hashString(str) {
        return str.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    }

    // Function to fetch events based on the detected city
    async function getEvents() {
        try {
            // Fetch events using currentCity as the query parameter
            const res = await fetch(`/api/events?city=${encodeURIComponent(currentCity)}`);

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const data = await res.json();
            console.log("Fetched events:", data);

            // Assign unique ID to each event using its URL
            events = (data.events_results || []).slice(0, 20).map(event => ({
                ...event,
                id: `event-${hashString(event.link)}` // Generate an ID from the event's URL
            }));
        } catch (err) {
            console.error(err);
            error = "Failed to fetch events.";
        }
    }

    // Function to detect user's city and update `currentCity`
    function detectCityAndFetchEvents() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (pos) => {
                    const { latitude, longitude } = pos.coords;

                    try {
                        const response = await fetch(
                            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                        );
                        const data = await response.json();

                        if (data.address && data.address.city) {
                            currentCity = data.address.city;
                        } else if (data.address && data.address.town) {
                            currentCity = data.address.town;
                        } else if (data.address && data.address.village) {
                            currentCity = data.address.village;
                        } else {
                            currentCity = "Unknown Location";
                        }

                        getEvents(); // Fetch events after city is detected
                    } catch (err) {
                        console.error("Error fetching city:", err);
                        error = "Failed to fetch city.";
                    }
                },
                (err) => {
                    console.error("Geolocation error:", err.message);
                    error = "Unable to retrieve location.";
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
            error = "Geolocation is not supported.";
        }
    }

    // Run geolocation function on component mount
    onMount(detectCityAndFetchEvents);  
</script>


<!-- UI -->
<div>
    <h2>Current City: {currentCity}</h2>

    {#if error}
        <p class="error">{error}</p>
    {:else}
        <h3>Events in {currentCity}</h3>

        <div class="events-container">
            {#each events as event (event.id)}
                <div class="events">
                    <img src={event.thumbnail} alt="thumbnail" class="thumbnail"/>
                    
                    <a href={event.link} target="_blank">
                        <li>
                            <strong>{event.title}</strong> - {event.date && event.date.when}
                            <br>
                            {event.description}
                            <br>
                            <small>ID: {event.id}</small>  <!-- Show event ID -->
                        </li>
                    </a>
                </div>
            {/each}
        </div>
        

        <ul>
            {#each events as event (event.id)} <!-- Use event.id for Svelte key -->
                <div class="events">
                    <img src={event.thumbnail} alt="thumbnail" class="thumbnail"/>
                    
                    <a href={event.link} target="_blank">
                        <li>
                            <strong>{event.title}</strong> - {event.date && event.date.when}
                            <br>
                            {event.description}
                        </li>
                    </a>
                </div>
            {/each}
        </ul>        
    {/if}
</div>

<style>
    .events{
        border: 3px solid black;
    }

    .thumbnail{
        width: 120px;
    }

    .events-container {
        display: flex;
        overflow-x: auto;  /* Enables horizontal scrolling */
        white-space: nowrap;
        gap: 20px; /* Space between items */
        padding: 10px;
        scroll-snap-type: x mandatory; /* Smooth scrolling effect */
        font-size: x-small;
        text-wrap: wrap;
    }

    .events-container .events {
        flex: 0 0 auto; /* Prevents items from stretching */
        width: 150px; /* Adjust width as needed */
        border: 3px solid black;
        padding: 10px;
        scroll-snap-align: start; /* Keeps scrolling smooth */
    }

    .events-container .thumbnail {
        width: 80%; /* Makes images responsive within the container */
        object-fit: cover; /* Ensures images fit nicely */
    }
</style>

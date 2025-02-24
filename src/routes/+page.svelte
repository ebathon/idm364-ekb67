<script>
    import { onMount } from "svelte";
    import setting from '$lib/image/settings_icon.png';
    import home from '$lib/image/home_nav.png';
    import likes from '$lib/image/likes_nav.png';
    import message from '$lib/image/message_nav.png';
    import profile from '$lib/image/profile_nav.png';

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
            const res = await fetch(`/api/events?city=${encodeURIComponent(currentCity)}`);

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const data = await res.json();
            console.log("Fetched events:", data);

            // Assign unique ID to each event using its URL
            events = (data.events_results || []).map(event => ({
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

<style>
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    @font-face {
        src: url("../font/PermanentMarker-Regular.ttf");
        font-family : 'PermanentMarker-Regular';
    }
    @font-face {
        src: url("../font/Piazzolla_24pt-Bold.ttf");
        font-family: 'Piazzolla_24pt-Bold';
    }
    @font-face {
        src: url("../font/Fredoka-VariableFont_wdth,wght.ttf");
        font-family: 'Fredoka';
    }
    @font-face {
        src: url("../font/Poppins-Bold.ttf");
        font-family: 'Price-Bold';
    }
    @font-face {
        src: url("../font/Poppins-SemiBold.ttf");
        font-family: 'Button-Text';
    }
    @font-face {
        src: url("../font/Roboto-VariableFont_wdth,wght.ttf");
        font-family: 'Roboto';
    }

    img {
        display: block;
    }

    header {
        background-image: linear-gradient(#D3B9FF, rgb(255, 255, 255));
        display: flex;
        justify-content: space-between;
        font-family: 'Roboto';
        color: #000000;
        padding: 28px;
        font-size: 28px;
    }

    .log {
        font-size: 20px;
        text-decoration: underline;
    }

    .setting {
        padding-left: 31px;
    }

    .content {
        width: 100%;
        overflow-y: auto;
        background: #ffffff;
    }

    menu {
        background-image: linear-gradient(rgb(255, 255, 255), #D3B9FF);
        display: flex;
        text-align: center;
        font-family: "Poppins";
        position: fixed;
        left: 50%;
        bottom: 10px;
        transform: translateX(-50%);
        border-radius: 10px;
        padding: 10px;
        width: 960px;
        margin: auto;
    }

    menu img {
        margin: auto;
    }

    menu > div {
        padding: 10px;
        border-radius: 5px;
    }

    .active {
        background: #482C2C;
        color: white;
    }

    a {
        text-decoration: none;
    }

    .content {
        height: calc(100vh - 78px);
        padding: 15px 15px 100px 15px;
    }

    .main_home_title {
        font-size: 26px;
        font-weight: bold;
        font-family: 'Fredoka';
        margin-bottom: 1.75rem;
    }

    .events-container {
        display: flex;
        overflow-x: auto;
        gap: 20px;
        padding: 10px;
        scroll-snap-type: x mandatory;
    }

    .events-container .events {
        flex: 0 0 auto;
        width: 180px;
        border: 3px solid black;
        padding: 10px;
        scroll-snap-align: start;
        text-align: center;
    }

    .events-container img {
        object-fit: cover;
        align-content: center;
        margin: auto;
    }

    .describe{
        text-overflow: ellipsis;
    }

    @media screen and (max-width: 960px) {
        header {
            padding: 30px;
            font-size: 26px;
        }

        menu {
            position: fixed;
            justify-content: space-between;
            padding: 10px;
            width: 100% !important;
            border-radius: 0 !important;
            display: flex;
            align-items: center;
            bottom: 0px;
        }

        menu > div {
            display: flex;
            align-items: center;
            height: 60px;
            padding: 0px;
        }

        .content {
            height: calc(100vh - 180px);
            padding: 15px;
        }
    }
</style>

<!-- Header -->
<header>
    <div class="log"><a href="signin.html">Sign in</a></div>
    <div>Happen</div>
    <div class="setting">
        <img src={setting} height="28" width="28" alt="Settings"/>
    </div>
</header>




<!-- Main Content -->
<div class="content">
    <h2 class="main_home_title">Current City: {currentCity}</h2>

    {#if error}
        <p class="error">{error}</p>
    {:else}
        <h3>Events in {currentCity}</h3>

        <div class="events-container">
            {#each events as event (event.id)}
                <div class="events">
                    <a href={event.link} target="_blank">
                        <img src={event.thumbnail || "https://via.placeholder.com/150"} alt="Event Thumbnail" class="thumbnail"/>
                        <strong>{event.title}</strong>
                    </a>
                    <p>{event.date && event.date.when}</p>
                    <p class="describe">{event.description || "No description available."}</p>
                </div>
            {/each}
        </div>
    {/if}
</div>

<!-- Navigation Menu -->
<menu>
    <div class="active" id="home"><img src={home} height="60" width="60" alt="Home"/></div>
    <div><a href="likes"><img src={likes} height="60" width="60" alt="Likes"/></a></div>
    <div><a href="messages.svelte"><img src={message} height="60" width="60" alt="Likes"/></a></div>
    <div><a href="profile"><img src={profile} height="60" width="60" alt="Likes"/></a></div>
</menu>

<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import setting from '$lib/image/settings_icon.png';
	import home from '$lib/image/home_nav.png';
	import likes from '$lib/image/likes_nav.png';
	import message from '$lib/image/message_nav.png';
	import profile from '$lib/image/profile_nav.png';
	import { supabase } from '$lib/supabaseClient';

	const { data } = $props();
	$inspect(data)

	let currentCity = $state('Unknown');
	let events = $state([]); // API events
	let musicEvents = $state([]); // Music events section
	let supabaseEvents = $state([]); // Supabase events
	let error = $state(null);
	let nextPageToken = $state(null);
	let isLoading = false;
	let favoriteEvents = $state([]);

	onMount(() => {
		const storedFavorites = localStorage.getItem('favoriteEvents');
		if (storedFavorites) {
			favoriteEvents = JSON.parse(storedFavorites);
		}
		detectCityAndFetchEvents();
		fetchSupabaseEvents();
	});

	$effect(() => {
		const storedFavorites = localStorage.getItem('favoriteEvents'); // Fixed key name
		if (storedFavorites){
			favoriteEvents = JSON.parse(storedFavorites);
		}
		detectCityAndFetchEvents();
	});

	// Fetch events from Supabase
	async function fetchSupabaseEvents() {
		// If data is passed from the server, use it
		if (data && data.items && data.items.length > 0) {
			supabaseEvents = [...data.items];
			return;
		}

		// Fallback to client-side fetching if server data isn't available
		const { data: supabaseData, error: supabaseError } = await supabase.from('happen').select('*');
		if (supabaseError) {
			console.error('Error fetching from Supabase:', supabaseError);
		} else {
			supabaseEvents = [...supabaseData];
		}
	}

	// Function to generate a unique event ID
	function generateUniqueId(event) {
		return `event-${event.title.replace(/\s+/g, '-').toLowerCase()}-${event.link.split('/').pop()}`;
	}

	// Function to toggle favorite status
	function toggleFavorite(eventId) {
		if (favoriteEvents.includes(eventId)) {
			favoriteEvents = favoriteEvents.filter((id) => id !== eventId);
		} else {
			favoriteEvents = [...favoriteEvents, eventId];
		}
		localStorage.setItem('favoriteEvents', JSON.stringify(favoriteEvents));
	}

	// Function to fetch API-based events based on the detected city
	async function getEvents() {
		if (isLoading) return;
		isLoading = true;
		error = null; // Reset error state

		try {
			const url = `/api/events?city=${encodeURIComponent(currentCity)}`;
			console.log('Attempting to fetch events from:', url);
			
			const res = await fetch(url);
			
			// Log detailed response info
			console.log('Response status:', res.status);
			
			if (!res.ok) {
				const errorText = await res.text();
				console.error('API error response:', errorText);
				throw new Error(`HTTP error! Status: ${res.status}, Details: ${errorText}`);
			}

			const data = await res.json();
			console.log('Successfully fetched events data:', data);

			// Check if data has the expected structure
			if (!data || !Array.isArray(data.events_results)) {
				console.warn('Unexpected data structure:', data);
				events = []; // Set empty array if data structure is wrong
			} else {
				events = data.events_results.map((event) => ({
					...event,
					id: generateUniqueId(event)
				}));
			}
			
			// Handle music events if they exist
			if (data.events2_results) {
				musicEvents = data.events2_results.map((event) => ({
					...event,
					id: generateUniqueId(event)
				}));
			}
		} catch (err) {
			console.error('Failed to fetch events:', err);
			error = `Failed to fetch events: ${err.message}`;
			events = []; // Ensure events is at least an empty array
			musicEvents = [];
		} finally {
			isLoading = false;
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

						currentCity =
							data.address?.city ||
							data.address?.town ||
							data.address?.village ||
							'Unknown Location';
						getEvents(); // Fetch events after detecting city
					} catch (err) {
						console.error('Error fetching city:', err);
						error = 'Failed to fetch city.';
					}
				},
				(err) => {
					console.error('Geolocation error:', err.message);
					error = 'Unable to retrieve location.';
				}
			);
		} else {
			console.error('Geolocation is not supported by this browser.');
			error = 'Geolocation is not supported.';
		}
	}
</script>

<!-- Header -->
<header>
  <div class="log"><a href="/sign_in/1">Sign in</a></div>
  <div class="app-title">Happen</div>
  <div class="setting">
    <img src={setting} height="28" width="28" alt="Settings" />
  </div>
</header>

<!-- Main Content -->
<div class="content">
	<h2 class="main_home_title">Current City: {currentCity}</h2>

	{#if error}
		<p class="error">{error}</p>
	{:else}
		<h3>Events near {currentCity}</h3>
		<div class="events-container">
			{#each events as event (event.id)}
				<div class="events">
					<button
						class="favorite-btn"
						onclick={() => toggleFavorite(event.id)}
						aria-label={favoriteEvents.includes(event.id)
							? 'Remove from favorites'
							: 'Add to favorites'}
					>
						<svg
							class="heart-icon {favoriteEvents.includes(event.id) ? 'active' : ''}"
							viewBox="0 0 24 24"
						>
							<path
								d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
							></path>
						</svg>
					</button>
					<a href={event.link} target="_blank">
						<img
							src={event.thumbnail || 'https://placehold.co/150'}
							alt="Event Thumbnail"
							class="thumbnail"
							onerror={(e) => { e.target.src = 'https://placehold.co/150'; }}
						/>
						<strong>{event.title}</strong>
					</a>
					<p>{event.date?.when || 'No date available'}</p>
					<p class="describe">{event.description || 'No description available.'}</p>
				</div>
			{/each}
		</div>

		<h3>Top Local Events</h3>
		<div class="events-container">
			{#each supabaseEvents as item (item.id)}
				<div class="events">
					<button
						class="favorite-btn"
						onclick={() => toggleFavorite(item.id)}
						aria-label={favoriteEvents.includes(item.id)
							? 'Remove from favorites'
							: 'Add to favorites'}
					>
						<svg
							class="heart-icon {favoriteEvents.includes(item.id) ? 'active' : ''}"
							viewBox="0 0 24 24"
						>
							<path
								d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
							></path>
						</svg>
					</button>
					<a href={`/events/${item.id}`}>
						<img
							src={item.image_path ? `/events/${item.image_path}` : (item.image || 'https://placehold.co/150')}
							alt="Event Thumbnail"
							class="thumbnail"
							onerror={(e) => { e.target.src = 'https://placehold.co/150'; }}
						/>
						<strong>{item.title || item.name}</strong>
					</a>
					<p>{item.date || 'No date available'}</p>
					<p class="describe">{item.description || 'No description available.'}</p>
				</div>
			{/each}
		</div>

		<!-- Music Events Section - Will display events from events2_results if available -->
		<h3>Concerts in {currentCity}</h3>
		<div class="events-container">
			{#each musicEvents as event (event.id)}
				<div class="events">
					<button
						class="favorite-btn"
						onclick={() => toggleFavorite(event.id)}
						aria-label={favoriteEvents.includes(event.id)
							? 'Remove from favorites'
							: 'Add to favorites'}
					>
						<svg
							class="heart-icon {favoriteEvents.includes(event.id) ? 'active' : ''}"
							viewBox="0 0 24 24"
						>
							<path
								d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
							></path>
						</svg>
					</button>
					<a href={event.link} target="_blank">
						<img
							src={event.thumbnail || 'https://placehold.co/150'}
							alt="Event Thumbnail"
							class="thumbnail"
							onerror={(e) => { e.target.src = 'https://placehold.co/150'; }}
						/>
						<strong>{event.title}</strong>
					</a>
					<p>{event.date?.when || 'No date available'}</p>
					<p class="describe">{event.description || 'No description available.'}</p>
				</div>
			{/each}
		</div>
	{/if}
</div>

<!-- Navigation Menu -->
<menu>
	<div><a href="/"><img src={home} height="60" width="60" alt="Home" /></a></div>
	<div><a href="likes"><img src={likes} height="60" width="60" alt="Likes" /></a></div>
	<div><a href="/messages"><img src={message} height="60" width="60" alt="Messages" /></a></div>
	<div><a href="profile"><img src={profile} height="60" width="60" alt="Profile" /></a></div>
</menu>

<style>
	/* Import fonts */
	@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Pathway+Extreme:wght@400;600;700&display=swap');

	* {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
		font-family: 'SF Pro Display', 'Roboto', sans-serif;
	}

	:global(body) {
		margin: 0;
		padding: 0;
		overflow: hidden;
	}

	img {
		display: block;
	}

	header {
		background-image: linear-gradient(#d3b9ff, rgb(255, 255, 255));
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 15px 20px;
		font-size: 16px;
	}

	.app-title {
		font-family: 'Pathway Extreme', sans-serif;
		font-size: 24px;
		font-weight: 550;
		color: #5f2eea; /* Purple color to match the gradient */
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
		letter-spacing: 1px;
	}

	.log {
		font-size: 16px;
		text-decoration: none;
		color: #000;
	}

	.log a {
		text-decoration: none;
		color: #000;
	}

	.setting {
		padding: 0;
	}

	.content {
		height: calc(100vh - 60px);
		overflow-y: auto;
		background: #ffffff;
		padding-bottom: 80px;
	}

	.main_home_title {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 15px 20px;
		font-size: 18px;
		font-weight: 600;
	}

	/* Add location icon before city name */
	.main_home_title::before {
		content: '';
		display: inline-block;
		width: 24px;
		height: 24px;
		background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>');
		background-size: contain;
		background-repeat: no-repeat;
	}

	/* H3 styling with Nunito font */
	h3 {
    font-family: 'Nunito', sans-serif;
    font-size: 24px;
    font-weight: 600;
    padding: 0 20px;
    margin-top: 10px;      /* Add top margin to create space between sections */
    margin-bottom: 10px;   /* Increase bottom margin from 15px to 20px */
	}
	h3:first-of-type {
    margin-top: 15px;
	}

	/* Events display */
	.events-container {
    display: flex;
    overflow-x: auto;
    gap: 15px;
    padding: 0 20px 10px;  /* Add bottom padding of 20px */
    scrollbar-width: none; /* Hide scrollbar for Firefox */
	}

	.events-container::-webkit-scrollbar {
		display: none; /* Hide scrollbar for Chrome/Safari */
	}

	.events {
		flex: 0 0 auto;
		width: 220px;
		border-radius: 12px;
		overflow: hidden;
		position: relative;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
		border: none;
		padding: 0;
		background: white;
	}

	.events img {
		width: 100%;
		height: 120px;
		object-fit: cover;
		border-radius: 0;
	}

	.events a {
		text-decoration: none;
		color: black;
	}

	.events strong {
		display: block;
		font-size: 14px;
		margin: 10px 10px 5px 10px;
	}

	.events p {
		font-size: 12px;
		color: #666;
		margin: 0 10px 10px 10px;
	}

	.describe {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
	}

	/* Added "favorite" heart button */
	.favorite-btn {
		position: absolute;
		top: 10px;
		right: 10px;
		width: 32px;
		height: 32px;
		background-color: rgba(255, 255, 255, 0.8);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		border: none;
		cursor: pointer;
	}

	.heart-icon {
		width: 18px;
		height: 18px;
		fill: none;
		stroke: #ff4b8a;
		stroke-width: 2px;
	}

	.heart-icon.active {
		fill: #ff4b8a;
	}
	/* Navigation menu styling */
	menu {
		display: flex;
		justify-content: space-around;
		align-items: center;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		margin: 0;
		padding: 10px 0;
		background: linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 1));
	}

	menu div {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	menu a {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	menu img {
		width: 60px;
		height: 60px;
	}

	.error {
		color: #e53935;
		padding: 15px 20px;
		margin-bottom: 15px;
		background-color: #ffebee;
		border-radius: 8px;
		font-size: 14px;
	}
</style>
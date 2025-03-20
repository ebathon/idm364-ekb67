<script>
	import { onMount } from 'svelte';
	import setting from '$lib/image/settings_icon.png';
	import home from '$lib/image/home_nav.png';
	import likes from '$lib/image/likes_nav.png';
	import message from '$lib/image/message_nav.png';
	import profile from '$lib/image/profile_nav.png';
	import { supabase } from '$lib/supabaseClient';

	let events = []; // API events
	let supabaseEvents = []; // Supabase events
	let favoriteEvents = [];
	let likedEvents = []; // Combined liked events from both sources
	let isLoading = true;
	let error = null;
	let currentCity = 'Unknown';

	onMount(() => {
		// Load favorite events from localStorage
		const storedFavorites = localStorage.getItem('favoriteEvents');
		if (storedFavorites) {
			favoriteEvents = JSON.parse(storedFavorites);
		}

		// Get current city (for displaying in the header)
		detectCity();

		// Fetch all events and filter them
		fetchAllEventsAndFilter();
	});

	// Function to detect user's city
	function detectCity() {
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
					} catch (err) {
						console.error('Error fetching city:', err);
					}
				},
				(err) => {
					console.error('Geolocation error:', err.message);
				}
			);
		}
	}

	// Function to toggle favorite status
	function toggleFavorite(eventId) {
		if (favoriteEvents.includes(eventId)) {
			favoriteEvents = favoriteEvents.filter((id) => id !== eventId);
		} else {
			favoriteEvents = [...favoriteEvents, eventId];
		}
		localStorage.setItem('favoriteEvents', JSON.stringify(favoriteEvents));

		// Re-filter events to update the displayed list
		filterLikedEvents();
	}

	// Function to fetch all events and filter for favorites
	async function fetchAllEventsAndFilter() {
		isLoading = true;
		try {
			// Fetch from Supabase
			await fetchSupabaseEvents();

			// Fetch from API
			await fetchApiEvents();

			// Filter for liked events
			filterLikedEvents();
		} catch (err) {
			console.error('Error fetching events:', err);
			error = 'Failed to load your liked events.';
		} finally {
			isLoading = false;
		}
	}

	// Filter events to show only liked ones
	function filterLikedEvents() {
		// Filter API events
		const likedApiEvents = events.filter((event) => favoriteEvents.includes(event.id));

		// Filter Supabase events
		const likedSupabaseEvents = supabaseEvents.filter((event) => favoriteEvents.includes(event.id));

		// Combine both sets of liked events
		likedEvents = [...likedApiEvents, ...likedSupabaseEvents];
	}

	// Fetch events from Supabase
	async function fetchSupabaseEvents() {
		const { data, error } = await supabase.from('happen').select('*');
		if (error) {
			console.error('Error fetching from Supabase:', error);
		} else {
			supabaseEvents = [...data];
		}
	}

	// Function to generate a unique event ID (same as in main page)
	function generateUniqueId(event) {
		return `event-${event.title.replace(/\s+/g, '-').toLowerCase()}-${event.link.split('/').pop()}`;
	}

	// Fetch events from the API
	async function fetchApiEvents() {
		try {
			// Use the same API endpoint as your main page
			const url = `/api/events?city=${encodeURIComponent(currentCity)}`;
			const res = await fetch(url);

			if (!res.ok) {
				throw new Error(`HTTP error! Status: ${res.status}`);
			}

			const data = await res.json();

			// Process events the same way as in main page
			events = (data.events_results || []).map((event) => ({
				...event,
				id: generateUniqueId(event)
			}));
		} catch (err) {
			console.error('Error fetching API events:', err);
		}
	}

	// Helper function to get the proper image source
	function getImageSource(event) {
		// Check if event has an image_path (from Supabase)
		if (event.image_path) {
			return `/events/${event.image_path}`;
		}

		// Try getting thumbnail from API events
		if (event.thumbnail) {
			return event.thumbnail;
		}

		// Try getting image from Supabase events
		if (event.image) {
			return event.image;
		}

		// Fallback to placeholder
		return 'https://placehold.co/150';
	}
</script>

<!-- Header -->
<header>
	<div class="log"><a href="/sign_in/1">Sign in</a></div>
	<div>Your Likes</div>
	<div class="setting">
		<img src={setting} height="28" width="28" alt="Settings" />
	</div>
</header>

<!-- Main Content -->
<div class="content">
	<h2 class="main_home_title">Your Favorite Events</h2>

	{#if isLoading}
		<p class="loading">Loading your favorites...</p>
	{:else if error}
		<p class="error">{error}</p>
	{:else if likedEvents.length === 0}
		<div class="no-likes">
			<p>You haven't liked any events yet.</p>
			<a href="/" class="browse-btn">Browse Events</a>
		</div>
	{:else}
		<div class="events-grid">
			{#each likedEvents as event (event.id)}
				<div class="events">
					<button
						class="favorite-btn"
						on:click={() => toggleFavorite(event.id)}
						aria-label="Remove from favorites"
					>
						<svg class="heart-icon active" viewBox="0 0 24 24">
							<path
								d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
							></path>
						</svg>
					</button>
					<a href={event.link || event.url} target="_blank">
						<img
							src={getImageSource(event)}
							alt="Event Thumbnail"
							class="thumbnail"
							on:error={(e) => {
								e.target.src = 'https://placehold.co/150';
							}}
						/>
						<strong>{event.title || event.name}</strong>
					</a>
					<p>{event.date?.when || event.date || 'No date available'}</p>
					<p class="describe">{event.description || 'No description available.'}</p>
					<a
						href={`/likers?event=${encodeURIComponent(event.id)}&title=${encodeURIComponent(event.title || event.name)}`}
						class="matches-btn"
					>
						<span>Potential Matches</span>
						<svg
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
							<circle cx="9" cy="7" r="4"></circle>
							<path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
							<path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
						</svg>
					</a>
				</div>
			{/each}
		</div>
	{/if}
</div>

<!-- Navigation Menu -->
<menu>
	<div><a href="/"><img src={home} height="60" width="60" alt="Home" /></a></div>
	<div class="active"><img src={likes} height="60" width="60" alt="Likes" /></div>
	<div><a href="/messages"><img src={message} height="60" width="60" alt="Messages" /></a></div>
	<div><a href="/profile"><img src={profile} height="60" width="60" alt="Profile" /></a></div>
</menu>

<style>
	/* Import Nunito font from Google Fonts */
	@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap');

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
		padding: 15px 20px;
		font-size: 18px;
		font-weight: 600;
	}

	.loading,
	.error,
	.no-likes {
		padding: 20px;
		text-align: center;
		font-size: 16px;
	}

	.browse-btn {
		display: inline-block;
		margin-top: 15px;
		padding: 8px 16px;
		background-color: #d3b9ff;
		color: black;
		text-decoration: none;
		border-radius: 6px;
		font-weight: 500;
	}

	/* Events display */
	.events-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 20px;
		padding: 0 20px 20px 20px;
	}

	.events {
		border-radius: 12px;
		overflow: hidden;
		position: relative;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
		background: white;
		display: flex;
		flex-direction: column;
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
		-webkit-line-clamp: 3;
		line-clamp: 3; /* Added standard property for compatibility */
		max-height: 4.5em;
		margin-bottom: auto !important;
	}

	/* Potential Matches button */
	.matches-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		margin: 8px 10px 10px;
		padding: 8px 0;
		background-color: #f0e6ff;
		color: #6b47b8;
		border-radius: 6px;
		font-size: 12px;
		font-weight: 600;
		text-align: center;
		transition: background-color 0.2s;
	}

	.matches-btn:hover {
		background-color: #e6d9ff;
	}

	.matches-btn svg {
		flex-shrink: 0;
	}

	/* Favorite button */
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
		z-index: 10;
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

	.active {
		position: relative;
	}

	.error {
		color: #e53935;
		padding: 15px 20px;
		background-color: #ffebee;
		border-radius: 8px;
		margin: 15px 20px;
		font-weight: 500;
	}

	.loading {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 200px;
		font-family: 'Nunito', sans-serif;
		color: #555;
	}

	.loading::after {
		content: '...';
		animation: dots 1.5s steps(5, end) infinite;
	}

	@keyframes dots {
		0%,
		20% {
			content: '.';
		}
		40% {
			content: '..';
		}
		60% {
			content: '...';
		}
		80%,
		100% {
			content: '';
		}
	}
</style>

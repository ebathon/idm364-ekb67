<script>
import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import setting from '$lib/image/settings_icon.png';
	import home from '$lib/image/home_nav.png';
	import likes from '$lib/image/likes_nav.png';
	import message from '$lib/image/message_nav.png';
	import profile from '$lib/image/profile_nav.png';
	import { supabase } from '$lib/supabaseClient';

	// Get data from the server-side loader if available
	export let data = {};
	
	// Initialize event from data or set to null
	let event = data.event || null;
	let isLoading = true;
	let error = null;
	let favoriteEvents = [];
	let eventId;

	onMount(async () => {
		console.log("Page params:", $page.params);
		// Get eventId from URL parameter - Fix: use eventID instead of eventId
		eventId = $page.params.eventID; // Note the capital "ID" here
		console.log("Event ID from params:", eventId);
		
		// Load favorite events from localStorage
		const storedFavorites = localStorage.getItem('favoriteEvents');
		if (storedFavorites) {
			favoriteEvents = JSON.parse(storedFavorites);
		}

		// Fetch the event data
		await fetchEventDetails();
	});


	// Function to toggle favorite status
	function toggleFavorite(id) {
		if (!id) return;
		
		if (favoriteEvents.includes(id)) {
			favoriteEvents = favoriteEvents.filter((eventId) => eventId !== id);
		} else {
			favoriteEvents = [...favoriteEvents, id];
		}
		localStorage.setItem('favoriteEvents', JSON.stringify(favoriteEvents));
	}

	// Function to fetch event details from Supabase
	async function fetchEventDetails() {
		if (!eventId) {
			error = "No event ID provided";
			isLoading = false;
			return;
		}
		
		console.log("Fetching event with ID:", eventId);
		isLoading = true;
		try {
			const { data: eventData, error: supabaseError } = await supabase
				.from('happen')
				.select('*')
				.eq('id', eventId)
				.single();

			if (supabaseError) {
				console.error("Error fetching event details:", supabaseError);
				throw supabaseError;
			}

			if (eventData) {
				console.log("Fetched event data:", eventData);
				event = eventData;
			} else {
				throw new Error('Event not found');
			}
		} catch (err) {
			console.error('Error fetching event details:', err);
			error = err.message || 'Failed to load event details.';
		} finally {
			isLoading = false;
		}
	}

	// Helper function to get image source
	function getImageSource(eventObj) {
		if (!eventObj) return 'https://placehold.co/600x400';
		
		if (eventObj.image_path) {
			return `/events/${eventObj.image_path}`;
		}
		
		if (eventObj.image) {
			return eventObj.image;
		}
		
		return 'https://placehold.co/600x400';
	}

	// Format date
	function formatDate(dateString) {
		if (!dateString) return 'Date not specified';
		
		try {
			const date = new Date(dateString);
			return date.toLocaleDateString('en-US', {
				weekday: 'long',
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			});
		} catch (e) {
			return dateString;
		}
	}

	// Format time
	function formatTime(timeString) {
		if (!timeString) return 'Time not specified';
		return timeString;
	}

	// Format price
	function formatPrice(price) {
		if (price === null || price === undefined) return 'Free';
		if (price === 0) return 'Free';
		return `$${price.toFixed(2)}`;
	}

	// Format duration
	function formatDuration(minutes) {
		if (!minutes) return 'Duration not specified';
		
		const hours = Math.floor(minutes / 60);
		const mins = minutes % 60;
		
		if (hours === 0) {
			return `${mins} minutes`;
		} else if (mins === 0) {
			return `${hours} hour${hours > 1 ? 's' : ''}`;
		} else {
			return `${hours} hour${hours > 1 ? 's' : ''} ${mins} minute${mins > 1 ? 's' : ''}`;
		}
	}
</script>

<!-- Header -->
<header>
	<div class="log"><a href="/">Back</a></div>
	<div>Event Details</div>
	<div class="setting">
		<img src={setting} height="28" width="28" alt="Settings" />
	</div>
</header>

<!-- Main Content -->
<div class="content">
	{#if isLoading}
		<div class="loading">Loading event details...</div>
	{:else if error}
		<div class="error">
			<p>{error}</p>
			<a href="/" class="back-btn">Back to events</a>
		</div>
	{:else if event}
		<div class="event-detail">
			<div class="event-header">
				<img 
					src={getImageSource(event)} 
					alt={event.title || event.name} 
					class="event-image"
					on:error={(e) => { e.target.src = 'https://placehold.co/600x400'; }}
				/>
				
				<button
					class="favorite-btn"
					on:click={() => toggleFavorite(event.id)}
					aria-label={favoriteEvents.includes(event.id) ? "Remove from favorites" : "Add to favorites"}
				>
					<svg class="heart-icon {favoriteEvents.includes(event.id) ? 'active' : ''}" viewBox="0 0 24 24">
						<path
							d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
						></path>
					</svg>
				</button>
			</div>
			
			<div class="event-info">
				<h1>{event.title || event.name}</h1>
				
				<div class="meta-info">
					<div class="meta-item">
						<svg viewBox="0 0 24 24" width="18" height="18">
							<rect x="3" y="4" width="18" height="18" rx="2" ry="2" fill="none" stroke="currentColor" stroke-width="2"/>
							<line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" stroke-width="2"/>
							<line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" stroke-width="2"/>
							<line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="2"/>
						</svg>
						<span>{formatDate(event.date)}</span>
					</div>
					
					{#if event.time}
					<div class="meta-item">
						<svg viewBox="0 0 24 24" width="18" height="18">
							<circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/>
							<polyline points="12 6 12 12 16 14" stroke="currentColor" stroke-width="2"/>
						</svg>
						<span>{formatTime(event.time)}</span>
					</div>
					{/if}
					
					{#if event.location}
					<div class="meta-item">
						<svg viewBox="0 0 24 24" width="18" height="18">
							<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="none" stroke="currentColor" stroke-width="2"/>
							<circle cx="12" cy="10" r="3" fill="none" stroke="currentColor" stroke-width="2"/>
						</svg>
						<span>{event.location}</span>
					</div>
					{/if}
					
					{#if event.duration !== null && event.duration !== undefined}
					<div class="meta-item">
						<svg viewBox="0 0 24 24" width="18" height="18">
							<circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/>
							<polyline points="12 6 12 12 16 14" fill="none" stroke="currentColor" stroke-width="2"/>
						</svg>
						<span>{formatDuration(event.duration)}</span>
					</div>
					{/if}
					
					{#if event.price !== null && event.price !== undefined}
					<div class="meta-item">
						<svg viewBox="0 0 24 24" width="18" height="18">
							<line x1="12" y1="1" x2="12" y2="23" stroke="currentColor" stroke-width="2"/>
							<path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" fill="none" stroke="currentColor" stroke-width="2"/>
						</svg>
						<span>{formatPrice(event.price)}</span>
					</div>
					{/if}
					
					{#if event.users_interested !== null && event.users_interested !== undefined}
					<div class="meta-item">
						<svg viewBox="0 0 24 24" width="18" height="18">
							<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" fill="none" stroke="currentColor" stroke-width="2"/>
							<circle cx="9" cy="7" r="4" fill="none" stroke="currentColor" stroke-width="2"/>
							<path d="M23 21v-2a4 4 0 0 0-3-3.87" fill="none" stroke="currentColor" stroke-width="2"/>
							<path d="M16 3.13a4 4 0 0 1 0 7.75" fill="none" stroke="currentColor" stroke-width="2"/>
						</svg>
						<span>{event.users_interested} people interested</span>
					</div>
					{/if}
				</div>
				
				<div class="description">
					<h2>About this event</h2>
					<p>{event.description || 'No description available.'}</p>
				</div>
				
				<div class="action-buttons">
					<a href={`/likers?event=${encodeURIComponent(event.id)}&title=${encodeURIComponent(event.title || event.name || '')}`} class="matches-btn">
						<span>See potential matches</span>
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
							<circle cx="9" cy="7" r="4"></circle>
							<path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
							<path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
						</svg>
					</a>
					
					{#if !favoriteEvents.includes(event.id)}
						<button class="like-btn" on:click={() => toggleFavorite(event.id)}>
							Save to favorites
						</button>
					{:else}
						<button class="unlike-btn" on:click={() => toggleFavorite(event.id)}>
							Remove from favorites
						</button>
					{/if}
				</div>
			</div>
		</div>
	{:else}
		<div class="error">Event not found</div>
	{/if}
</div>

<!-- Navigation Menu -->
<menu>
	<div><a href="/"><img src={home} height="60" width="60" alt="Home" /></a></div>
	<div><a href="/likes"><img src={likes} height="60" width="60" alt="Likes" /></a></div>
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
		0%, 20% { content: '.'; }
		40% { content: '..'; }
		60% { content: '...'; }
		80%, 100% { content: ''; }
	}

	.error {
		color: #e53935;
		padding: 15px 20px;
		background-color: #ffebee;
		border-radius: 8px;
		margin: 15px 20px;
		font-weight: 500;
		text-align: center;
	}

	.back-btn {
		display: inline-block;
		margin-top: 15px;
		padding: 8px 16px;
		background-color: #d3b9ff;
		color: black;
		text-decoration: none;
		border-radius: 6px;
		font-weight: 500;
	}

	/* Event Detail Styles */
	.event-detail {
		margin: 0 0 60px 0;
	}

	.event-header {
		position: relative;
		height: 250px;
		overflow: hidden;
	}

	.event-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	/* Favorite button */
	.favorite-btn {
		position: absolute;
		top: 15px;
		right: 15px;
		width: 40px;
		height: 40px;
		background-color: rgba(255, 255, 255, 0.9);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		border: none;
		cursor: pointer;
		z-index: 10;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
	}

	.heart-icon {
		width: 22px;
		height: 22px;
		fill: none;
		stroke: #ff4b8a;
		stroke-width: 2px;
	}

	.heart-icon.active {
		fill: #ff4b8a;
	}

	.event-info {
		padding: 20px;
	}

	.event-info h1 {
		font-size: 24px;
		margin-bottom: 15px;
		font-weight: 700;
	}

	.meta-info {
		display: flex;
		flex-direction: column;
		gap: 12px;
		margin-bottom: 25px;
	}

	.meta-item {
		display: flex;
		align-items: center;
		gap: 8px;
		color: #555;
		font-size: 14px;
	}

	.meta-item svg {
		flex-shrink: 0;
	}

	.description {
		margin-bottom: 30px;
	}

	.description h2 {
		font-size: 18px;
		margin-bottom: 10px;
		font-weight: 600;
	}

	.description p {
		font-size: 16px;
		line-height: 1.5;
		color: #333;
	}

	/* Action buttons */
	.action-buttons {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.matches-btn, .like-btn, .unlike-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		padding: 12px;
		border-radius: 8px;
		font-size: 16px;
		font-weight: 600;
		text-align: center;
		transition: all 0.2s ease;
		text-decoration: none;
	}

	.matches-btn {
		background-color: #f0e6ff;
		color: #6b47b8;
	}
	
	.matches-btn:hover {
		background-color: #e6d9ff;
	}

	.like-btn {
		background-color: #ff4b8a;
		color: white;
		border: none;
		cursor: pointer;
	}

	.like-btn:hover {
		background-color: #e6377a;
	}

	.unlike-btn {
		background-color: #f0f0f0;
		color: #555;
		border: 1px solid #ddd;
		cursor: pointer;
	}

	.unlike-btn:hover {
		background-color: #e6e6e6;
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
</style>
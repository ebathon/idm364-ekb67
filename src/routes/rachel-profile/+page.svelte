<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	// Import image from lib/image directory
	import Rachel from '$lib/image/Rachel.jpeg';
	
	// Import navigation icons
	import home from '$lib/image/home_nav.png';
	import likes from '$lib/image/likes_nav.png';
	import message from '$lib/image/message_nav.png';
	import profile from '$lib/image/profile_nav.png';
	
	// Import event images
	import mardiGras from '$lib/image/MardiGras.png';
	import skyline from '$lib/image/Skyline.png';
	
	// Profile data - renamed from "profile" to "userData" to avoid conflict
	const userData = {
		name: 'Rachel',
		age: 27,
		occupation: 'Business Analyst',
		education: 'University of Pennsylvania',
		political: 'Democrat',
		religion: 'Christian',
		height: "5' 3",
		drinking: 'Sometimes',
		languages: ['English'],
		hobbies: ['Running', 'Yoga'],
		relationshipGoals: 'Looking for a long-term relationship',
		prompts: [
			{
				question: 'Something on my bucket list',
				answer: 'I want to backpack through Europe!'
			},
			{
				question: "Something you'd never guess about me",
				answer: 'I do stand-up comedy on the weekends.'
			}
		],
		likedEvents: [
			{
				title: 'Mardi Gras Bar Crawl',
				image: mardiGras
			},
			{
				title: 'Philadelphia Skyline Tour',
				image: skyline
			}
		]
	};
	
	function goBack() {
		history.back();
	}
	
	function sendMessage() {
		// Navigate to /messenger-rachel instead of just logging
		goto('/messenger-rachel');
	}
</script>

<div class="container">
	<div class="profile-header">
		<button class="back-button" on:click={goBack}>
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
				<path
					d="M15 18L9 12L15 6"
					stroke="black"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</button>
	</div>
	
	<div class="profile-photo-container">
		<img src={Rachel} alt="Rachel outside" class="profile-photo"/>
		<div class="profile-name-container">
			<div class="profile-name-info">
				<h2>{userData.name}, {userData.age}</h2>
				<span class="verified-badge">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="#0095f6">
						<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
					</svg>
				</span>
			</div>
			<button class="message-button" on:click={sendMessage}>
				Message
				<svg width="20" height="20" viewBox="0 0 24 24" fill="#0095f6">
					<path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
				</svg>
			</button>
		</div>
	</div>
	
	<div class="profile-info-container">
		<div class="stat-item relationship-goal-container">
			<span class="stat-icon">❤️</span>
			<span class="relationship-goal">{userData.relationshipGoals}</span>
		</div>
		
		<div class="profile-stats">
			<div class="stat-item">
				<span class="stat-icon">💼</span>
				<span class="stat-text">{userData.occupation}</span>
			</div>
			<div class="stat-item">
				<span class="stat-icon">🎓</span>
				<span class="stat-text">{userData.education}</span>
			</div>
			<div class="stat-item">
				<span class="stat-icon">🏛️</span>
				<span class="stat-text">{userData.political}</span>
			</div>
			<div class="stat-item">
				<span class="stat-icon">📖</span>
				<span class="stat-text">{userData.religion}</span>
			</div>
			<div class="stat-item">
				<span class="stat-icon">📏</span>
				<span class="stat-text">{userData.height}</span>
			</div>
			<div class="stat-item">
				<span class="stat-icon">🍸</span>
				<span class="stat-text">{userData.drinking}</span>
			</div>
			<div class="stat-item">
				<span class="stat-icon">🗣️</span>
				<span class="stat-languages">
					{#each userData.languages as language}
						<span class="language-badge">{language}</span>
					{/each}
				</span>
			</div>
			<div class="stat-item">
				<span class="stat-icon">🏃</span>
				<span class="stat-languages">
					{#each userData.hobbies as hobby}
						<span class="hobby-badge">{hobby}</span>
					{/each}
				</span>
			</div>
		</div>
		
		<div class="profile-prompts">
			{#each userData.prompts as prompt}
				<div class="prompt-container">
					<h3 class="prompt-question">{prompt.question}</h3>
					<p class="prompt-answer">{prompt.answer}</p>
				</div>
			{/each}
		</div>
		
		<div class="recent-events">
			<h3 class="section-title">Recently Liked Events</h3>
			<div class="events-container">
				{#each userData.likedEvents as event}
					<div class="event-card">
						<img src={event.image} alt={event.title} class="event-image"/>
						<div class="event-overlay"></div>
					</div>
				{/each}
			</div>
		</div>
	</div>
	
	<!-- Updated Navigation Menu -->
	<menu>
		<div><a href="/"><img src={home} height="60" width="60" alt="Home" /></a></div>
		<div><a href="likes"><img src={likes} height="60" width="60" alt="Likes" /></a></div>
		<div><a href="/messages"><img src={message} height="60" width="60" alt="Messages" /></a></div>
		<div><a href="profile"><img src={profile} height="60" width="60" alt="Profile" /></a></div>
	</menu>
</div>

<style>
	/* Import fonts */
	@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Nunito:wght@400;600;700&display=swap');

	/* Container and global styles */
	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: 'SF Pro Display', 'Roboto', sans-serif;
	}

	.container {
		max-width: 100%;
		min-height: 100vh;
		background-color: white;
		display: flex;
		flex-direction: column;
		padding-bottom: 80px; /* Add padding for menu bar */
	}

	/* Profile header */
	.profile-header {
		padding: 15px;
		display: flex;
		align-items: center;
		z-index: 10;
	}

	.back-button {
		background: none;
		border: none;
		cursor: pointer;
		padding: 5px;
	}

	/* Profile photo */
	.profile-photo-container {
		position: relative;
		width: calc(100% - 20px);
		height: 40vh; /* Adjusted height for mobile */
		overflow: hidden;
		border-radius: 15px;
		margin: 0 10px;
	}

	@media (min-width: 768px) {
		.profile-photo-container {
			height: 50vh; /* Taller for larger screens */
		}
	}

	.profile-photo {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 15px;
	}

	.profile-name-container {
		position: absolute;
		bottom: 15px;
		left: 15px;
		right: 15px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap; /* Allow wrapping on very small screens */
	}

	.profile-name-info {
		display: flex;
		align-items: center;
		margin-bottom: 8px; /* Space if it wraps */
	}

	.profile-name-info h2 {
		color: white;
		font-size: 22px; /* Slightly smaller for mobile */
		font-weight: 600;
		text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
		margin-right: 8px;
	}

	@media (min-width: 768px) {
		.profile-name-info h2 {
			font-size: 24px;
		}
	}

	.verified-badge {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.message-button {
		display: flex;
		align-items: center;
		gap: 5px;
		background-color: rgba(255, 255, 255, 0.9);
		border: none;
		border-radius: 20px;
		padding: 8px 15px;
		font-size: 14px;
		font-weight: 500;
		cursor: pointer;
	}

	/* Profile info */
	.profile-info-container {
		padding: 15px;
		flex-grow: 1;
		overflow-y: auto; /* Allow scrolling on small screens */
	}

	.relationship-goal-container {
		width: 100%;
		margin-bottom: 10px;
		background-color: #fff5f7;
		border-radius: 10px;
		padding: 10px;
	}

	.profile-stats {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		background-color: #f0f8f0;
		border-radius: 15px;
		padding: 15px;
	}

	.stat-item {
		flex: 1 0 calc(50% - 10px); /* Two columns on mobile */
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 5px;
	}

	@media (max-width: 380px) {
		.stat-item {
			flex: 1 0 100%; /* One column on very small screens */
		}
	}

	@media (min-width: 768px) {
		.stat-item {
			flex: 1 0 calc(33.333% - 10px); /* Three columns on larger screens */
		}
	}

	.stat-icon {
		font-size: 20px;
		flex-shrink: 0; /* Prevent emoji from shrinking */
	}

	.stat-text {
		font-size: 14px;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.stat-languages {
		display: flex;
		flex-direction: column;
		gap: 5px;
		flex: 1;
	}
	
	.language-badge {
		background-color: #e8f4ff;
		padding: 4px 8px;
		border-radius: 10px;
		font-size: 13px;
		color: #0066cc;
		display: block;
		margin-bottom: 4px;
	}
	
	.hobby-badge {
		background-color: #f0f0f0;
		padding: 4px 8px;
		border-radius: 10px;
		font-size: 13px;
		color: #333;
		display: block;
		margin-bottom: 4px;
	}
	
	.relationship-goal {
		font-weight: 500;
		color: #d23f6a;
	}

	/* Profile prompts */
	.profile-prompts {
		margin-top: 15px;
	}

	.prompt-container {
		margin-bottom: 15px;
		padding: 15px;
		border: 1px dashed #ccc;
		border-radius: 10px;
	}

	.prompt-question {
		font-size: 16px;
		font-weight: 600;
		margin-bottom: 5px;
	}

	.prompt-answer {
		font-size: 14px;
		color: #666;
	}

	/* Recent events */
	.recent-events {
		margin-top: 15px;
	}

	.section-title {
		font-size: 18px;
		font-weight: 600;
		margin-bottom: 10px;
	}

	.events-container {
		display: flex;
		gap: 10px;
		overflow-x: auto;
		padding-bottom: 10px;
		-webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
		scrollbar-width: none; /* Hide scrollbar on Firefox */
	}

	.events-container::-webkit-scrollbar {
		display: none; /* Hide scrollbar on Chrome/Safari */
	}

	.event-card {
		position: relative;
		flex: 0 0 140px;
		height: 100px;
		border-radius: 10px;
		overflow: hidden;
	}

	@media (max-width: 380px) {
		.event-card {
			flex: 0 0 120px; /* Smaller cards on very small screens */
		}
	}

	.event-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.event-overlay {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 50%;
		background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
	}

	/* Updated Navigation bar to match second file */
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
		z-index: 100;
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
		width: 50px; /* Slightly smaller on mobile */
		height: 50px;
	}

	@media (min-width: 768px) {
		menu img {
			width: 60px; /* Original size on larger screens */
			height: 60px;
		}
	}

	/* Add safe area for devices with notches */
	@supports (padding: max(0px)) {
		menu {
			padding-bottom: max(10px, env(safe-area-inset-bottom));
		}
		
		.container {
			padding-bottom: calc(80px + env(safe-area-inset-bottom, 0px));
		}
	}
</style>
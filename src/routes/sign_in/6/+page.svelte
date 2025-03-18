<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let locationDetected = false;
	let userLocation = '';
	let locationAllowed = false;

	function goBack() {
		history.back();
	}

	function goNext() {
		goto('/sign_in/7');
	}

	function requestLocationPermission() {
		// Set loading state
		locationAllowed = true;

		// Simulate location detection with a short delay
		setTimeout(() => {
			userLocation = 'Philadelphia, PA';
			locationDetected = true;
		}, 1000);

		// In a real implementation, you would use the Geolocation API:
		/*
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					// Here you would use a geocoding service to get the city and state
					// For this example, we're just setting it directly
					userLocation = 'Philadelphia, PA';
					locationDetected = true;
				},
				(error) => {
					console.error('Error getting location:', error);
					locationAllowed = false;
				}
			);
		}
		*/
	}
</script>

<div class="container">
	<div class="header">
		<div class="back-button" on:click={goBack}>
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
				<path
					d="M15 18L9 12L15 6"
					stroke="black"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</div>

		<div class="basic-info">Basic Information</div>

		<div class="progress-bar">
			<div class="progress-step active"></div>
			<div class="progress-line"></div>
			<div class="progress-step active"></div>
			<div class="progress-line"></div>
			<div class="progress-step active"></div>
			<div class="progress-line"></div>
			<div class="progress-step active"></div>
			<div class="progress-line"></div>
			<div class="progress-step active"></div>
			<div class="progress-line"></div>
			<div class="progress-step"></div>
			<div class="progress-line"></div>
			<div class="progress-step"></div>
			<div class="progress-line"></div>
			<div class="progress-step"></div>
		</div>

		<div class="location-title">
			<h1>Location <span class="location-icon">📍</span></h1>
		</div>
	</div>

	<div class="location-container">
		{#if !locationDetected}
			<div class="info-container">
				<p class="location-info">
					If you would like personalized local event recommendations, please allow Happen to access
					your location while using the app. If not, you may manually input your location later on.
				</p>
			</div>

			<button
				class="allow-location-button"
				on:click={requestLocationPermission}
				disabled={locationAllowed}
			>
				{locationAllowed ? 'Detecting location...' : 'Allow Location Data'}
			</button>
		{:else}
			<div class="detected-location">
				<div class="location-icon-large">📍</div>
				<div class="location-text">
					<h2>Location Detected</h2>
					<p>{userLocation}</p>
				</div>
			</div>

			<p class="location-success">
				Great! Now you'll receive personalized event recommendations in your area.
			</p>
		{/if}
	</div>

	<button class="next-button" on:click={goNext}>
		Next <span class="arrow">›</span>
	</button>
</div>

<style>
	/* Import fonts */
	@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Nunito:wght@400;600;700&display=swap');

	/* Container and global styles */
	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: 'Roboto', sans-serif;
	}

	.container {
		max-width: 100%;
		min-height: 100vh;
		background-color: #f8f8f8;
		display: flex;
		flex-direction: column;
	}

	/* Header section */
	.header {
		background: linear-gradient(to bottom, #dcbcff, #f8f8f8);
		padding: 20px;
		color: #333;
	}

	.back-button {
		font-size: 24px;
		margin-bottom: 15px;
		cursor: pointer;
	}

	.basic-info {
		font-size: 16px;
		font-weight: 500;
		margin-bottom: 15px;
	}

	/* Progress bar */
	.progress-bar {
		display: flex;
		align-items: center;
		margin-bottom: 20px;
	}

	.progress-step {
		width: 16px;
		height: 16px;
		border-radius: 50%;
		border: 2px solid #ddd;
		background-color: #fff;
	}

	.progress-step.active {
		background-color: #7848FB;
		border-color: #7848FB;
	}

	.progress-line {
		flex: 1;
		height: 2px;
		background-color: #ddd;
	}

	/* Location title */
	.location-title {
		margin-bottom: 15px;
	}

	.location-title h1 {
		font-size: 24px;
		font-weight: 400;
		display: flex;
		align-items: center;
	}

	.location-icon {
		margin-left: 10px;
	}

	/* Location container and info styles */
	.location-container {
		padding: 20px;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		
		text-align: center;
	}

	.allow-location-button {
		background-color: #b388ff;
		color: white;
		border: none;
		border-radius: 30px;
		padding: 15px 20px;
		font-size: 16px;
		width: 100%;
		max-width: 300px;
		font-family: 'Nunito', sans-serif;
		cursor: pointer;
		margin-bottom: 15px;
	}

	.allow-location-button:disabled {
		opacity: 0.8;
		cursor: wait;
	}

	.info-container {
		padding: 0 15px;
		margin-bottom: 15px;
		width: 100%;
	}

	.location-info {
		text-align: center;
		color: #555;
		line-height: 1.5;
		font-size: 15px;
		max-width: 350px;
		margin: 0 auto;
		background-color: #f9f4ff;
		border-radius: 18px;
		padding: 22px 20px;
		position: relative;
		box-shadow: 0 2px 6px rgba(179, 136, 255, 0.1);
		border: 1px solid #e9dfff;
	}

	/* Add speech bubble triangle */
	.location-info:before {
		content: '';
		position: absolute;
		top: -12px;
		left: 50%;
		transform: translateX(-50%);
		width: 0;
		height: 0;
		border-left: 12px solid transparent;
		border-right: 12px solid transparent;
		border-bottom: 12px solid #f9f4ff;
	}

	/* Detected location */
	.detected-location {
		display: flex;
		align-items: center;
		background-color: white;
		padding: 20px;
		border-radius: 10px;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
		margin-top:60px;
		margin-bottom: 30px;
		width: 100%;
		max-width: 300px;
	}

	.location-icon-large {
		font-size: 24px;
		margin-right: 15px;
	}

	.location-text h2 {
		font-size: 18px;
		font-weight: 500;
		margin-bottom: 5px;
	}

	.location-text p {
		font-size: 16px;
		color: #555;
	}

	.location-success {
		text-align: center;
		color: #555;
		line-height: 1.5;
		font-size: 15px;
	}

	/* Next button */
	.next-button {
		background-color: #7848FB;
		color: white;
		border: none;
		border-radius: 30px;
		padding: 15px 20px;
		font-size: 16px;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		margin: 20px;
		font-family: 'Nunito', sans-serif;
		margin-top: auto;
	}

	.arrow {
		margin-left: 10px;
		font-size: 22px;
	}

	/* Responsive adjustments */
	@media (min-width: 600px) {
		.container {
			max-width: 450px;
			margin: 0 auto;
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		}
	}
</style>

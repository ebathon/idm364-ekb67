<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import iconImage from '$lib/image/Happen-icon-load.png';

	let animationStarted = false;
	let loadingComplete = false;

	onMount(() => {
		// Start animation after a short delay
		setTimeout(() => {
			animationStarted = true;

			// After animation completes, set loading as complete
			setTimeout(() => {
				loadingComplete = true;
			}, 2000); // Animation duration
		}, 800); // Initial delay before animation starts
	});

	// Handle the continue button click
	function handleContinue() {
		goto('/sign_in/2'); // Navigate to the sign in page
	}
</script>

<div class="welcome-container">
	<div class="content">
		<!-- Welcome text -->
		<div class="welcome-text">
			<h1>Welcome to <br /> Happen.</h1>
		</div>

		<!-- Logo container with animation -->
		<div class="logo-container {animationStarted ? 'animate' : ''}">
			<!-- App icon image -->
			<div class="app-icon">
				<img src={iconImage} alt="Happen Logo" />
			</div>
		</div>

		<!-- Continue button -->
		<div class="button-container">
			<button class="continue-button" on:click={handleContinue}> Continue </button>
		</div>
	</div>
</div>

<style>
	/* Base styles */
	@import url('https://fonts.googleapis.com/css2?family=Pathway+Extreme:wght@400;500;600;700&display=swap');

	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: 'Pathway Extreme', sans-serif;
	}

	.welcome-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(to bottom, #9370db, #8a2be2);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		padding: 40px 20px;
		overflow: hidden;
	}

	.content {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		max-width: 500px;
		margin: 0 auto;
	}

	/* Welcome text styles */
	.welcome-text {
		margin-top: 60px;
		text-align: left;
		width: 100%;
	}

	h1 {
		color: white;
		font-size: 42px;
		font-weight: 700;
		line-height: 1.2;
		font-family: 'Pathway Extreme', sans-serif;
	}

	/* Logo container and animation */
	.logo-container {
		position: relative;
		transition: transform 2s ease;
		transform: translateY(-100vh);
	}

	.logo-container.animate {
		transform: translateY(0);
	}

	/* App icon styling */
	.app-icon {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.app-icon img {
		width: 200px;
		height: 200px;
		filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
	}

	/* Continue button styles */
	.button-container {
		width: 100%;
		padding: 20px 0;
	}

	.continue-button {
		width: 100%;
		padding: 15px;
		background-color: white;
		color: #7848FB;
		border: none;
		border-radius: 30px;
		font-size: 18px;
		font-weight: 500;
		font-family: 'Pathway Extreme', sans-serif;
		cursor: pointer;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
		transition:
			background-color 0.3s,
			transform 0.2s;
	}

	.continue-button:hover {
		background-color: #f8f8f8;
	}

	.continue-button:active {
		transform: scale(0.98);
	}
</style>

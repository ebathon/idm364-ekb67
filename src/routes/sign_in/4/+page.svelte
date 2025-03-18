<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let firstName = '';
	let buttonEnabled = false;

	// Enable button when name is entered
	$: {
		buttonEnabled = firstName.trim().length > 0;
	}

	function goBack() {
		// Replace with appropriate navigation
		history.back();
	}

	function goNext() {
		if (buttonEnabled) {
			// Navigate to next screen - replace with your actual route
			goto('/sign_in/5');
		}
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
    <div class="progress-step"></div>
    <div class="progress-line"></div>
    <div class="progress-step"></div>
    <div class="progress-line"></div>
    <div class="progress-step"></div>
    <div class="progress-line"></div>
    <div class="progress-step"></div>
	 <div class="progress-line"></div>
    <div class="progress-step"></div>
	</div>
		<div class="name-title">
			<h1>Name</h1>
		</div>
	</div>

	<div class="name-input-container">
		<input
			type="text"
			bind:value={firstName}
			placeholder="What is your first name?"
			class="name-input"
		/>
	</div>

	<button
		class="next-button {buttonEnabled ? 'active' : 'disabled'}"
		on:click={goNext}
		disabled={!buttonEnabled}
	>
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

	/* Name title */
	.name-title {
		margin-bottom: 15px;
	}

	.name-title h1 {
		font-size: 24px;
		font-weight: 400;
	}

	/* Name input area */
	.name-input-container {
		padding: 10px 20px;
		flex-grow: 1;
	}

	.name-input {
		width: 100%;
		padding: 15px;
		border: 1px solid #ddd;
		border-radius: 8px;
		font-size: 16px;
		background-color: white;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
	}

	.name-input::placeholder {
		color: #888;
	}

	/* Next button */
	.next-button {
		background-color: #b388ff;
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

	.next-button.disabled {
		background-color: #cccccc;
		cursor: not-allowed;
		opacity: 0.7;
	}

	.next-button.active {
		background-color: #7848FB;
		cursor: pointer;
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

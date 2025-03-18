<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	// State for selected values
	let selectedCigaretteFrequency = null;
	let selectedMarijuanaFrequency = null;
	let hideSmokingHabits = false;
	
	// Button state
	let buttonEnabled = false;
	
	// Smoking frequency options
	const frequencyOptions = [
		'Often',
		'On the weekends',
		'On special occasions',
		'Rarely',
		'Never'
	];
	
	// Update button state
	$: {
		buttonEnabled = selectedCigaretteFrequency !== null && selectedMarijuanaFrequency !== null;
	}
	
	function goBack() {
		history.back();
	}
	
	function goNext() {
		if (buttonEnabled) {
			goto('/sign_in/18');
		}
	}
	
	function skipSection() {
		goto('/sign_in/18');
	}
	
	function selectCigaretteFrequency(frequency) {
		selectedCigaretteFrequency = frequency;
	}
	
	function selectMarijuanaFrequency(frequency) {
		selectedMarijuanaFrequency = frequency;
	}
	
	function toggleHideSmokingHabits() {
		hideSmokingHabits = !hideSmokingHabits;
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

		<div class="connections-info">Deeper connections</div>
		
		<div class="skip-section">
			<button class="skip-button" on:click={skipSection}>Skip Section</button>
		</div>

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
		</div>

		<div class="smoking-title">
			<h1>Smoking Habits <span class="smoke-icon">🚬</span></h1>
		</div>
	</div>

	<div class="form-container">
		<div class="form-field">
			<label>How often do you smoke cigarettes / vape?</label>
			<div class="frequency-options">
				{#each frequencyOptions as frequency}
					<button 
						class="frequency-option {selectedCigaretteFrequency === frequency ? 'active' : ''}" 
						on:click={() => selectCigaretteFrequency(frequency)}
					>
						{frequency}
					</button>
				{/each}
			</div>
		</div>
		
		<div class="form-field">
			<label>How often do you smoke marijuana?</label>
			<div class="frequency-options">
				{#each frequencyOptions as frequency}
					<button 
						class="frequency-option {selectedMarijuanaFrequency === frequency ? 'active' : ''}" 
						on:click={() => selectMarijuanaFrequency(frequency)}
					>
						{frequency}
					</button>
				{/each}
			</div>
		</div>
		
		<div class="hide-option">
			<button 
				class="toggle-button {hideSmokingHabits ? 'active' : ''}" 
				on:click={toggleHideSmokingHabits}
			>
				<div class="toggle-indicator"></div>
				<div class="toggle-text">
					Hide from profile
				</div>
			</button>
		</div>
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
		position: relative;
	}

	.back-button {
		font-size: 24px;
		margin-bottom: 15px;
		cursor: pointer;
	}

	.connections-info {
		font-size: 16px;
		font-weight: 500;
		margin-bottom: 15px;
	}
	
	.skip-section {
		position: absolute;
		top: 20px;
		right: 20px;
	}
	
	.skip-button {
		background: none;
		border: none;
		color: #6200ee;
		font-size: 14px;
		font-weight: 500;
		cursor: pointer;
		text-decoration: none;
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
		background-color: #7a7a7a;
		border-color: #7a7a7a;
	}

	.progress-line {
		flex: 1;
		height: 2px;
		background-color: #ddd;
	}

	/* Form title */
	.smoking-title {
		margin-bottom: 15px;
	}

	.smoking-title h1 {
		font-size: 24px;
		font-weight: 400;
		display: flex;
		align-items: center;
	}

	.smoke-icon {
		margin-left: 10px;
	}

	/* Form container */
	.form-container {
		padding: 20px;
		flex-grow: 1;
	}

	.form-field {
		margin-bottom: 25px;
	}

	.form-field label {
		display: block;
		font-size: 16px;
		font-weight: 500;
		margin-bottom: 15px;
		color: #333;
	}

	/* Frequency options */
	.frequency-options {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}
	
	.frequency-option {
		background-color: #f0f0f0;
		border: 1px solid #ddd;
		border-radius: 20px;
		padding: 10px 15px;
		font-size: 14px;
		cursor: pointer;
		transition: background-color 0.2s;
		color: #555;
	}
	
	.frequency-option.active {
		background-color: #e0caff;
		border-color: #b388ff;
		color: #333;
	}
	
	/* Hide option */
	.hide-option {
		margin-top: 10px;
	}
	
	/* Toggle button style */
	.toggle-button {
		display: flex;
		align-items: center;
		background-color: #f0f0f0;
		border: 1px solid #ddd;
		border-radius: 30px;
		padding: 8px 15px;
		cursor: pointer;
		transition: background-color 0.2s;
	}
	
	.toggle-button.active {
		background-color: #e0caff;
		border-color: #b388ff;
	}
	
	.toggle-indicator {
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background-color: #ccc;
		margin-right: 10px;
		transition: background-color 0.2s;
	}
	
	.toggle-button.active .toggle-indicator {
		background-color: #b388ff;
	}
	
	.toggle-text {
		font-size: 14px;
		color: #555;
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
		background-color: #b388ff;
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
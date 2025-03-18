<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	// State for selected values
	let feet = 5;
	let inches = 8;
	let hideHeight = false;
	
	// Dropdown states
	let isFeetOpen = false;
	let isInchesOpen = false;
	
	// Button state
	let buttonEnabled = true; // Always enabled since we have default values
	
	// Height options
	const feetOptions = Array.from({ length: 8 }, (_, i) => i + 1); // 1-8 feet
	const inchesOptions = Array.from({ length: 12 }, (_, i) => i); // 0-11 inches
	
	function goBack() {
		history.back();
	}
	
	function goNext() {
		goto('/sign_in/10');
	}
	
	// Toggle custom dropdowns
	function toggleFeetDropdown() {
		isFeetOpen = !isFeetOpen;
		isInchesOpen = false;
	}
	
	function toggleInchesDropdown() {
		isInchesOpen = !isInchesOpen;
		isFeetOpen = false;
	}
	
	// Toggle height visibility preference
	function toggleHideHeight() {
		hideHeight = !hideHeight;
	}
	
	// Select options in custom dropdowns
	function selectFeet(value) {
		feet = value;
		isFeetOpen = false;
	}
	
	function selectInches(value) {
		inches = value;
		isInchesOpen = false;
	}
	
	// Close dropdowns when clicking outside
	onMount(() => {
		document.addEventListener('click', (event) => {
			const feetDropdown = document.getElementById('feet-dropdown');
			const inchesDropdown = document.getElementById('inches-dropdown');
			const feetSelect = document.getElementById('feet-select');
			const inchesSelect = document.getElementById('inches-select');
			
			if (feetDropdown && !feetDropdown.contains(event.target) && !feetSelect.contains(event.target)) {
				isFeetOpen = false;
			}
			
			if (inchesDropdown && !inchesDropdown.contains(event.target) && !inchesSelect.contains(event.target)) {
				isInchesOpen = false;
			}
		});
	});
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
			<div class="progress-step active"></div>
			<div class="progress-line"></div>
			<div class="progress-step active"></div>
			<div class="progress-line"></div>
			<div class="progress-step active"></div>
			<div class="progress-line"></div>
			<div class="progress-step active"></div>
		</div>

		<div class="height-title">
			<h1>Height <span class="ruler-icon">📏</span></h1>
		</div>
	</div>

	<div class="form-container">
		<div class="height-input-container">
			<div class="height-input-group">
				<div class="custom-select-container">
					<div class="custom-select" id="feet-select" on:click={toggleFeetDropdown}>
						<div class="selected-option">{feet}</div>
						<button class="caret-button">
							<svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M1 1L6 7L11 1" stroke="#666666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</button>
					</div>
					
					{#if isFeetOpen}
						<div class="dropdown-options" id="feet-dropdown">
							{#each feetOptions as value}
								<div 
									class="dropdown-option {feet === value ? 'selected' : ''}" 
									on:click={() => selectFeet(value)}
								>
									{value}
								</div>
							{/each}
						</div>
					{/if}
				</div>
				
				<span class="unit">ft</span>
			</div>
			
			<div class="height-input-group">
				<div class="custom-select-container">
					<div class="custom-select" id="inches-select" on:click={toggleInchesDropdown}>
						<div class="selected-option">{inches}</div>
						<button class="caret-button">
							<svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M1 1L6 7L11 1" stroke="#666666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</button>
					</div>
					
					{#if isInchesOpen}
						<div class="dropdown-options" id="inches-dropdown">
							{#each inchesOptions as value}
								<div 
									class="dropdown-option {inches === value ? 'selected' : ''}" 
									on:click={() => selectInches(value)}
								>
									{value}
								</div>
							{/each}
						</div>
					{/if}
				</div>
				
				<span class="unit">in</span>
			</div>
		</div>
		
		<div class="hide-option">
			<button 
				class="toggle-button {hideHeight ? 'active' : ''}" 
				on:click={toggleHideHeight}
			>
				<div class="toggle-indicator"></div>
				<div class="toggle-text">
					Hide from profile
				</div>
			</button>
		</div>
	</div>

	<button
		class="next-button"
		on:click={goNext}
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
		background-color: #7a7a7a;
		border-color: #7a7a7a;
	}

	.progress-line {
		flex: 1;
		height: 2px;
		background-color: #ddd;
	}

	/* Form title */
	.height-title {
		margin-bottom: 15px;
	}

	.height-title h1 {
		font-size: 24px;
		font-weight: 400;
		display: flex;
		align-items: center;
	}

	.ruler-icon {
		margin-left: 10px;
	}

	/* Form container */
	.form-container {
		padding: 60px;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
        
	}

	/* Height input */
	.height-input-container {
		display: flex;
		gap: 20px;
		margin-bottom: 20px;
	}

	.height-input-group {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.custom-select-container {
		position: relative;
	}

	.custom-select {
		width: 100px;
		padding: 12px 15px;
		border: 1px solid #ddd;
		border-radius: 25px;
		font-size: 16px;
		background-color: white;
		cursor: pointer;
		display: flex;
		align-items: center;
		position: relative;
		justify-content: space-between;
	}
	
	.selected-option {
		font-weight: 500;
		text-align: center;
		flex: 1;
		color: #333;
	}
	
	.dropdown-options {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		max-height: 200px;
		overflow-y: auto;
		background-color: white;
		border: 1px solid #ddd;
		border-radius: 8px;
		margin-top: 5px;
		z-index: 100;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}
	
	.dropdown-option {
		padding: 12px 15px;
		cursor: pointer;
		transition: background-color 0.2s;
		font-size: 16px;
		text-align: center;
	}
	
	.dropdown-option:hover {
		background-color: #f0e1ff;
	}
	
	.dropdown-option.selected {
		background-color: #e0caff;
		font-weight: 500;
	}
	
	.unit {
		font-size: 18px;
		color: #555;
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
	
	/* Scrollbar styling */
	.dropdown-options::-webkit-scrollbar {
		width: 8px;
	}
	
	.dropdown-options::-webkit-scrollbar-track {
		background: #f1f1f1;
		border-radius: 10px;
	}
	
	.dropdown-options::-webkit-scrollbar-thumb {
		background: #b388ff;
		border-radius: 10px;
	}
	
	.caret-button {
		background: transparent;
		border: none;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
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
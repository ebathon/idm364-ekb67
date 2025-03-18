<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	// State for selected values
	let selectedAffiliation = null;
	let hideAffiliation = false;
	let showAffiliationList = false;
	
	// Button state
	let buttonEnabled = false;
	
	// List of political affiliations
	const affiliations = [
		'Democrat',
		'Republican',
		'Independent',
		'Libertarian',
		'Green Party',
		'Constitution Party',
		'Working Families Party',
		'Democratic Socialist',
		'Conservative',
		'Progressive',
		'Moderate',
		'Non-Political',
		'Prefer not to say'
	];
	
	// Update button state
	$: {
		buttonEnabled = selectedAffiliation !== null;
	}
	
	function goBack() {
		history.back();
	}
	
	function goNext() {
		if (buttonEnabled) {
			goto('/sign_in/15');
		}
	}
	
	function skipSection() {
		goto('/sign_in/15');
	}
	
	function toggleAffiliationList() {
		showAffiliationList = !showAffiliationList;
	}
	
	function selectAffiliation(affiliation) {
		selectedAffiliation = affiliation;
		showAffiliationList = false;
	}
	
	function toggleHideAffiliation() {
		hideAffiliation = !hideAffiliation;
	}
	
	// Close dropdown when clicking outside
	onMount(() => {
		document.addEventListener('click', (event) => {
			const selectButton = document.getElementById('affiliation-select');
			const dropdown = document.getElementById('affiliation-dropdown');
			
			if (selectButton && dropdown && !selectButton.contains(event.target) && !dropdown.contains(event.target)) {
				showAffiliationList = false;
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

		<div class="connections-info">Deeper connections</div>
		
		<div class="skip-section">
			<button class="skip-button" on:click={skipSection}>Skip Section</button>
		</div>

		<div class="progress-bar">
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

		<div class="political-title">
			<h1>Political Affiliation <span class="capitol-icon">🏛️</span></h1>
		</div>
	</div>

	<div class="form-container">
		<div class="form-field">
			<label for="affiliation-select">Political Affiliation</label>
			<div class="dropdown-container">
				<button class="select-button" id="affiliation-select" on:click={toggleAffiliationList}>
					<div class="selected-option">{selectedAffiliation || 'Select'}</div>
					<div class="caret-icon {showAffiliationList ? 'open' : ''}">
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M6 9L12 15L18 9" stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</div>
				</button>
				
				{#if showAffiliationList}
					<div class="dropdown-list" id="affiliation-dropdown">
						{#each affiliations as affiliation}
							<div 
								class="dropdown-option {selectedAffiliation === affiliation ? 'selected' : ''}" 
								on:click={() => selectAffiliation(affiliation)}
							>
								{affiliation}
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>
		
		<div class="hide-option">
			<button 
				class="toggle-button {hideAffiliation ? 'active' : ''}" 
				on:click={toggleHideAffiliation}
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
		background-color: #7848FB;
		border-color: #7848FB;
	}

	.progress-line {
		flex: 1;
		height: 2px;
		background-color: #ddd;
	}

	/* Form title */
	.political-title {
		margin-bottom: 15px;
	}

	.political-title h1 {
		font-size: 24px;
		font-weight: 400;
		display: flex;
		align-items: center;
	}

	.capitol-icon {
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
		margin-bottom: 10px;
		color: #333;
	}

	/* Dropdown styles */
	.dropdown-container {
		position: relative;
		width: 100%;
	}

	.select-button {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: white;
		border: 1px solid #ddd;
		border-radius: 10px;
		padding: 15px;
		width: 100%;
		font-size: 16px;
		color: #888;
		cursor: pointer;
		transition: background-color 0.2s;
		text-align: left;
	}
	
	.selected-option {
		color: #555;
	}
	
	.caret-icon {
		transform: rotate(0deg);
		transition: transform 0.3s ease;
	}
	
	.caret-icon.open {
		transform: rotate(180deg);
	}
	
	.dropdown-list {
		background-color: white;
		border: 1px solid #ddd;
		border-radius: 10px;
		margin-top: 5px;
		max-height: 300px;
		overflow-y: auto;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		z-index: 100;
	}
	
	.dropdown-option {
		padding: 15px;
		background-color: #f5f5f5;
		margin: 5px;
		border-radius: 8px;
		cursor: pointer;
		transition: background-color 0.2s;
		text-align: left;
	}
	
	.dropdown-option:hover {
		background-color: #f0e1ff;
	}
	
	.dropdown-option.selected {
		background-color: #e0caff;
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
	.dropdown-list::-webkit-scrollbar {
		width: 8px;
	}
	
	.dropdown-list::-webkit-scrollbar-track {
		background: #f1f1f1;
		border-radius: 10px;
	}
	
	.dropdown-list::-webkit-scrollbar-thumb {
		background: #b388ff;
		border-radius: 10px;
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
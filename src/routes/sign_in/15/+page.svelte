<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	// State for selected values
	let selectedReligion = null;
	let hideReligion = false;
	let showReligionList = false;
	let searchTerm = '';
	
	// Button state
	let buttonEnabled = false;
	
	// List of religions
	const religions = [
		'Christianity',
		'Islam',
		'Hinduism',
		'Buddhism',
		'Judaism',
		'Sikhism',
		'Baháʼí Faith',
		'Jainism',
		'Shinto',
		'Taoism',
		'Confucianism',
		'Traditional Indigenous Beliefs',
		'Paganism',
		'Wicca',
		'Atheism',
		'Agnosticism',
		'Humanism',
		'Spiritual but not religious',
		'Not religious',
		'Prefer not to say'
	];
	
	// Filtered religions based on search
	$: filteredReligions = searchTerm 
		? religions.filter(religion => religion.toLowerCase().includes(searchTerm.toLowerCase()))
		: religions;
	
	// Update button state
	$: buttonEnabled = selectedReligion !== null;
	
	function goBack() {
		history.back();
	}
	
	function goNext() {
		if (buttonEnabled) {
			goto('/sign_in/16');
		}
	}
	
	function skipSection() {
		goto('/sign_in/16');
	}
	
	function toggleReligionList() {
		showReligionList = !showReligionList;
		searchTerm = '';
	}
	
	function selectReligion(religion) {
		selectedReligion = religion;
		showReligionList = false;
		searchTerm = '';
	}
	
	function toggleHideReligion() {
		hideReligion = !hideReligion;
	}
	
	function handleSearchInput(event) {
		searchTerm = event.target.value;
	}
	
	// Close dropdown when clicking outside
	onMount(() => {
		const handleClickOutside = (event) => {
			const selectButton = document.getElementById('religion-select');
			const dropdown = document.getElementById('religion-dropdown');
			
			if (selectButton && dropdown && 
				!selectButton.contains(event.target) && 
				!dropdown.contains(event.target)) {
				showReligionList = false;
			}
		};
		
		document.addEventListener('click', handleClickOutside);
		
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
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
			<div class="progress-step active"></div>
			<div class="progress-line"></div>
			<div class="progress-step"></div>
			<div class="progress-line"></div>
			<div class="progress-step"></div>
			<div class="progress-line"></div>
			<div class="progress-step"></div>
			<div class="progress-line"></div>
			<div class="progress-step"></div>
		</div>

		<div class="religion-title">
			<h1>Religious Beliefs <span class="religion-icon">🙏</span></h1>
		</div>
	</div>

	<div class="form-container">
		<div class="form-field">
			<label for="religion-select">Do you practice religion?</label>
			<div class="dropdown-container">
				<button class="select-button" id="religion-select" on:click={toggleReligionList}>
					<div class="selected-option">{selectedReligion || 'Select'}</div>
					<div class="caret-icon">
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M6 9L12 15L18 9" stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</div>
				</button>
				
				{#if showReligionList}
					<div class="dropdown-list" id="religion-dropdown">
						<div class="search-container">
							<input 
								type="text" 
								placeholder="Search religion..." 
								class="search-input" 
								value={searchTerm} 
								on:input={handleSearchInput}
							/>
						</div>
						<div class="options-container">
							{#if filteredReligions.length > 0}
								{#each filteredReligions as religion}
									<div 
										class="dropdown-option {selectedReligion === religion ? 'selected' : ''}" 
										on:click={() => selectReligion(religion)}
									>
										{religion}
									</div>
								{/each}
							{:else}
								<div class="no-results">No matching religions found</div>
							{/if}
						</div>
					</div>
				{/if}
			</div>
		</div>
		
		<div class="hide-option">
			<button 
				class="toggle-button {hideReligion ? 'active' : ''}" 
				on:click={toggleHideReligion}
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
	.religion-title {
		margin-bottom: 15px;
	}

	.religion-title h1 {
		font-size: 24px;
		font-weight: 400;
		display: flex;
		align-items: center;
	}

	.religion-icon {
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
	
	.dropdown-list {
		background-color: white;
		border: 1px solid #ddd;
		border-radius: 10px;
		margin-top: 5px;
		max-height: 350px;
		overflow: hidden;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		z-index: 100;
		display: flex;
		flex-direction: column;
	}
	
	.search-container {
		padding: 10px;
		border-bottom: 1px solid #eee;
		background-color: white;
		position: sticky;
		top: 0;
		z-index: 1;
	}
	
	.search-input {
		width: 100%;
		padding: 10px 15px;
		border: 1px solid #ddd;
		border-radius: 8px;
		font-size: 16px;
		background-color: #f9f9f9;
	}
	
	.search-input:focus {
		outline: none;
		border-color: #b388ff;
		background-color: white;
	}
	
	.options-container {
		overflow-y: auto;
		max-height: 280px;
		padding: 5px;
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
	
	.no-results {
		padding: 20px;
		text-align: center;
		color: #888;
		font-style: italic;
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
	.options-container::-webkit-scrollbar {
		width: 8px;
	}
	
	.options-container::-webkit-scrollbar-track {
		background: #f1f1f1;
		border-radius: 10px;
	}
	
	.options-container::-webkit-scrollbar-thumb {
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
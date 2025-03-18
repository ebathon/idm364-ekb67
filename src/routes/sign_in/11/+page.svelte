<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	// State for selected values
	let occupationInput = '';
	let hideOccupation = false;
	let filteredOccupations = [];
	let showOccupationDropdown = false;
	
	// Button state
	let buttonEnabled = false;
	
	// List of common occupations
	const occupations = [
		'Software Engineer',
		'Doctor',
		'Nurse',
		'Teacher',
		'Professor',
		'Lawyer',
		'Accountant',
		'Marketing Manager',
		'Graphic Designer',
		'UX/UI Designer',
		'Product Manager',
		'Data Scientist',
		'Business Analyst',
		'Financial Analyst',
		'Sales Representative',
		'Customer Service Representative',
		'Administrative Assistant',
		'Human Resources Manager',
		'Project Manager',
		'Architect',
		'Engineer',
		'Chef',
		'Electrician',
		'Plumber',
		'Carpenter',
		'Mechanic',
		'Police Officer',
		'Firefighter',
		'Paramedic',
		'Flight Attendant',
		'Pilot',
		'Writer',
		'Editor',
		'Journalist',
		'Pharmacist',
		'Dentist',
		'Veterinarian',
		'Physical Therapist',
		'Occupational Therapist',
		'Speech Therapist',
		'Social Worker',
		'Psychologist',
		'Counselor',
		'Real Estate Agent',
		'Interior Designer',
		'Photographer',
		'Artist',
		'Actor',
		'Musician',
		'Entrepreneur',
		'Student',
		'Retired',
		'Freelancer'
	];
	
	// Handle occupation input changes
	function handleOccupationInput() {
		// Update button state
		buttonEnabled = occupationInput.trim().length > 0;
		
		if (occupationInput.length > 0) {
			// Filter occupations that match the input
			filteredOccupations = occupations.filter(occupation => 
				occupation.toLowerCase().includes(occupationInput.toLowerCase())
			).slice(0, 5); // Limit to 5 results
			
			showOccupationDropdown = filteredOccupations.length > 0;
		} else {
			showOccupationDropdown = false;
		}
	}
	
	// Select occupation from the autocomplete
	function selectOccupation(occupation) {
		occupationInput = occupation;
		showOccupationDropdown = false;
		buttonEnabled = true;
	}
	
	function goBack() {
		history.back();
	}
	
	function goNext() {
		if (buttonEnabled) {
			goto('/sign_in/12');
		}
	}
	
	function skipSection() {
		goto('/sign_in/12');
	}
	
	// Toggle occupation visibility preference
	function toggleHideOccupation() {
		hideOccupation = !hideOccupation;
	}
	
	// Close dropdown when clicking outside
	onMount(() => {
		document.addEventListener('click', (event) => {
			const searchInput = document.getElementById('occupation-input');
			const dropdown = document.getElementById('occupation-dropdown');
			
			if (searchInput && dropdown && !searchInput.contains(event.target) && !dropdown.contains(event.target)) {
				showOccupationDropdown = false;
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

		<div class="lifestyle-info">Lifestyle</div>
		
		<div class="skip-section">
			<button class="skip-button" on:click={skipSection}>Skip Section</button>
		</div>

		<div class="progress-bar">
			<div class="progress-step active"></div>
			<div class="progress-line"></div>
			<div class="progress-step active"></div>
			<div class="progress-line"></div>
			<div class="progress-step"></div>
		</div>

		<div class="occupation-title">
			<h1>Occupation <span class="occupation-icon">💼</span></h1>
		</div>
	</div>

	<div class="form-container">
		<div class="form-field">
			<label for="occupation-input">What do you do for work?</label>
			<div class="search-wrapper">
				<input 
					type="text" 
					id="occupation-input" 
					bind:value={occupationInput} 
					on:input={handleOccupationInput}
					placeholder="Search"
					class="search-input"
				/>
				<div class="search-icon">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
						<path d="M21 21L16.65 16.65" stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</div>
				
				{#if showOccupationDropdown}
					<div class="autocomplete-options" id="occupation-dropdown">
						{#each filteredOccupations as occupation}
							<div 
								class="autocomplete-option" 
								on:click={() => selectOccupation(occupation)}
							>
								{occupation}
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>
		
		<div class="hide-option">
			<button 
				class="toggle-button {hideOccupation ? 'active' : ''}" 
				on:click={toggleHideOccupation}
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

	.lifestyle-info {
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
	.occupation-title {
		margin-bottom: 15px;
	}

	.occupation-title h1 {
		font-size: 24px;
		font-weight: 400;
		display: flex;
		align-items: center;
	}

	.occupation-icon {
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

	/* Search field styles */
	.search-wrapper {
		position: relative;
		width: 100%;
	}

	.search-input {
		width: 100%;
		padding: 12px 15px;
		padding-right: 40px;
		border: 1px solid #ddd;
		border-radius: 25px;
		font-size: 16px;
		background-color: white;
	}
	
	.search-input:focus {
		outline: none;
		border-color: #b388ff;
	}
	
	.search-icon {
		position: absolute;
		top: 50%;
		right: 15px;
		transform: translateY(-50%);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	/* Autocomplete styles */
	.autocomplete-options {
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
	
	.autocomplete-option {
		padding: 12px 15px;
		cursor: pointer;
		transition: background-color 0.2s;
		font-size: 16px;
	}
	
	.autocomplete-option:hover {
		background-color: #f0e1ff;
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
	.autocomplete-options::-webkit-scrollbar {
		width: 8px;
	}
	
	.autocomplete-options::-webkit-scrollbar-track {
		background: #f1f1f1;
		border-radius: 10px;
	}
	
	.autocomplete-options::-webkit-scrollbar-thumb {
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
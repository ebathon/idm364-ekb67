<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	// State for selected values
	let selectedEducation = null;
	let schoolInput = '';
	let hideEducation = false;
	let filteredSchools = [];
	let showSchoolDropdown = false;
	
	// Dropdown states
	let isEducationOpen = false;
	
	// Education options
	const educationOptions = [
		'High School',
		'Some College',
		'Associate\'s Degree',
		'Bachelor\'s Degree',
		'Master\'s Degree',
		'Doctoral Degree',
		'Professional Degree',
		'Trade School',
		'Vocational Training'
	];
	
	// List of US colleges and universities (abbreviated for demo)
	// In a real app, this would be a more complete list or fetched from an API
	const allSchools = [
		'Harvard University',
		'Stanford University',
		'Massachusetts Institute of Technology',
		'Yale University',
		'Princeton University',
		'Columbia University',
		'University of Chicago',
		'University of Pennsylvania',
		'California Institute of Technology',
        'Drexel University',
		'Duke University',
		'University of California, Berkeley',
		'Northwestern University',
		'Johns Hopkins University',
		'University of California, Los Angeles',
		'University of Michigan',
		'New York University',
		'Cornell University',
		'University of Texas at Austin',
		'University of Washington',
		'University of Wisconsin-Madison',
		'Boston University',
		'Pennsylvania State University',
		'University of Minnesota',
		'University of Illinois at Urbana-Champaign',
		'Ohio State University',
		'University of Virginia',
		'Purdue University',
		'University of North Carolina at Chapel Hill',
		'University of Florida',
		'Georgia Institute of Technology'
	];
	
	// Handle school input changes
	function handleSchoolInput() {
		if (schoolInput.length > 0) {
			// Filter schools that match the input
			filteredSchools = allSchools.filter(school => 
				school.toLowerCase().includes(schoolInput.toLowerCase())
			).slice(0, 5); // Limit to 5 results
			
			showSchoolDropdown = filteredSchools.length > 0;
		} else {
			showSchoolDropdown = false;
		}
	}
	
	// Select a school from the autocomplete
	function selectSchool(school) {
		schoolInput = school;
		showSchoolDropdown = false;
	}
	
	function goBack() {
		history.back();
	}
	
	function goNext() {
		goto('/lifestyle/2');
	}
	
	function skipSection() {
		goto('/lifestyle/2');
	}
	
	// Toggle custom dropdowns
	function toggleEducationDropdown() {
		isEducationOpen = !isEducationOpen;
	}
	
	// Toggle education visibility preference
	function toggleHideEducation() {
		hideEducation = !hideEducation;
	}
	
	// Select education level
	function selectEducation(education) {
		selectedEducation = education;
		isEducationOpen = false;
	}
	
	// Close dropdowns when clicking outside
	onMount(() => {
		document.addEventListener('click', (event) => {
			const educationDropdown = document.getElementById('education-dropdown');
			const educationSelect = document.getElementById('education-select');
			
			if (educationDropdown && !educationDropdown.contains(event.target) && !educationSelect.contains(event.target)) {
				isEducationOpen = false;
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
			<div class="progress-step"></div>
			<div class="progress-line"></div>
			<div class="progress-step"></div>
		</div>

		<div class="education-title">
			<h1>Education <span class="education-icon">🎓</span></h1>
		</div>
	</div>

	<div class="form-container">
		<div class="form-field">
			<label for="education-select">What is your highest level of education?</label>
			<div class="select-wrapper">
				<div class="custom-select" id="education-select" on:click={toggleEducationDropdown}>
					<div class="selected-option">{selectedEducation || 'Select'}</div>
					<button class="caret-button">
						<svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M1 1L6 7L11 1" stroke="#666666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</button>
				</div>
				
				{#if isEducationOpen}
					<div class="dropdown-options" id="education-dropdown">
						{#each educationOptions as education}
							<div 
								class="dropdown-option {selectedEducation === education ? 'selected' : ''}" 
								on:click={() => selectEducation(education)}
							>
								{education}
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>
		
		<div class="form-field">
			<label for="school-input">Where are you studying?</label>
			<div class="input-wrapper">
				<input 
					type="text" 
					id="school-input" 
					bind:value={schoolInput} 
					on:input={handleSchoolInput}
					placeholder="Enter your value"
					class="text-input"
				/>
				
				{#if showSchoolDropdown}
					<div class="autocomplete-options">
						{#each filteredSchools as school}
							<div 
								class="autocomplete-option" 
								on:click={() => selectSchool(school)}
							>
								{school}
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>
		
		<div class="hide-option">
			<button 
				class="toggle-button {hideEducation ? 'active' : ''}" 
				on:click={toggleHideEducation}
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
	.education-title {
		margin-bottom: 15px;
	}

	.education-title h1 {
		font-size: 24px;
		font-weight: 400;
		display: flex;
		align-items: center;
	}

	.education-icon {
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

	/* Custom dropdown styles */
	.select-wrapper {
		position: relative;
		width: 100%;
	}

	.custom-select {
		width: 100%;
		padding: 12px 15px;
		border: 1px solid #ddd;
		border-radius: 10px;
		font-size: 16px;
		background-color: white;
		cursor: pointer;
		display: flex;
		align-items: center;
		position: relative;
	}
	
	.selected-option {
		flex: 1;
		color: #555;
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
	}
	
	.dropdown-option:hover {
		background-color: #f0e1ff;
	}
	
	.dropdown-option.selected {
		background-color: #e0caff;
		font-weight: 500;
	}
	
	/* Text input styles */
	.input-wrapper {
		position: relative;
		width: 100%;
	}
	
	.text-input {
		width: 100%;
		padding: 12px 15px;
		border: 1px solid #ddd;
		border-radius: 10px;
		font-size: 16px;
		background-color: white;
	}
	
	.text-input:focus {
		outline: none;
		border-color: #b388ff;
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
	.dropdown-options::-webkit-scrollbar,
	.autocomplete-options::-webkit-scrollbar {
		width: 8px;
	}
	
	.dropdown-options::-webkit-scrollbar-track,
	.autocomplete-options::-webkit-scrollbar-track {
		background: #f1f1f1;
		border-radius: 10px;
	}
	
	.dropdown-options::-webkit-scrollbar-thumb,
	.autocomplete-options::-webkit-scrollbar-thumb {
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
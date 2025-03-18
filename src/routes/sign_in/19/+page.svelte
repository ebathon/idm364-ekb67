<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	// State for selected values
	let ethnicitySearchTerm = '';
	let languageSearchTerm = '';
	let selectedEthnicity = null;
	let selectedLanguages = [];
	let showEthnicityList = false;
	let showLanguageList = false;
	let hideEthnicityLanguages = false;
	
	// Button state
	let buttonEnabled = false;
	
	// Lists of ethnicities and languages
	const ethnicities = [
		'African',
		'African American',
		'Arab',
		'Asian',
		'Bangladeshi',
		'Black British',
		'Caribbean',
		'Chinese',
		'East Asian',
		'Filipino',
		'Hispanic/Latino',
		'Indian',
		'Indigenous',
		'Japanese',
		'Korean',
		'Middle Eastern',
		'Native American',
		'Pacific Islander',
		'Pakistani',
		'South Asian',
		'Southeast Asian',
		'White/Caucasian',
		'Mixed/Multiracial',
		'Other'
	];
	
	const languages = [
		'English',
		'Spanish',
		'Mandarin Chinese',
		'Hindi',
		'Arabic',
		'Portuguese',
		'Bengali',
		'Russian',
		'Japanese',
		'Punjabi',
		'German',
		'Javanese',
		'Wu Chinese',
		'Telugu',
		'Vietnamese',
		'Korean',
		'French',
		'Marathi',
		'Tamil',
		'Urdu',
		'Turkish',
		'Italian',
		'Thai',
		'Persian',
		'Polish',
		'Romanian',
		'Dutch',
		'Greek',
		'Swahili',
		'Hebrew'
	];
	
	// Filtered lists based on search
	$: filteredEthnicities = ethnicitySearchTerm 
		? ethnicities.filter(ethnicity => 
			ethnicity.toLowerCase().includes(ethnicitySearchTerm.toLowerCase()))
		: ethnicities;
	
	$: filteredLanguages = languageSearchTerm 
		? languages.filter(language => 
			language.toLowerCase().includes(languageSearchTerm.toLowerCase()) && 
			!selectedLanguages.includes(language))
		: languages.filter(language => !selectedLanguages.includes(language));
	
	// Update button state
	$: {
		buttonEnabled = selectedEthnicity !== null && selectedLanguages.length > 0;
	}
	
	function goBack() {
		history.back();
	}
	
	function goNext() {
		if (buttonEnabled) {
			goto('/sign_in/20');
		}
	}
	
	function skipSection() {
		goto('/sign_in/20');
	}
	
	function toggleEthnicityList() {
		showEthnicityList = !showEthnicityList;
		showLanguageList = false;
		ethnicitySearchTerm = '';
	}
	
	function toggleLanguageList() {
		showLanguageList = !showLanguageList;
		showEthnicityList = false;
		languageSearchTerm = '';
	}
	
	function selectEthnicity(ethnicity) {
		selectedEthnicity = ethnicity;
		showEthnicityList = false;
		ethnicitySearchTerm = '';
	}
	
	function addLanguage(language) {
		if (!selectedLanguages.includes(language)) {
			selectedLanguages = [...selectedLanguages, language];
		}
		showLanguageList = false;
		languageSearchTerm = '';
	}
	
	function removeLanguage(language) {
		selectedLanguages = selectedLanguages.filter(lang => lang !== language);
	}
	
	function handleEthnicitySearch(event) {
		ethnicitySearchTerm = event.target.value;
		if (ethnicitySearchTerm && !showEthnicityList) {
			showEthnicityList = true;
		}
	}
	
	function handleLanguageSearch(event) {
		languageSearchTerm = event.target.value;
		if (languageSearchTerm && !showLanguageList) {
			showLanguageList = true;
		}
	}
	
	function toggleHideEthnicityLanguages() {
		hideEthnicityLanguages = !hideEthnicityLanguages;
	}
	
	// Close dropdowns when clicking outside
	onMount(() => {
		const handleClickOutside = (event) => {
			const ethnicitySearch = document.getElementById('ethnicity-search');
			const ethnicityDropdown = document.getElementById('ethnicity-dropdown');
			const languageSearch = document.getElementById('language-search');
			const languageDropdown = document.getElementById('language-dropdown');
			
			if (ethnicitySearch && ethnicityDropdown && 
				!ethnicitySearch.contains(event.target) && 
				!ethnicityDropdown.contains(event.target)) {
				showEthnicityList = false;
			}
			
			if (languageSearch && languageDropdown && 
				!languageSearch.contains(event.target) && 
				!languageDropdown.contains(event.target)) {
				showLanguageList = false;
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
			<div class="progress-step active"></div>
			<div class="progress-line"></div>
			<div class="progress-step active"></div>
			<div class="progress-line"></div>
			<div class="progress-step active"></div>
			<div class="progress-line"></div>
			<div class="progress-step active"></div>
		</div>

		<div class="ethnicity-languages-title">
			<h1>Ethnicity & Languages <span class="globe-icon">🌐</span></h1>
		</div>
	</div>

	<div class="form-container">
		<div class="form-field">
			<label for="ethnicity-search">What is your ethnicity?</label>
			<div class="search-container" id="ethnicity-search">
				<input 
					type="text" 
					placeholder="Search" 
					class="search-input" 
					value={ethnicitySearchTerm} 
					on:input={handleEthnicitySearch}
					on:focus={() => showEthnicityList = true}
				/>
				<div class="search-icon">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
						<path d="M21 21L16.65 16.65" stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</div>
				
				{#if showEthnicityList && filteredEthnicities.length > 0}
					<div class="dropdown-list" id="ethnicity-dropdown">
						{#each filteredEthnicities as ethnicity}
							<div 
								class="dropdown-option {selectedEthnicity === ethnicity ? 'selected' : ''}" 
								on:click={() => selectEthnicity(ethnicity)}
							>
								{ethnicity}
							</div>
						{/each}
					</div>
				{/if}
			</div>
			
			{#if selectedEthnicity}
				<div class="selected-item">
					<div class="selected-tag">
						{selectedEthnicity}
					</div>
				</div>
			{/if}
		</div>
		
		<div class="form-field">
			<label for="language-search">What languages do you speak?</label>
			<div class="add-language-container" id="language-search" on:click={toggleLanguageList}>
				<span class="plus-icon">+</span>
				<span class="add-language-text">Add Language</span>
			</div>
			
			{#if showLanguageList}
				<div class="search-container">
					<input 
						type="text" 
						placeholder="Search language" 
						class="search-input" 
						value={languageSearchTerm} 
						on:input={handleLanguageSearch}
						autofocus
					/>
					
					<div class="dropdown-list" id="language-dropdown">
						{#if filteredLanguages.length > 0}
							{#each filteredLanguages as language}
								<div 
									class="dropdown-option" 
									on:click={() => addLanguage(language)}
								>
									{language}
								</div>
							{/each}
						{:else}
							<div class="no-results">No matching languages found</div>
						{/if}
					</div>
				</div>
			{/if}
			
			{#if selectedLanguages.length > 0}
				<div class="selected-languages">
					{#each selectedLanguages as language}
						<div class="language-tag">
							{language}
							<button class="remove-tag" on:click={() => removeLanguage(language)}>×</button>
						</div>
					{/each}
				</div>
			{/if}
		</div>
		
		<div class="hide-option">
			<button 
				class="toggle-button {hideEthnicityLanguages ? 'active' : ''}" 
				on:click={toggleHideEthnicityLanguages}
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
	.ethnicity-languages-title {
		margin-bottom: 15px;
	}

	.ethnicity-languages-title h1 {
		font-size: 24px;
		font-weight: 400;
		display: flex;
		align-items: center;
	}

	.globe-icon {
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

	/* Search container */
	.search-container {
		position: relative;
		width: 100%;
		margin-bottom: 10px;
	}

	.search-input {
		width: 100%;
		padding: 12px 40px 12px 15px;
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
	
	/* Add language button */
	.add-language-container {
		display: flex;
		align-items: center;
		background-color: white;
		border: 1px solid #ddd;
		border-radius: 25px;
		padding: 12px 15px;
		cursor: pointer;
		transition: background-color 0.2s;
	}
	
	.add-language-container:hover {
		background-color: #f9f9f9;
	}
	
	.plus-icon {
		font-size: 20px;
		margin-right: 10px;
		color: #555;
	}
	
	.add-language-text {
		color: #555;
		font-size: 16px;
	}
	
	/* Dropdown styles */
	.dropdown-list {
		background-color: white;
		border: 1px solid #ddd;
		border-radius: 10px;
		margin-top: 5px;
		max-height: 200px;
		overflow-y: auto;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		z-index: 100;
	}
	
	.dropdown-option {
		padding: 12px 15px;
		cursor: pointer;
		transition: background-color 0.2s;
		border-bottom: 1px solid #f5f5f5;
	}
	
	.dropdown-option:last-child {
		border-bottom: none;
	}
	
	.dropdown-option:hover {
		background-color: #f0e1ff;
	}
	
	.dropdown-option.selected {
		background-color: #e0caff;
	}
	
	.no-results {
		padding: 15px;
		text-align: center;
		color: #888;
		font-style: italic;
	}
	
	/* Selected items */
	.selected-item {
		margin-top: 10px;
	}
	
	.selected-tag {
		display: inline-block;
		background-color: #e0caff;
		border-radius: 20px;
		padding: 8px 15px;
		margin: 5px;
		font-size: 14px;
		color: #333;
	}
	
	.selected-languages {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-top: 10px;
	}
	
	.language-tag {
		display: flex;
		align-items: center;
		background-color: #e0caff;
		border-radius: 20px;
		padding: 8px 12px;
		font-size: 14px;
		color: #333;
	}
	
	.remove-tag {
		background: none;
		border: none;
		margin-left: 6px;
		font-size: 18px;
		line-height: 1;
		color: #666;
		cursor: pointer;
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
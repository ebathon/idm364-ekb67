<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	// State for selected values
	let selectedGender = null;
	let selectedPronouns = null;

	// Dropdown states
	let isGenderOpen = false;
	let isPronounsOpen = false;

	// Button state
	let buttonEnabled = false;

	// Gender and pronoun options
	const genderOptions = ['Woman', 'Man', 'Non-binary', 'Transgender', 'Gender fluid'];

	const pronounOptions = [
		'She/Her',
		'He/Him',
		'They/Them',
		'She/They',
		'He/They',
		'Ze/Zir',
		'Xe/Xem',
		'Ey/Em',
		'Fae/Faer',
		'Ve/Ver'
	];

	// Check if both fields are selected to enable button
	$: {
		buttonEnabled = selectedGender && selectedPronouns;
	}

	function goBack() {
		history.back();
	}

	function goNext() {
		if (buttonEnabled) {
			goto('/sign_in/8');
		}
	}

	// Toggle custom dropdowns
	function toggleGenderDropdown() {
		isGenderOpen = !isGenderOpen;
		isPronounsOpen = false; // Close the other dropdown
	}

	function togglePronounsDropdown() {
		isPronounsOpen = !isPronounsOpen;
		isGenderOpen = false; // Close the other dropdown
	}

	// Select options in custom dropdowns
	function selectGender(gender) {
		selectedGender = gender;
		isGenderOpen = false;
	}

	function selectPronouns(pronouns) {
		selectedPronouns = pronouns;
		isPronounsOpen = false;
	}

	// Close dropdowns when clicking outside
	onMount(() => {
		document.addEventListener('click', (event) => {
			const genderDropdown = document.getElementById('gender-dropdown');
			const pronounsDropdown = document.getElementById('pronouns-dropdown');
			const genderSelect = document.getElementById('gender-select');
			const pronounsSelect = document.getElementById('pronouns-select');

			if (
				genderDropdown &&
				!genderDropdown.contains(event.target) &&
				!genderSelect.contains(event.target)
			) {
				isGenderOpen = false;
			}

			if (
				pronounsDropdown &&
				!pronounsDropdown.contains(event.target) &&
				!pronounsSelect.contains(event.target)
			) {
				isPronounsOpen = false;
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
			<div class="progress-step"></div>
			<div class="progress-line"></div>
			<div class="progress-step"></div>
		</div>

		<div class="gender-title">
			<h1>Gender & Pronouns <span class="gender-icon">⚧️</span></h1>
		</div>
	</div>

	<div class="form-container">
		<div class="form-field">
			<label for="gender-select">Gender Identity</label>
			<div class="select-wrapper">
				<div class="custom-select" id="gender-select" on:click={toggleGenderDropdown}>
					<div class="selected-option">{selectedGender || 'Select'}</div>
					<button class="caret-button">
						<svg
							width="12"
							height="8"
							viewBox="0 0 12 8"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M1 1L6 7L11 1"
								stroke="#666666"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</button>
				</div>

				{#if isGenderOpen}
					<div class="dropdown-options" id="gender-dropdown">
						{#each genderOptions as gender}
							<div
								class="dropdown-option {selectedGender === gender ? 'selected' : ''}"
								on:click={() => selectGender(gender)}
							>
								{gender}
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>

		<div class="form-field">
			<label for="pronouns-select">Pronouns</label>
			<div class="select-wrapper">
				<div class="custom-select" id="pronouns-select" on:click={togglePronounsDropdown}>
					<div class="selected-option">{selectedPronouns || 'Select'}</div>
					<button class="caret-button">
						<svg
							width="12"
							height="8"
							viewBox="0 0 12 8"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M1 1L6 7L11 1"
								stroke="#666666"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</button>
				</div>

				{#if isPronounsOpen}
					<div class="dropdown-options" id="pronouns-dropdown">
						{#each pronounOptions as pronouns}
							<div
								class="dropdown-option {selectedPronouns === pronouns ? 'selected' : ''}"
								on:click={() => selectPronouns(pronouns)}
							>
								{pronouns}
							</div>
						{/each}
					</div>
				{/if}
			</div>
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
	.gender-title {
		margin-bottom: 15px;
	}

	.gender-title h1 {
		font-size: 24px;
		font-weight: 400;
		display: flex;
		align-items: center;
	}

	.gender-icon {
		margin-left: 10px;
	}

	/* Form container */
	.form-container {
		padding: 20px;
		flex-grow: 1;
	}

	.form-field {
		margin-bottom: 20px;
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

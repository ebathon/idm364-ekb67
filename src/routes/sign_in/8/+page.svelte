<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	// State for selected values
	let selectedGoal = null;
	let minAge = 18;
	let maxAge = 18;
	let showOutsideRange = false;

	// Dropdown states
	let isGoalOpen = false;
	let isMinAgeOpen = false;
	let isMaxAgeOpen = false;

	// Button state
	let buttonEnabled = false;

	// Relationship goals options
	const relationshipGoals = ['Long-term relationship', 'Casual dating', 'Making friends'];

	// Age options (18 to 70)
	const ageOptions = Array.from({ length: 53 }, (_, i) => i + 18);

	// Check if required fields are filled to enable button
	$: {
		buttonEnabled = selectedGoal && minAge && maxAge;
	}

	function goBack() {
		history.back();
	}

	function goNext() {
		if (buttonEnabled) {
			goto('/sign_in/9');
		}
	}

	// Toggle custom dropdowns
	function toggleGoalDropdown() {
		isGoalOpen = !isGoalOpen;
		isMinAgeOpen = false;
		isMaxAgeOpen = false;
	}

	function toggleMinAgeDropdown() {
		isMinAgeOpen = !isMinAgeOpen;
		isGoalOpen = false;
		isMaxAgeOpen = false;
	}

	function toggleMaxAgeDropdown() {
		isMaxAgeOpen = !isMaxAgeOpen;
		isGoalOpen = false;
		isMinAgeOpen = false;
	}

	// Toggle outside range preference
	function toggleOutsideRange() {
		showOutsideRange = !showOutsideRange;
	}

	// Select options in custom dropdowns
	function selectGoal(goal) {
		selectedGoal = goal;
		isGoalOpen = false;
	}

	function selectMinAge(age) {
		minAge = age;
		isMinAgeOpen = false;

		// Ensure maxAge is never less than minAge
		if (maxAge < minAge) {
			maxAge = minAge;
		}
	}

	function selectMaxAge(age) {
		maxAge = age;
		isMaxAgeOpen = false;

		// Ensure minAge is never greater than maxAge
		if (minAge > maxAge) {
			minAge = maxAge;
		}
	}

	// Close dropdowns when clicking outside
	onMount(() => {
		document.addEventListener('click', (event) => {
			const goalDropdown = document.getElementById('goal-dropdown');
			const minAgeDropdown = document.getElementById('min-age-dropdown');
			const maxAgeDropdown = document.getElementById('max-age-dropdown');
			const goalSelect = document.getElementById('goal-select');
			const minAgeSelect = document.getElementById('min-age-select');
			const maxAgeSelect = document.getElementById('max-age-select');

			if (
				goalDropdown &&
				!goalDropdown.contains(event.target) &&
				!goalSelect.contains(event.target)
			) {
				isGoalOpen = false;
			}

			if (
				minAgeDropdown &&
				!minAgeDropdown.contains(event.target) &&
				!minAgeSelect.contains(event.target)
			) {
				isMinAgeOpen = false;
			}

			if (
				maxAgeDropdown &&
				!maxAgeDropdown.contains(event.target) &&
				!maxAgeSelect.contains(event.target)
			) {
				isMaxAgeOpen = false;
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
			<div class="progress-step"></div>
		</div>

		<div class="preferences-title">
			<h1>Preference & Goals <span class="heart-icon">❤️</span></h1>
		</div>
	</div>

	<div class="form-container">
		<div class="form-field">
			<div class="select-wrapper goal-wrapper">
				<div class="custom-select" id="goal-select" on:click={toggleGoalDropdown}>
					<div class="selected-option goal-option {selectedGoal ? 'selected' : ''}">
   						 {selectedGoal || 'What are you relationship goals?'}
					</div>
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

				{#if isGoalOpen}
					<div class="dropdown-options" id="goal-dropdown">
						{#each relationshipGoals as goal}
							<div
								class="dropdown-option {selectedGoal === goal ? 'selected' : ''}"
								on:click={() => selectGoal(goal)}
							>
								{goal}
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>

		<div class="form-field">
			<label>What is your age preference?</label>

			<div class="age-range-container">
				<div class="age-field">
					<div class="select-wrapper age-wrapper">
						<div
							class="custom-select age-select"
							id="min-age-select"
							on:click={toggleMinAgeDropdown}
						>
							<div class="selected-option">{minAge}</div>
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

						{#if isMinAgeOpen}
							<div class="dropdown-options age-dropdown" id="min-age-dropdown">
								{#each ageOptions as age}
									<div
										class="dropdown-option {minAge === age ? 'selected' : ''}"
										on:click={() => selectMinAge(age)}
									>
										{age}
									</div>
								{/each}
							</div>
						{/if}
					</div>
					<div class="age-label">Min</div>
				</div>

				<div class="age-field">
					<div class="select-wrapper age-wrapper">
						<div
							class="custom-select age-select"
							id="max-age-select"
							on:click={toggleMaxAgeDropdown}
						>
							<div class="selected-option">{maxAge}</div>
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

						{#if isMaxAgeOpen}
							<div class="dropdown-options age-dropdown" id="max-age-dropdown">
								{#each ageOptions as age}
									<div
										class="dropdown-option {maxAge === age ? 'selected' : ''}"
										on:click={() => selectMaxAge(age)}
									>
										{age}
									</div>
								{/each}
							</div>
						{/if}
					</div>
					<div class="age-label">Max</div>
				</div>
			</div>
		</div>

		<div class="form-field">
			<button
				class="toggle-button {showOutsideRange ? 'active' : ''}"
				on:click={toggleOutsideRange}
			>
				<div class="toggle-indicator"></div>
				<div class="toggle-text">Show people outside of age range if preferences not available</div>
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
	.preferences-title {
		margin-bottom: 15px;
	}

	.preferences-title h1 {
		font-size: 24px;
		font-weight: 400;
		display: flex;
		align-items: center;
	}

	.heart-icon {
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
		color: black;
	}

	.selected-option {
		flex: 1;
		color: #000000;
	}

	.goal-option {
		color: #aaa;
	}

	.goal-option.selected {
    color: #000;
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

	/* Age range specific styles */
	.age-range-container {
		display: flex;
		gap: 20px;
	}

	.age-field {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.age-wrapper {
		width: 100%;
	}

	.age-select {
		text-align: center;
	}

	.age-dropdown {
		width: 100%;
	}

	.age-label {
		margin-top: 8px;
		color: #555;
		font-size: 14px;
	}

	/* Toggle button style */
	.toggle-button {
		display: flex;
		align-items: center;
		background-color: #f0f0f0;
		border: 1px solid #ddd;
		border-radius: 30px;
		padding: 8px 15px;
		width: 100%;
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
		line-height: 1.4;
		flex: 1;
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
		margin-left: 5px;
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

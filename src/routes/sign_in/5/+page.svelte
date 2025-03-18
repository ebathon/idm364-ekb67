<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	// State for selected date
	let selectedMonth = null;
	let selectedYear = null;
	let selectedDay = null;

	// Button state
	let buttonEnabled = false;

	// Available months
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	// Generate years (100 years back from current)
	const currentYear = new Date().getFullYear();
	const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

	// Calendar data
	let calendarDays = [];
	let calendarHeaders = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

	// Custom dropdown states
	let isMonthOpen = false;
	let isYearOpen = false;

	// Calculate date for someone turning 18 today
	onMount(() => {
		const today = new Date();
		const birthday = new Date(today);
		birthday.setFullYear(today.getFullYear() - 18); // Go back 18 years

		selectedMonth = months[birthday.getMonth()];
		selectedYear = birthday.getFullYear();
		selectedDay = birthday.getDate(); // Pre-select the day too

		generateCalendar(selectedMonth, selectedYear);

		// Close dropdowns when clicking outside
		document.addEventListener('click', (event) => {
			const monthDropdown = document.getElementById('month-dropdown');
			const yearDropdown = document.getElementById('year-dropdown');
			const monthSelect = document.getElementById('month-select');
			const yearSelect = document.getElementById('year-select');

			if (
				monthDropdown &&
				!monthDropdown.contains(event.target) &&
				!monthSelect.contains(event.target)
			) {
				isMonthOpen = false;
			}

			if (
				yearDropdown &&
				!yearDropdown.contains(event.target) &&
				!yearSelect.contains(event.target)
			) {
				isYearOpen = false;
			}
		});
	});

	// Toggle custom dropdowns
	function toggleMonthDropdown() {
		isMonthOpen = !isMonthOpen;
		isYearOpen = false; // Close the other dropdown
	}

	function toggleYearDropdown() {
		isYearOpen = !isYearOpen;
		isMonthOpen = false; // Close the other dropdown
	}

	// Select options in custom dropdowns
	function selectMonth(month) {
		selectedMonth = month;
		isMonthOpen = false;
	}

	function selectYear(year) {
		selectedYear = year;
		isYearOpen = false;
	}

	// Check if all date parts are selected to enable button
	$: {
		buttonEnabled = selectedMonth && selectedYear && selectedDay;
	}

	// Update calendar when month or year changes
	$: if (selectedMonth && selectedYear) {
		generateCalendar(selectedMonth, selectedYear);
	}

	// Generate calendar days for selected month and year
	function generateCalendar(month, year) {
		const monthIndex = months.indexOf(month);
		const firstDay = new Date(year, monthIndex, 1);
		const lastDay = new Date(year, monthIndex + 1, 0);
		const daysInMonth = lastDay.getDate();

		// Get day of week of first day (0 = Sunday)
		const firstDayOfWeek = firstDay.getDay();

		// Get previous month's last days to fill in the first row
		const prevMonthLastDay = new Date(year, monthIndex, 0).getDate();

		// Calendar array
		let days = [];

		// Add previous month's days
		for (let i = firstDayOfWeek - 1; i >= 0; i--) {
			days.push({
				day: prevMonthLastDay - i,
				currentMonth: false,
				date: new Date(year, monthIndex - 1, prevMonthLastDay - i)
			});
		}

		// Add current month's days
		for (let i = 1; i <= daysInMonth; i++) {
			days.push({
				day: i,
				currentMonth: true,
				date: new Date(year, monthIndex, i)
			});
		}

		// Add next month's days to complete the calendar
		const remainingDays = 42 - days.length; // 6 rows x 7 days
		for (let i = 1; i <= remainingDays; i++) {
			days.push({
				day: i,
				currentMonth: false,
				date: new Date(year, monthIndex + 1, i)
			});
		}

		// Group days into weeks
		let weeks = [];
		for (let i = 0; i < days.length; i += 7) {
			weeks.push(days.slice(i, i + 7));
		}

		calendarDays = weeks;
	}

	function selectDay(day) {
		if (day.currentMonth) {
			selectedDay = day.day;
		}
	}

	function goBack() {
		history.back();
	}

	function goNext() {
		if (buttonEnabled) {
			// Format selected date to pass to next page if needed
			const selectedDate = `${selectedMonth} ${selectedDay}, ${selectedYear}`;
			console.log('Selected date:', selectedDate);

			// Navigate to next screen
			goto('/sign_in/6');
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

		<div class="birthday-title">
			<h1>Birthday <span class="cake-icon">🎂</span></h1>
		</div>
	</div>

	<div class="birthday-container">
		<div class="birthday-prompt">What is Your Date of Birth?</div>

		<div class="date-selectors">
			<div class="select-wrapper">
				<div class="custom-select" id="month-select" on:click={toggleMonthDropdown}>
					<div class="selected-option">{selectedMonth || 'Month'}</div>
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

				{#if isMonthOpen}
					<div class="dropdown-options" id="month-dropdown">
						{#each months as month}
							<div
								class="dropdown-option {selectedMonth === month ? 'selected' : ''}"
								on:click={() => selectMonth(month)}
							>
								{month}
							</div>
						{/each}
					</div>
				{/if}
			</div>

			<div class="select-wrapper">
				<div class="custom-select" id="year-select" on:click={toggleYearDropdown}>
					<div class="selected-option">{selectedYear || 'Year'}</div>
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

				{#if isYearOpen}
					<div class="dropdown-options" id="year-dropdown">
						{#each years.slice(0, 100) as year}
							<div
								class="dropdown-option {selectedYear === year ? 'selected' : ''}"
								on:click={() => selectYear(year)}
							>
								{year}
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>

		<div class="calendar">
			<div class="calendar-header">
				{#each calendarHeaders as header}
					<div class="calendar-header-cell">{header}</div>
				{/each}
			</div>

			<!-- Only show 5 weeks maximum to match the design -->
			{#each calendarDays.slice(0, 5) as week}
				<div class="calendar-week">
					{#each week as day}
						<div
							class="calendar-day {day.currentMonth
								? 'current-month'
								: 'other-month'} {selectedDay === day.day && day.currentMonth ? 'selected' : ''}"
							on:click={() => selectDay(day)}
						>
							{day.day}
						</div>
					{/each}
				</div>
			{/each}
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

	/* Birthday title */
	.birthday-title {
		margin-bottom: 15px;
	}

	.birthday-title h1 {
		font-size: 24px;
		font-weight: 400;
		display: flex;
		align-items: center;
	}

	.cake-icon {
		margin-left: 10px;
	}

	/* Birthday container */
	.birthday-container {
		padding: 20px;
		flex-grow: 1;
		background-color: #f8f8f8;
	}

	.birthday-prompt {
		font-size: 18px;
		margin-bottom: 20px;
		color: #333;
		font-weight: 500;
	}

	/* Date selectors */
	.date-selectors {
		display: flex;
		gap: 10px;
		margin-bottom: 10px;
	}

	.select-wrapper {
		position: relative;
		flex: 1;
	}
	.custom-select {
		width: 100%;
		padding: 10px 12px;
		border: 1px solid #e0d3f0;
		border-radius: 15px;
		font-size: 16px;
		background-color: white;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}

	.selected-option {
		flex: 1;
		text-align: center;
		font-weight: 500;
	}

	.dropdown-options {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		max-height: 200px;
		overflow-y: auto;
		background-color: white;
		border: 1px solid #e0d3f0;
		border-radius: 8px;
		margin-top: 5px;
		z-index: 100;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}

	.dropdown-option {
		padding: 10px 15px;
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
		margin-left: 5px;
	}

	/* Calendar styles */
	.calendar {
		background-color: #f0e1ff;
		border-radius: 15px;
		overflow: hidden;
		margin-top: 10px;
		padding: 5px;
	}

	.calendar-header {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		text-align: center;
		font-weight: 500;
		padding: 10px 0;
	}

	.calendar-header-cell {
		padding: 5px;
		color: #5f4b8b;
		font-size: 15px;
	}

	.calendar-week {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		text-align: center;
	}

	.calendar-day {
		padding: 10px 0;
		cursor: pointer;
		transition: background-color 0.2s;
		font-size: 15px;
		line-height: 1.2;
	}

	.calendar-day.current-month {
		color: #000;
		font-weight: normal;
	}

	.calendar-day.other-month {
		color: #aaa;
	}

	.calendar-day:hover.current-month {
		background-color: #e0caff;
	}

	.calendar-day.selected {
		background-color: transparent;
		font-weight: bold;
		color: #000;
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

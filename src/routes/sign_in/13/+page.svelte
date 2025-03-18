<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	// State for selected prompts
	let selectedPrompts = [];
	let showPromptList = false;
	
	// Button state
	let buttonEnabled = false;
	
	// List of conversation prompts
	const conversationPrompts = [
		"What's something you're passionate about that most people might not expect?",
		"Describe your ideal Sunday morning.",
		"What's a book or movie that changed how you see the world?",
		"If you could master any skill instantly, what would it be and why?",
		"What's your favorite way to recharge after a difficult week?",
		"What's a personal value you refuse to compromise on?",
		"Share a travel experience that taught you something important.",
		"What does a meaningful relationship look like to you?",
		"What's something you're currently learning or want to learn?",
		"What would your closest friends say is your best quality?"
	];
	
	// Update button state whenever selectedPrompts changes
	$: {
		buttonEnabled = selectedPrompts.length > 0 && 
			selectedPrompts.every(prompt => prompt.answer.trim().length > 0 && prompt.submitted);
	}
	
	function goBack() {
		history.back();
	}
	
	function goNext() {
		if (buttonEnabled) {
			goto('/sign_in/14');
		}
	}
	
	function skipSection() {
		goto('/sign_in/14');
	}
	
	function togglePromptList() {
		showPromptList = !showPromptList;
	}
	
	function selectPrompt(prompt) {
		// Check if the prompt is already selected
		if (!selectedPrompts.some(p => p.question === prompt)) {
			selectedPrompts = [...selectedPrompts, { 
				question: prompt, 
				answer: '',
				submitted: false
			}];
		}
		
		// Close the dropdown
		showPromptList = false;
	}
	
	function removePrompt(index) {
		selectedPrompts = selectedPrompts.filter((_, i) => i !== index);
	}
	
	function updateAnswer(index, event) {
		const value = event.target.value;
		const updatedPrompts = [...selectedPrompts];
		updatedPrompts[index] = {
			...updatedPrompts[index],
			answer: value,
			submitted: false
		};
		selectedPrompts = updatedPrompts;
	}
	
	function submitPrompt(index) {
		if (selectedPrompts[index].answer.trim().length > 0) {
			const updatedPrompts = [...selectedPrompts];
			updatedPrompts[index] = {
				...updatedPrompts[index],
				submitted: true
			};
			selectedPrompts = updatedPrompts;
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

		<div class="connections-info">Deeper Connections</div>
		
		<div class="skip-section">
			<button class="skip-button" on:click={skipSection}>Skip Section</button>
		</div>

		<div class="progress-bar">
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
			<div class="progress-line"></div>
			<div class="progress-step"></div>
		</div>

		<div class="prompts-title">
			<h1>Choose Prompts <span class="chat-icon">💬</span></h1>
		</div>
	</div>

	<div class="form-container">
		<div class="dropdown-container">
			<button class="add-prompt-button" on:click={togglePromptList}>
				<div class="add-prompt-text">Select</div>
				<div class="caret-icon {showPromptList ? 'open' : ''}">
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M6 9L12 15L18 9" stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</div>
			</button>
			
			{#if showPromptList}
				<div class="prompt-list">
					{#each conversationPrompts as prompt}
						<div 
							class="prompt-option" 
							on:click={() => selectPrompt(prompt)}
						>
							{prompt}
						</div>
					{/each}
				</div>
			{/if}
		</div>
		
		{#if selectedPrompts.length > 0}
			<div class="selected-prompts">
				{#each selectedPrompts as prompt, index}
					<div class="prompt-card">
						<div class="prompt-header">
							<div class="prompt-question">{prompt.question}</div>
							<button class="remove-prompt" on:click={() => removePrompt(index)}>×</button>
						</div>
						<div class="prompt-answer-container">
							<textarea 
								class="prompt-answer {prompt.submitted ? 'submitted' : ''}" 
								placeholder="Your answer..." 
								value={prompt.answer}
								on:input={(e) => updateAnswer(index, e)}
								disabled={prompt.submitted}
							></textarea>
							{#if !prompt.submitted}
								<button class="submit-button" on:click={() => submitPrompt(index)}>Submit</button>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		{/if}
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
	.prompts-title {
		margin-bottom: 15px;
	}

	.prompts-title h1 {
		font-size: 24px;
		font-weight: 400;
		display: flex;
		align-items: center;
	}

	.chat-icon {
		margin-left: 10px;
	}

	/* Form container */
	.form-container {
		padding: 20px;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
	}
	
	/* Dropdown container */
	.dropdown-container {
		position: relative;
		margin-bottom: 20px;
	}

	/* Add prompt button */
	.add-prompt-button {
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
	}
	
	.add-prompt-text {
		display: flex;
		align-items: center;
		text-align: left;
	}
	
	.caret-icon {
		transform: rotate(0deg);
		transition: transform 0.3s ease;
	}
	
	.caret-icon.open {
		transform: rotate(180deg);
	}
	
	/* Prompt list */
	.prompt-list {
		background-color: white;
		border: 1px solid #ddd;
		border-radius: 10px;
		margin-top: 5px;
		max-height: 350px;
		overflow-y: auto;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		z-index: 100;
	}
	
	.prompt-option {
		padding: 15px;
		background-color: #f5f5f5;
		margin: 5px;
		border-radius: 8px;
		cursor: pointer;
		transition: background-color 0.2s;
		text-align: left;
	}
	
	.prompt-option:hover {
		background-color: #f0e1ff;
	}
	
	/* Selected prompts */
	.selected-prompts {
		display: flex;
		flex-direction: column;
		gap: 15px;
	}
	
	.prompt-card {
		background-color: white;
		border: 1px solid #ddd;
		border-radius: 10px;
		overflow: hidden;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
	}
	
	.prompt-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 15px;
		background-color: #f9f4ff;
		border-bottom: 1px solid #e0d3f0;
	}
	
	.prompt-question {
		font-weight: 500;
		color: #333;
		line-height: 1.4;
	}
	
	.remove-prompt {
		background: none;
		border: none;
		font-size: 20px;
		color: #666;
		cursor: pointer;
		padding: 0 5px;
	}
	
	.prompt-answer-container {
		position: relative;
	}
	
	.prompt-answer {
		width: 100%;
		min-height: 100px;
		padding: 15px;
		padding-bottom: 50px;
		border: none;
		resize: vertical;
		font-family: 'Roboto', sans-serif;
		font-size: 15px;
		line-height: 1.5;
	}
	
	.prompt-answer:focus {
		outline: none;
	}
	
	.prompt-answer.submitted {
		background-color: #f0f8ff;
		border-left: 4px solid #b388ff;
		padding-left: 11px;
	}
	
	.submit-button {
		position: absolute;
		bottom: 10px;
		right: 10px;
		background-color: #b388ff;
		color: white;
		border: none;
		border-radius: 5px;
		padding: 8px 15px;
		font-size: 14px;
		font-family: 'Nunito', sans-serif;
		cursor: pointer;
		transition: background-color 0.2s;
	}
	
	.submit-button:hover {
		background-color: #a070ef;
	}
	
	/* Remove unneeded indicator styles */
	
	/* Scrollbar styling */
	.prompt-list::-webkit-scrollbar {
		width: 8px;
	}
	
	.prompt-list::-webkit-scrollbar-track {
		background: #f1f1f1;
		border-radius: 10px;
	}
	
	.prompt-list::-webkit-scrollbar-thumb {
		background: #b388ff;
		border-radius: 10px;
	}
	
	.prompt-answer::-webkit-scrollbar {
		width: 8px;
	}
	
	.prompt-answer::-webkit-scrollbar-track {
		background: #f1f1f1;
	}
	
	.prompt-answer::-webkit-scrollbar-thumb {
		background: #ccc;
		border-radius: 4px;
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
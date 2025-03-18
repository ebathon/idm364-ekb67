<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let scrollContainer;
	let isScrolledToBottom = false;
	let buttonEnabled = false;

	// Check if user has scrolled to the bottom
	function handleScroll() {
		const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
		// Consider "bottom" when within 20px of the actual bottom
		isScrolledToBottom = scrollHeight - scrollTop - clientHeight < 20;

		if (isScrolledToBottom) {
			buttonEnabled = true;
		}
	}

	function goBack() {
		// Replace with appropriate navigation
		history.back();
	}

	function acceptTerms() {
		if (buttonEnabled) {
			// Navigate to next screen - replace with your actual route
			goto('/sign_in/3');
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
			<div class="progress-line"></div>
			<div class="progress-step"></div>
		</div>

		<div class="terms-title">
			<h1>Terms of Use</h1>
			<div class="document-icon">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
					<polyline points="14 2 14 8 20 8"></polyline>
					<line x1="16" y1="13" x2="8" y2="13"></line>
					<line x1="16" y1="17" x2="8" y2="17"></line>
					<polyline points="10 9 9 9 8 9"></polyline>
				</svg>
			</div>
		</div>
	</div>

	<div class="terms-container" bind:this={scrollContainer} on:scroll={handleScroll}>
		<div class="terms-content">
			<p>
				You agree to use our website and services only for lawful purposes and in compliance with
				all applicable laws and regulations. Unauthorized use of our services, including hacking,
				spamming, or any other activity that disrupts our operations or violates the rights of
				others, is strictly prohibited. We reserve the right to modify these terms at any time
				without prior notice, and it is your responsibility to review them regularly. Continued use
				of our services following any changes constitutes your acceptance of the updated terms. If
				you do not agree to these terms, you must not use our services.
			</p>

			<p>
				You agree to use our website and services only for lawful purposes and in compliance with
				all applicable laws and regulations. Unauthorized use of our services, including hacking,
				spamming, or any other activity that disrupts our operations or violates the rights of
				others, is strictly prohibited. We reserve the right to modify these terms at any time
				without prior notice, and it is your responsibility to review them regularly. Continued use
				of our services following any changes constitutes your acceptance of the updated terms. If
				you do not agree to these terms, you must not use our services.
			</p>

			<p>
				All content on this website, including text, graphics, logos, images, and software, is the
				property of our company and is protected by copyright laws. You may not reproduce,
				distribute, modify, or create derivative works from any content without our express written
				permission.
			</p>

			<p>
				We collect and process personal data in accordance with our Privacy Policy. By using our
				services, you consent to such processing and you warrant that all data provided by you is
				accurate and complete.
			</p>

			<p>
				We strive to provide accurate and up-to-date information on our website, but we make no
				warranties or representations regarding the accuracy, reliability, or completeness of the
				information. You acknowledge that any reliance on the material on this website is at your
				own risk.
			</p>

			<p>
				To the maximum extent permitted by law, we exclude all liability for any loss or damage of
				any kind, including direct, indirect, or consequential losses, arising from your use of our
				website or services.
			</p>

			<p>
				These terms shall be governed by and construed in accordance with the laws of the United
				States, and any disputes relating to these terms shall be subject to the exclusive
				jurisdiction of the courts of the United States.
			</p>
		</div>
	</div>

	<button
		class="accept-button {buttonEnabled ? 'active' : 'disabled'}"
		on:click={acceptTerms}
		disabled={!buttonEnabled}
	>
		Accept Terms <span class="arrow">›</span>
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

	/* Terms title */
	.terms-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 15px;
	}

	.terms-title h1 {
		font-size: 24px;
		font-weight: 400;
	}

	.document-icon {
		width: 30px;
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/* Terms content */
	.terms-container {
		height: 500px;
		overflow-y: auto;
		background-color: white;
		margin: 10px;
		border-radius: 10px;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
	}

	.terms-content {
		padding: 20px;
	}

	.terms-content p {
		margin-bottom: 15px;
		font-size: 16px;
		line-height: 1.5;
		color: #333;
	}

	/* Accept button */
	.accept-button {
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
	}

	.accept-button.disabled {
		background-color: #cccccc;
		cursor: not-allowed;
		opacity: 0.7;
	}

	.accept-button.active {
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

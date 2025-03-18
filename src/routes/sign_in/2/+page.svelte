<script>
	import { goto } from '$app/navigation';

	let phoneNumber = '';
	let email = '';
	let verificationCode = ['', '', '', '', '', '']; // 6-digit code
	let codeSent = false;
	let showToast = false;
	let toastMessage = '';

	$: isCodeComplete =
		verificationCode.every((digit) => digit !== '') && verificationCode.length === 6;

	function sendCode() {
		if (phoneNumber || email) {
			codeSent = true;

			// Generate a random 6-digit code
			const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
			console.log('Sending code to:', phoneNumber || email);

			// Show a toast with the "pretend" code
			toastMessage = `Verification code sent: ${randomCode}`;
			showToast = true;

			// Hide toast after 10 seconds
			setTimeout(() => {
				showToast = false;
			}, 10000);

			// Don't prefill the code for better user experience
			// verificationCode = randomCode.split('');
			verificationCode = ['', '', '', '', '', '']; // Clear existing code
		}
	}

	function resendCode() {
		// Logic to resend the code
		console.log('Resending code');
	}

	function handleNext() {
		// Verify code and proceed
		const code = verificationCode.join('');
		console.log('Verification code:', code);

		if (code.length === 6) {
			goto('/sign_in/3'); // Navigate to the next sign-in step
		}
	}

	// Update a specific digit in the verification code
	function updateCode(index, event) {
		const value = event.target.value;
		if (/^\d*$/.test(value) && value.length <= 1) {
			verificationCode[index] = value;
			verificationCode = [...verificationCode]; // Trigger reactivity

			// Auto-focus next input if a digit was entered
			if (value && index < 5) {
				const nextInput = document.getElementById(`code-${index + 1}`);
				if (nextInput) nextInput.focus();
			}
		}
	}

	// Handle backspace in verification code inputs
	function handleKeydown(index, event) {
		if (event.key === 'Backspace') {
			if (!verificationCode[index] && index > 0) {
				// If current field is empty and backspace is pressed, go to previous field
				verificationCode[index - 1] = '';
				verificationCode = [...verificationCode]; // Trigger reactivity
				const prevInput = document.getElementById(`code-${index - 1}`);
				if (prevInput) prevInput.focus();
			}
		}
	}
</script>

<div class="container">
	<div class="header">
		<div class="basic-info">Basic Information</div>
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
			<div class="progress-line"></div>
			<div class="progress-step"></div>
		</div>
		<div class="verification-title">
			<h1>Verification</h1>
			<div class="phone-icon">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
					<path
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
					/>
				</svg>
			</div>
		</div>
	</div>

	<div class="content">
		<p class="instruction">
			Enter your phone number or email address to receive a verification code.
		</p>

		<div class="input-fields">
			<input
				type="text"
				placeholder="(xxx) xxx-xxxx"
				bind:value={phoneNumber}
				class="input-field"
			/>

			<div class="or-divider">or</div>

			<input type="email" placeholder="email@example.com" bind:value={email} class="input-field" />

			<button class="send-code-button" on:click={sendCode}> send code </button>
		</div>

		<div class="verification-code-section">
			<div class="code-inputs">
				{#each verificationCode as digit, i}
					<input
						id="code-{i}"
						type="text"
						inputmode="numeric"
						maxlength="1"
						value={digit}
						on:input={(e) => updateCode(i, e)}
						on:keydown={(e) => handleKeydown(i, e)}
						class="code-input"
					/>
				{/each}
			</div>
			<p class="enter-code-text">Enter your 6-digit code</p>
			<button class="resend-button" on:click={resendCode}> Didn't receive a code? </button>
		</div>

		<button
			class="next-button {isCodeComplete ? 'active' : 'disabled'}"
			on:click={handleNext}
			disabled={!isCodeComplete}
		>
			Next <span class="arrow">›</span>
		</button>
	</div>

	<!-- Toast notification -->
	{#if showToast}
		<div class="toast-notification">
			<div class="toast-content">
				{toastMessage}
			</div>
		</div>
	{/if}
</div>

<style>
	/* Import fonts */
	@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Nunito:wght@400;600;700&display=swap');

	/* Container and global styles */
	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: 'Roboto', sans-serif; /* Set Roboto as the default font */
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
		background: linear-gradient(to bottom, #9370db, #f8f8f8);
		padding: 20px;
		color: #333;
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
		background-color: #7848FB;
		border-color: #7848FB;
	}

	.progress-line {
		flex: 1;
		height: 2px;
		background-color: #ddd;
	}

	/* Verification title */
	.verification-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 15px;
	}

	.verification-title h1 {
		font-size: 24px;
		font-weight: 400;
	}

	.phone-icon {
		width: 30px;
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/* Content section */
	.content {
		padding: 20px;
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.instruction {
		margin-bottom: 20px;
		color: #333;
		font-size: 14px;
	}

	/* Input fields */
	.input-fields {
		display: flex;
		flex-direction: column;
		margin-bottom: 30px;
	}

	.input-field {
		padding: 12px 15px;
		border: 1px solid #ddd;
		border-radius: 5px;
		font-size: 14px;
		margin-bottom: 10px;
	}

	.or-divider {
		text-align: center;
		margin: 10px 0;
		color: #666;
	}

	/* Send code button */
	.send-code-button {
		background-color: #8a70db;
		color: white;
		border: none;
		border-radius: 20px;
		padding: 10px;
		font-size: 14px;
		cursor: pointer;
		margin-top: 5px;
		width: 120px;
		align-self: center;
		font-family: 'Nunito', sans-serif; /* Apply Nunito to button */
	}

	/* Verification code inputs */
	.verification-code-section {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 40px;
	}

	.code-inputs {
		display: flex;
		justify-content: space-between;
		width: 100%;
		margin-bottom: 5px;
	}

	.code-input {
		width: 40px;
		height: 40px;
		border: none;
		border-bottom: 1px solid #999;
		text-align: center;
		font-size: 18px;
		margin: 0 5px;
		background: transparent;
	}

	.code-input:focus {
		outline: none;
		border-bottom: 2px solid #8a70db;
	}

	.enter-code-text {
		font-size: 12px;
		color: #666;
		margin-top: 10px;
	}

	/* Resend button */
	.resend-button {
		background: none;
		border: none;
		color: #8a70db;
		text-decoration: underline;
		cursor: pointer;
		font-size: 14px;
		margin-top: 15px;
		font-family: 'Nunito', sans-serif; /* Apply Nunito to button */
	}

	/* Next button */
	.next-button {
		background-color: #8a70db;
		color: white;
		border: none;
		border-radius: 30px;
		padding: 15px 20px;
		font-size: 16px;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		margin-top: auto;
		width: 100%;
		font-family: 'Nunito', sans-serif; /* Apply Nunito to button */
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
	/* Toast notification */
	.toast-notification {
		position: fixed;
		bottom: 80px;
		left: 50%;
		transform: translateX(-50%);
		background-color: rgba(0, 0, 0, 0.8);
		color: white;
		padding: 10px 20px;
		border-radius: 5px;
		z-index: 1000;
		animation: fadeInOut 5s ease-in-out;
	}

	.toast-content {
		font-size: 14px;
	}

	@keyframes fadeInOut {
		0% {
			opacity: 0;
		}
		10% {
			opacity: 1;
		}
		90% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}

	@media (min-width: 600px) {
		.container {
			max-width: 450px;
			margin: 0 auto;
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		}
	}
</style>

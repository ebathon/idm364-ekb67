<script>
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { goto } from '$app/navigation';

	// Import icons for chat interface
	import sendIcon from '$lib/image/send_icon.png';

	// Initial messages store - Empty at start
	const messages = writable([]);

	// Current input text
	let currentText = '';
	let conversation;

	// Format time for messages
	function getFormattedTime() {
		const now = new Date();
		let hours = now.getHours();
		const minutes = now.getMinutes().toString().padStart(2, '0');
		const ampm = hours >= 12 ? 'PM' : 'AM';
		hours = hours % 12;
		hours = hours ? hours : 12; // Convert 0 to 12
		return `${hours}:${minutes} ${ampm}`;
	}

	// Send a message
	function sendMessage() {
		if (currentText.trim() !== '') {
			// Add user (Josh's) message
			messages.update((msgs) => [
				...msgs,
				{
					type: 'sent',
					text: currentText,
					time: getFormattedTime(),
					delivered: true
				}
			]);

			// Clear input
			currentText = '';

			// Simulate Rachel's response after delay
			setTimeout(() => {
				const responses = [
					"Hey Josh! I'm doing great, how about you?",
					"Just got back from a run. How’s your day going?",
					"Hi! Did you catch that jazz festival downtown?",
					"Hey, good to hear from you! What’s up?",
					"I’m good, thanks for asking! How’s work?"
				];
				const randomResponse = responses[Math.floor(Math.random() * responses.length)];

				messages.update((msgs) => [
					...msgs,
					{
						type: 'received',
						text: randomResponse,
						time: getFormattedTime()
					}
				]);
			}, 1500);
		}
	}

	// Send a thumb up
	function sendThumb() {
		messages.update((msgs) => [
			...msgs,
			{
				type: 'sent',
				isThumb: true,
				animating: true,
				time: getFormattedTime()
			}
		]);

		// Remove animation class after animation completes
		setTimeout(() => {
			messages.update((msgs) => {
				const lastMsg = { ...msgs[msgs.length - 1], animating: false };
				return [...msgs.slice(0, -1), lastMsg];
			});
		}, 600);
	}

	// Auto-scroll to bottom when messages change
	$: if (conversation && $messages) {
		setTimeout(() => {
			conversation.scrollTop = conversation.scrollHeight;
		}, 0);
	}

	onMount(() => {
		// Focus the input field
		document.getElementById('messageInput').focus();
	});
</script>

<div class="screen">
	<!-- Status Bar -->
	<div class="status-bar">
		<span>9:41</span>
		<div>
			<span>📶</span>
			<span>📡</span>
			<span>🔋</span>
		</div>
	</div>

	<!-- Chat Header -->
	<div class="chat-header">
		<div class="back-button" on:click={() => goto('/messages')}>‹</div>
		<h2>Rachel</h2>
	</div>

	<!-- Chat Conversation -->
	<div class="conversation" bind:this={conversation}>
		{#each $messages as message}
			<div class="message-wrapper {message.type}-wrapper">
				{#if message.isThumb}
					<div class="message sent thumb {message.animating ? 'animating' : ''}">👍</div>
				{:else}
					<div class="message {message.type}">
						{message.text}
					</div>
					<div class="timestamp">
						{message.time}
					</div>
					{#if message.type === 'sent' && message.delivered}
						<div class="read-receipt">Delivered</div>
					{/if}
				{/if}
			</div>
		{/each}
	</div>

	<!-- Input Bar -->
	<div class="text-bar">
		<input
			type="text"
			id="messageInput"
			bind:value={currentText}
			placeholder="iMessage"
			on:keydown={(e) => e.key === 'Enter' && sendMessage()}
		/>
		<button class="btn thumb-btn" on:click={sendThumb} aria-label="Send thumbs up">👍</button>
		<button class="btn send-btn" on:click={sendMessage} aria-label="Send message">
			{#if sendIcon}
				<img src={sendIcon} alt="Send" />
			{:else}
				↑
			{/if}
		</button>
	</div>
</div>

<style>
	/* Reset and base styles */
	:global(body) {
		font-family:
			-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		background-color: #f2f2f7;
		margin: 0;
		padding: 0;
	}

	/* iPhone Chat Styling */
	.screen {
		background-color: #f5f5f7;
		height: 800px;
		width: 400px;
		border-radius: 30px;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
		display: flex;
		flex-direction: column;
		border: 10px solid white;
		overflow: hidden;
		position: relative;
	}

	/* Status bar */
	.status-bar {
		display: flex;
		justify-content: space-between;
		padding: 6px 20px;
		background-color: #f5f5f7;
		font-size: 14px;
		font-weight: 600;
	}

	/* Chat header */
	.chat-header {
		padding: 10px 16px;
		text-align: center;
		border-bottom: 1px solid #e0e0e0;
		background-color: #f5f5f7;
		display: flex;
		align-items: center;
		position: relative;
	}

	.chat-header h2 {
		font-size: 16px;
		font-weight: 600;
		margin: 0;
		flex: 1;
	}

	.back-button {
		position: absolute;
		left: 16px;
		font-size: 28px;
		color: #007aff;
		text-decoration: none;
		font-weight: 600;
		line-height: 1;
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
	}

	/* Conversation Area */
	.conversation {
		flex: 1;
		overflow-y: auto;
		padding: 15px;
		display: flex;
		flex-direction: column;
		gap: 10px;
		background-color: #ffffff;
	}

	/* Message Wrapper */
	.message-wrapper {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.sent-wrapper {
		align-items: flex-end;
	}

	.received-wrapper {
		align-items: flex-start;
	}

	/* Timestamp */
	.timestamp {
		font-size: 11px;
		color: #8e8e93;
		margin: 4px 10px;
	}

	/* Message Bubbles */
	.message {
		padding: 10px 14px;
		border-radius: 18px;
		max-width: 75%;
		font-size: 16px;
		line-height: 1.4;
		word-wrap: break-word;
		position: relative;
	}

	.received {
		background-color: #e5e5ea;
		color: #000000;
		border-top-left-radius: 5px;
	}

	.sent {
		background-color: #007aff;
		color: white;
		border-top-right-radius: 5px;
	}

	.thumb {
		padding: 5px;
		border-radius: 50%;
		width: 45px;
		height: 45px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 20px;
	}

	/* Text Input Bar */
	.text-bar {
		display: flex;
		align-items: center;
		padding: 10px 8px;
		background: #ffffff;
		border-top: 1px solid #e0e0e0;
	}

	.text-bar input {
		flex: 1;
		padding: 10px 14px;
		border: 1px solid #ddd;
		border-radius: 20px;
		font-size: 16px;
		outline: none;
		background-color: #f5f5f7;
	}

	/* Button styles */
	.btn {
		width: 60px;
		height: 60px;
		border: none;
		cursor: pointer;
		transition: transform 0.1s ease;
		background-color: transparent;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.btn img {
		width: 45px;
		height: 45px;
	}

	.thumb-btn {
		font-size: 30px;
	}

	.btn:active {
		transform: scale(1.1);
	}

	/* Read receipts */
	.read-receipt {
		font-size: 11px;
		color: #8e8e93;
		margin-top: 2px;
		text-align: right;
	}

	/* Thumbs-Up Animation */
	.animating {
		animation: wiggle 0.3s ease 2;
	}

	@keyframes wiggle {
		0% {
			transform: rotate(0deg);
		}
		25% {
			transform: rotate(6deg);
		}
		50% {
			transform: rotate(-6deg);
		}
		75% {
			transform: rotate(3deg);
		}
		100% {
			transform: rotate(0deg);
		}
	}
</style>
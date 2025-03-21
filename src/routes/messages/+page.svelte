<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	// Import navigation icons
	import home from '$lib/image/home_nav.png';
	import likes from '$lib/image/likes_nav.png';
	import message from '$lib/image/message_nav.png';
	import profile from '$lib/image/profile_nav.png';

	// Import user profile images
	import Shelby from '$lib/image/Msgs_Shelby.png';
	import Olivia from '$lib/image/Msgs_Olivia.png';
	import Carly from '$lib/image/Msgs_Carly.png';
	import Shayla from '$lib/image/Msgs_Shayla.png';
	import Shari from '$lib/image/Msgs_Shari.png';

	// Define message data
	const messagesData = {
		myMessages: [
			{
				id: 2,
				name: 'Shelby',
				image: Shelby,
				text: 'Hey Josh, How are you...',
				status: 'accepted',
				icon: '✓',
				color: '#E8F5E9'
			},
			{
				id: 3,
				name: 'Olivia',
				image: Olivia,
				text: 'Hey Olivia, How are you...',
				status: 'expiring soon',
				icon: '⏱️',
				color: '#FFF8E1'
			}
		],
		requests: [
			{
				id: 1,
				name: 'Carly',
				image: Carly,
				text: 'Hey Josh! I saw your profile and I think we have a lot of...',
				status: 'pending',
				icon: '⏱️',
				color: '#E3F2FD'
			},
			{
				id: 4,
				name: 'Shayla',
				image: Shayla,
				text: 'Hey Josh! I saw your profile and I think we have a lot of...',
				status: 'pending',
				icon: '⏱️',
				color: '#E3F2FD'
			},
			{
				id: 5,
				name: 'Shari',
				image: Shari,
				text: 'Hey! I saw you were interested in the bar crawl. I am planning on....',
				status: 'pending',
				icon: '⏱️',
				color: '#E3F2FD'
			}
		]
	};

	// Set the initial active tab to match the image

	let activeTab = 'requests';

	function toggleTab(tab) {
		activeTab = tab;
	}

	function detectCityAndFetchEvents() {
		console.log('Fetching events...');
	}

	onMount(detectCityAndFetchEvents);
</script>

<header>
	<div class="back-button" on:click={() => goto('/')}>‹</div>
	<div class="page-title">Messages</div>
</header>

<!-- Toggle Buttons -->
<div class="toggle-container">
	<div class="toggle-slider {activeTab === 'myMessages' ? 'left' : 'right'}"></div>

	<button
		class="toggle-option {activeTab === 'myMessages' ? 'active' : ''}"
		on:click={() => toggleTab('myMessages')}
	>
		My Messages
	</button>

	<button
		class="toggle-option {activeTab === 'requests' ? 'active' : ''}"
		on:click={() => toggleTab('requests')}
	>
		Message Requests
		{#if messagesData.requests.length > 0}
			<span class="message-requests-badge">{messagesData.requests.length}</span>
		{/if}
	</button>
</div>

<!-- Messages Section -->
<div class="content">
	{#if activeTab === 'myMessages'}
		{#each messagesData.myMessages as msg}
			<div
				class="messenger"
				role="button"
				tabindex="0"
				on:click={() => goto('/messenger')}
				on:keydown={(event) => {
					if (event.key === 'Enter' || event.key === ' ') goto('/messenger');
				}}
				style="cursor: pointer;"
			>
				<div class="message-card" style="background-color: {msg.color}">
					<div class="profile-image">
						<img src={msg.image} alt="{msg.name}'s profile" />
					</div>
					<div class="message-content">
						<div class="message-name">{msg.name}</div>
						<div class="message-preview">{msg.text}</div>
					</div>
					<div class="message-status">
						{msg.status}
						<span class="status-icon">{msg.icon}</span>
					</div>
				</div>
			</div>
		{/each}
	{:else}
		{#each messagesData.requests as msg}
			<div class="message-card" style="background-color: {msg.color}">
				<div class="profile-image">
					<img src={msg.image} alt="{msg.name}'s profile" />
				</div>
				<div class="message-content">
					<div class="message-name">{msg.name}</div>
					<div class="message-preview">{msg.text}</div>
				</div>
				<div class="message-status">
					{msg.status}
					<span class="status-icon">{msg.icon}</span>
				</div>
			</div>
		{/each}
	{/if}
</div>

<!-- Navigation Footer -->
<!-- Navigation Menu -->
<menu>
	<div><a href="/"><img src={home} height="60" width="60" alt="Home" /></a></div>
	<div><a href="likes"><img src={likes} height="60" width="60" alt="Likes" /></a></div>
	<div><a href="/messages"><img src={message} height="60" width="60" alt="Likes" /></a></div>
	<div><a href="profile"><img src={profile} height="60" width="60" alt="Likes" /></a></div>
</menu>

<style>
	header {
		display: flex;
		align-items: center;
		padding: 20px 16px;
		background-color: #fafafa;
	}

	.back-button {
		font-size: 28px;
		margin-right: 16px;
		cursor: pointer;
		color: #333;
	}

	.page-title {
		font-size: 24px;
		font-weight: 600;
		color: #333;
	}

	.toggle-container {
		display: flex;
		position: relative;
		background-color: #e0e0e0;
		border-radius: 25px;
		margin: 16px;
		height: 44px;
		overflow: hidden;
	}

	.toggle-slider {
		position: absolute;
		width: 50%;
		height: 100%;
		background: linear-gradient(to right, #a659ff, #6979ff);
		border-radius: 25px;
		transition: transform 0.3s ease;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.toggle-slider.left {
		transform: translateX(0);
	}

	.toggle-slider.right {
		transform: translateX(100%);
	}

	.toggle-option {
		flex: 1;
		border: none;
		background: none;
		padding: 10px;
		cursor: pointer;
		z-index: 1;
		position: relative;
		font-weight: 500;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #555;
	}

	.toggle-option.active {
		color: white;
	}

	.message-requests-badge {
		background-color: #ff6464;
		color: white;
		border-radius: 50%;
		width: 22px;
		height: 22px;
		font-size: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: 8px;
	}

	.content {
		overflow-y: auto;
		padding: 0 16px;
		flex: 1;
		display: flex;
		flex-direction: column;

		margin-bottom: 70px;
	}

	.message-card {
		display: flex;
		padding: 16px;
		border-radius: 20px;
		align-items: center;
		margin-bottom: 14px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
	}

	.messenger {
		cursor: pointer;
	}

	.profile-image {
		width: 52px;
		height: 52px;
		border-radius: 50%;
		overflow: hidden;
		margin-right: 14px;
		border: 2px solid white;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}

	.profile-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.message-content {
		flex: 1;
	}

	.message-name {
		font-weight: 600;
		margin-bottom: 6px;
		font-size: 18px;
	}

	.message-preview {
		color: #666;
		font-size: 14px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 200px;
	}

	.message-status {
		font-size: 14px;
		color: #777;
		display: flex;
		align-items: center;
		white-space: nowrap;
		margin-left: auto;
		padding-left: 10px;
	}

	.status-icon {
		margin-left: 4px;
		font-size: 16px;
	}

	/* Set message colors to match the design */
	:global(body) {
		background-color: white;
		margin: 0;
		font-family:
			-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
			'Helvetica Neue', sans-serif;
	}

	menu {
		display: flex;
		justify-content: space-around;
		align-items: center;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		margin: 0;
		padding: 10px 0;
		background: linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 1));
	}

	menu div {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	menu a {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	menu img {
		width: 60px;
		height: 60px;
	}
</style>

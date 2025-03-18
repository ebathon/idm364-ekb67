<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import JoshDog from '$lib/image/Josh_Dog.jpeg';
	import JoshOutside from '$lib/image/Josh_Outside.jpeg';
	import JoshBeach from '$lib/image/Josh_beach.jpeg';
	import JoshHike from '$lib/image/JoshHike.jpeg';
	import JoshPool from '$lib/image/JoshPool.jpeg';
	import JoshWinter from '$lib/image/joshWinter.jpeg';

	// State for photos
	let photos = Array(6).fill(null);
	let showPermissionModal = false;
	let showPhotoLibrary = false;
	let selectedLibraryPhotos = [];
	
	// Button state
	let finishButtonEnabled = false;
	
	// Photo library images with imported assets
	let libraryPhotos = [
		{ id: 1, url: JoshDog, selected: false },
		{ id: 2, url: JoshOutside, selected: false },
		{ id: 3, url: JoshBeach, selected: false },
		{ id: 4, url: JoshHike, selected: false },
		{ id: 5, url: JoshPool, selected: false },
		{ id: 6, url: JoshWinter, selected: false }
	];
	
	// Update button state based on number of selected photos
	$: {
		const photoCount = photos.filter(photo => photo !== null).length;
		finishButtonEnabled = photoCount >= 3;
	}
	
	function goBack() {
		history.back();
	}
	
	function finish() {
		if (finishButtonEnabled) {
			goto('/UserPages');
		}
	}
	
	function openAddPhoto(index) {
		showPermissionModal = true;
		// Store the index for when permission is granted
		window.currentPhotoIndex = index;
	}
	
	function allowPhotoAccess() {
		showPermissionModal = false;
		showPhotoLibrary = true;
		// Reset selections
		libraryPhotos = libraryPhotos.map(photo => ({ ...photo, selected: false }));
		selectedLibraryPhotos = [];
	}
	
	function denyPhotoAccess() {
		showPermissionModal = false;
	}
	
	function togglePhotoSelection(photo) {
		photo.selected = !photo.selected;
		
		// Force reactivity by reassigning the array
		libraryPhotos = [...libraryPhotos];
		
		if (photo.selected) {
			selectedLibraryPhotos = [...selectedLibraryPhotos, photo];
		} else {
			selectedLibraryPhotos = selectedLibraryPhotos.filter(p => p.id !== photo.id);
		}
	}
	
	function applySelectedPhotos() {
		const currentIndex = window.currentPhotoIndex || 0;
		
		// Add selected photos to the photos array
		selectedLibraryPhotos.forEach((photo, idx) => {
			const targetIndex = (currentIndex + idx) % photos.length;
			photos[targetIndex] = photo.url;
		});
		
		// Update the photos array to trigger reactivity
		photos = [...photos];
		
		// Close photo library
		showPhotoLibrary = false;
	}
	
	function cancelPhotoSelection() {
		showPhotoLibrary = false;
	}
	
	function removePhoto(index) {
		photos[index] = null;
		photos = [...photos]; // Trigger reactivity
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

		<div class="photos-info">Photos</div>

		<div class="photos-title">
			<h1>Add Photos <span class="camera-icon">📷</span></h1>
		</div>
	</div>

	<div class="photo-container">
		<div class="required-text">At Least 3 Required</div>
		
		<div class="photo-grid">
			{#each photos as photo, index}
				<div class="photo-box">
					{#if photo}
						<img src={photo} alt="User upload" class="uploaded-image" />
						<button class="remove-photo" on:click={() => removePhoto(index)}>✕</button>
					{:else}
						<button class="add-photo" on:click={() => openAddPhoto(index)}>
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M12 5V19M5 12H19" stroke="#AAAAAA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</button>
					{/if}
				</div>
			{/each}
		</div>
	</div>

	<button
		class="finish-button {finishButtonEnabled ? 'active' : 'disabled'}"
		on:click={finish}
		disabled={!finishButtonEnabled}
	>
		Finish <span class="arrow">›</span>
	</button>
	
	<!-- Permission Modal -->
	{#if showPermissionModal}
		<div class="modal-overlay">
			<div class="permission-modal">
				<div class="permission-content">
					<h3>"Happen" Would Like to Access Your Photo Library</h3>
					<div class="permission-buttons">
						<button class="deny-button" on:click={denyPhotoAccess}>Deny</button>
						<button class="allow-button" on:click={allowPhotoAccess}>Allow</button>
					</div>
				</div>
			</div>
		</div>
	{/if}
	
	<!-- Photo Library Modal -->
	{#if showPhotoLibrary}
		<div class="modal-overlay">
			<div class="library-modal">
				<div class="library-header">
					<button class="cancel-button" on:click={cancelPhotoSelection}>Cancel</button>
					<h3>Photo Library</h3>
					<button 
						class="apply-button {selectedLibraryPhotos.length > 0 ? 'active' : ''}" 
						on:click={applySelectedPhotos}
						disabled={selectedLibraryPhotos.length === 0}
					>
						Apply
					</button>
				</div>
				
				<div class="library-grid">
					{#each libraryPhotos as photo (photo.id)}
						<div 
							class="library-photo {photo.selected ? 'selected' : ''}" 
							on:click={() => togglePhotoSelection(photo)}
						>
							<img src={photo.url} alt="Library photo" />
							{#if photo.selected}
								<div class="selection-indicator">
									<svg viewBox="0 0 24 24" width="24" height="24">
										<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="white" />
									</svg>
								</div>
							{/if}
						</div>
					{/each}
				</div>
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

	.photos-info {
		font-size: 16px;
		font-weight: 500;
		margin-bottom: 15px;
	}

	.photos-title {
		margin-bottom: 15px;
	}

	.photos-title h1 {
		font-size: 24px;
		font-weight: 400;
		display: flex;
		align-items: center;
	}

	.camera-icon {
		margin-left: 10px;
	}

	/* Photo container */
	.photo-container {
		padding: 20px;
		flex-grow: 1;
	}

	.required-text {
		font-size: 16px;
		font-weight: 500;
		margin-bottom: 15px;
		color: #333;
	}

	.photo-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 15px;
	}

	.photo-box {
		position: relative;
		aspect-ratio: 1;
		background-color: white;
		border-radius: 10px;
		overflow: hidden;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
	}

	.add-photo {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: none;
		border: none;
		cursor: pointer;
	}

	.uploaded-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.remove-photo {
		position: absolute;
		top: 5px;
		right: 5px;
		width: 24px;
		height: 24px;
		border-radius: 12px;
		background-color: rgba(0, 0, 0, 0.6);
		color: white;
		border: none;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		font-size: 12px;
	}

	/* Finish button */
	.finish-button {
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
	
	.finish-button.disabled {
		background-color: #cccccc;
		cursor: not-allowed;
		opacity: 0.7;
	}

	.finish-button.active {
		background-color: #7848FB;
		cursor: pointer;
	}

	.arrow {
		margin-left: 10px;
		font-size: 22px;
	}

	/* Modal styles */
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
	}

	/* Permission modal */
	.permission-modal {
		width: 80%;
		max-width: 320px;
		background-color: white;
		border-radius: 14px;
		overflow: hidden;
	}

	.permission-content {
		padding: 20px;
		text-align: center;
	}

	.permission-content h3 {
		font-size: 16px;
		font-weight: 500;
		margin-bottom: 20px;
	}

	.permission-buttons {
		display: flex;
		border-top: 1px solid #ddd;
	}

	.permission-buttons button {
		flex: 1;
		padding: 15px;
		border: none;
		background: none;
		font-size: 16px;
		cursor: pointer;
	}

	.deny-button {
		color: #ff3b30;
		border-right: 1px solid #ddd;
	}

	.allow-button {
		color: #007aff;
	}

	/* Library modal */
	.library-modal {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: white;
		border-top-left-radius: 14px;
		border-top-right-radius: 14px;
		max-height: 70vh;
		display: flex;
		flex-direction: column;
	}

	.library-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 15px;
		border-bottom: 1px solid #eee;
	}

	.library-header h3 {
		font-size: 16px;
		font-weight: 500;
	}

	.cancel-button, .apply-button {
		background: none;
		border: none;
		padding: 5px 10px;
		font-size: 16px;
		cursor: pointer;
	}

	.cancel-button {
		color: #555;
	}

	.apply-button {
		color: #cccccc;
	}

	.apply-button.active {
		color: #007aff;
	}

	.library-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 5px;
		padding: 10px;
		overflow-y: auto;
		max-height: calc(70vh - 60px);
	}

	.library-photo {
		position: relative;
		aspect-ratio: 1;
		cursor: pointer;
		overflow: hidden;
		border: 2px solid transparent;
	}

	.library-photo.selected {
		border: 2px solid #007aff;
	}

	.library-photo img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.selection-indicator {
		position: absolute;
		bottom: 5px;
		right: 5px;
		width: 24px;
		height: 24px;
		background-color: #007aff;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10; /* Ensure it’s on top */
	}

	.selection-indicator svg {
		width: 18px;
		height: 18px;
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
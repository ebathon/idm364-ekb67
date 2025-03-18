<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  
  // Import settings and navigation icons
  import setting from '$lib/image/settings_icon.png';
  import home from '$lib/image/home_nav.png';
  import likes from '$lib/image/likes_nav.png';
  import message from '$lib/image/message_nav.png';
  import profile from '$lib/image/profile_nav.png';
  
  // Import attendee images - with corrected file extensions
  import shaylaImg from '$lib/image/Shayla.jpeg';
  import rachelImg from '$lib/image/Rachel.jpeg';
  import shariImg from '$lib/image/Shari.jpeg';
  import amandaImg from '$lib/image/Amanda.png'; // Corrected extension to .png
  import gabiImg from '$lib/image/Gabi.jpg'; // Added Gabi's image
  import allieImg from '$lib/image/allie.jpeg';
  
  function goBack() {
    history.back();
  }
  
  // Function to handle attendee click
  function handleAttendeeClick(attendeeName) {
    if (attendeeName.toLowerCase() === 'rachel') {
      goto('/rachel-profile');
    }
    // You can extend this for other attendees later if needed
  }
  
  // Filter data
  const filters = [
    { id: 1, label: '22-35', color: '#FAE1AA' },
    { id: 2, label: 'Within 5 mi', color: '#B8F0D8' },
    { id: 3, label: 'Democrat', color: '#A5C8F3' }
  ];
  
  // Attendees data with imported images
  const attendees = [
    { name: 'Shayla', age: 29, image: shaylaImg, verified: false },
    { name: 'Rachel', age: 31, image: rachelImg, verified: false },
    { name: 'Shari', age: 28, image: shariImg, verified: true },
    { name: 'Amanda', age: 26, image: amandaImg, verified: false },
    { name: 'Gabi', age: 27, image: gabiImg, verified: false },
    { name: 'Allie', age: 25, image: allieImg, verified: true }
  ];
</script>

<div class="festival-container">
  <!-- Header with app title "Happen" -->
  <header>
    <div class="log"><a href="/sign_in/1">Sign in</a></div>
    <div class="app-title">Happen</div>
    <div class="setting">
      <img src={setting} height="28" width="28" alt="Settings" />
    </div>
  </header>
  
  <div class="content">
    <!-- Event title with back button -->
    <div class="event-header">
      <button class="back-button" on:click={goBack}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M15 18L9 12L15 6"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <h2 class="event-title">Downtown Jazz Festival</h2>
    </div>
    
    <!-- Filter toggle and tags -->
    <div class="filter-section">
      <button class="filter-toggle">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="black">
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
        </svg>
      </button>
      
      <div class="filter-tags">
        {#each filters as filter}
          <div class="filter-tag" style="background-color: {filter.color}">
            {filter.label}
            <button class="tag-close">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="rgba(0,0,0,0.1)"/>
                <path d="M15 9l-6 6M9 9l6 6" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
        {/each}
      </div>
    </div>
    
    <!-- Attendees grid -->
    <div class="attendees-grid">
      {#each attendees as attendee}
        <div 
          class="attendee-card" 
          on:click={() => handleAttendeeClick(attendee.name)}
          role="button"
          tabindex="0"
          on:keydown={(e) => e.key === 'Enter' && handleAttendeeClick(attendee.name)}
        >
          <img src={attendee.image} alt="{attendee.name}" class="attendee-photo"/>
          <div class="attendee-info">
            <span class="attendee-name">{attendee.name}, {attendee.age}</span>
            {#if attendee.verified}
              <span class="verified-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#30A0FF">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </span>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  </div>
  
  <!-- Navigation Menu - Using the same style as your other screens -->
  <menu>
    <div><a href="/"><img src={home} height="60" width="60" alt="Home" /></a></div>
    <div><a href="likes"><img src={likes} height="60" width="60" alt="Likes" /></a></div>
    <div><a href="/messages"><img src={message} height="60" width="60" alt="Messages" /></a></div>
    <div><a href="profile"><img src={profile} height="60" width="60" alt="Profile" /></a></div>
  </menu>
</div>

<style>
  /* Import Nunito font as in your other screens */
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Pathway+Extreme:wght@400;600;700&display=swap');

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'SF Pro Display', 'Roboto', sans-serif;
  }

  :global(body) {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  /* Container */
  .festival-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: white;
  }
  
  /* Header - matching your other screens with purple gradient */
  header {
    background-image: linear-gradient(#d3b9ff, rgb(255, 255, 255));
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    font-size: 16px;
  }

  .app-title {
    font-family: 'Pathway Extreme', sans-serif;
    font-size: 24px;
    font-weight: 550;
    color: #5f2eea;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    letter-spacing: 1px;
  }

  .log {
    font-size: 16px;
    text-decoration: none;
    color: #000;
  }

  .log a {
    text-decoration: none;
    color: #000;
  }

  .setting {
    padding: 0;
  }

  /* Content area */
  .content {
    flex: 1;
    padding-bottom: 70px; /* Space for menu */
    overflow-y: auto;
  }
  
  /* Event header with back button */
  .event-header {
    display: flex;
    align-items: center;
    padding: 15px 20px;
    gap: 15px;
  }
  
  .back-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
  }
  
  .event-title {
    font-family: 'Nunito', sans-serif;
    font-size: 22px;
    font-weight: 600;
  }
  
  /* Filter section */
  .filter-section {
    display: flex;
    padding: 0 15px 15px;
    align-items: center;
    gap: 15px;
  }
  
  .filter-toggle {
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
  }
  
  .filter-tags {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  
  .filter-tag {
    display: flex;
    align-items: center;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 14px;
    gap: 5px;
  }
  
  .tag-close {
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  /* Attendees grid */
  .attendees-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    padding: 0 15px;
    margin-top: 10px;
  }
  
  .attendee-card {
    border-radius: 12px;
    overflow: hidden;
    position: relative;
    aspect-ratio: 1 / 1;
    cursor: pointer; /* Indicate clickability */
  }
  
  .attendee-photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .attendee-info {
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .attendee-name {
    color: white;
    font-weight: 600;
    font-size: 16px;
    font-family: 'Nunito', sans-serif;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
  }
  
  .verified-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
  }
  
  /* Navigation menu - exactly like your other screens */
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
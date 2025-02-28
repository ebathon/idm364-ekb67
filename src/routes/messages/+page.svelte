<!-- <script>

import { onMount } from "svelte";
    import setting from '$lib/image/settings_icon.png';
    import home from '$lib/image/home_nav.png';
    import likes from '$lib/image/likes_nav.png';
    import message from '$lib/image/message_nav.png';
    import profile from '$lib/image/profile_nav.png';

    import David from '$lib/image/Msgs_David.png';
    import Josh from '$lib/image/Msgs_Josh.png';
    import Miles from '$lib/image/Msgs_Miles.png';
    import Tyler from '$lib/image/Msgs_Tyler.png';
    import Dom from '$lib/image/Msgs_Dom.png';
    import Jacob from '$lib/image/Msgs_Jacob.png';


          // Create a mapping of names to their images
  const imageMap = {
    "David": David,
    "Josh": Josh,
    "Miles": Miles,
    "Tyler": Tyler,
    "Dom": Dom,
    "Jacob": Jacob
  };
  
    // You might want to define these as props or fetch from an API
    const messages = [
      { name: "David", text: "Hey! How are you doing?" },
      { name: "Josh", text: "I noticed you and I both liked the latte art class!" },
      { name: "Miles", text: "Are you still interested in going to this event?" },
      { name: "Tyler", text: "It seems like you and I have a lot of interests in common." },
      { name: "Dom", text: "Hey! I'd love to do this cooking class if you'll join me." },
      { name: "Jacob", text: "So you're interested in goat yoga too??" }
      
    ];

  </script>
  
  <header>
    <div>Happen</div>
    <div class="setting">
      <img src="image/settings_icon.png" alt="Settings" height="28" width="28"/>
    </div>
  </header>
  
  <div class="content">
    <div class="main_home_title">Messages</div>
    
    {#each messages as message, index}
      <div class="home_list">
        {#if index > 0}
          <hr>
        {/if}
        <div id="liked" class="home_title">{message.name}</div>
        <div class="home_list_con">
          <div> 
            <img src={imageMap[message.name]} alt="{message.name}'s profile"/>
          </div>
          <p id="liked">{message.text}</p>
        </div>
      </div>
    {/each}
  </div>
  
  <menu>
    <div id="home">
      <a href="/+page.svelte"> 
        <img src={home} alt="Home" height="60" width="60"/>
      </a>
    </div>
    <div id="map">
      <a href="likes.html"> 
        <img src={likes} alt="Likes" height="60" width="60"/>
      </a>
    </div>
    <div class="active" id="order">
      <a href="/messages"> 
        <img src={message} alt="Messages" height="60" width="60"/>
      </a>
    </div>
    <div id="rewards">
      <a href="/profile"> 
        <img src={profile} alt="Profile" height="60" width="60"/>
      </a>
    </div>
  </menu>
  
  <style>
    /* You'll need to add your CSS styles here */
    /* The original HTML likely had external CSS */
    
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .content {
      margin-bottom: 70px; /* Make room for the menu */
    }
    
    menu {
      display: flex;
      justify-content: space-around;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: white;
    }
    
    .home_list_con {
      display: flex;
      align-items: center;
    }
    
    .home_list_con > div {
      margin-right: 10px;
    }
    
    .active {
      /* Style for active nav item */
    }
  </style> -->


  <!-- <script>
    import { onMount } from "svelte";
    import setting from '$lib/image/settings_icon.png';
    import home from '$lib/image/home_nav.png';
    import likes from '$lib/image/likes_nav.png';
    import message from '$lib/image/message_nav.png';
    import profile from '$lib/image/profile_nav.png';
  
    import David from '$lib/image/Msgs_David.png';
    import Josh from '$lib/image/Msgs_Josh.png';
    import Miles from '$lib/image/Msgs_Miles.png';
    import Tyler from '$lib/image/Msgs_Tyler.png';
    import Dom from '$lib/image/Msgs_Dom.png';
    import Jacob from '$lib/image/Msgs_Jacob.png';
  
    // Create a mapping of names to their images
    const imageMap = {
      "David": David,
      "Josh": Josh,
      "Miles": Miles,
      "Tyler": Tyler,
      "Dom": Dom,
      "Jacob": Jacob
    };
    
    // You might want to define these as props or fetch from an API
    const messages = [
      { name: "David", text: "Hey! How are you doing?" },
      { name: "Josh", text: "I noticed you and I both liked the latte art class!" },
      { name: "Miles", text: "Are you still interested in going to this event?" },
      { name: "Tyler", text: "It seems like you and I have a lot of interests in common." },
      { name: "Dom", text: "Hey! I'd love to do this cooking class if you'll join me." },
      { name: "Jacob", text: "So you're interested in goat yoga too??" }
    ];
  </script>
  
  <header>
    <div>Happen</div>
    <div class="setting">
      <img src={setting} alt="Settings" height="28" width="28"/>
    </div>
  </header>
  
  <div class="content">
    <div class="main_home_title">Messages</div>
    
    {#each messages as message, index}
      <div class="home_list">
        {#if index > 0}
          <hr>
        {/if}
        <div class="home_title liked">{message.name}</div>
        <div class="home_list_con">
          <div class="profile-image"> 
            <img src={imageMap[message.name]} alt="{message.name}'s profile"/>
          </div>
          <p class="liked">{message.text}</p>
        </div>
      </div>
    {/each}
  </div>
  
  <menu>
    <div id="home">
      <a href="/"> 
        <img src={home} alt="Home" height="60" width="60"/>
      </a>
    </div>
    <div id="map">
      <a href="/likes"> 
        <img src={likes} alt="Likes" height="60" width="60"/>
      </a>
    </div>
    <div class="active" id="order">
      <a href="/messages"> 
        <img src={message} alt="Messages" height="60" width="60"/>
      </a>
    </div>
    <div id="rewards">
      <a href="/profile"> 
        <img src={profile} alt="Profile" height="60" width="60"/>
      </a>
    </div>
  </menu>
 
  <style>
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      border-bottom: 1px solid #eee;
    }
    
    .content {
      margin-bottom: 70px; /* Make room for the menu */
      padding: 10px;
    }
    
    .main_home_title {
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 15px;
    }
    
    .home_list {
      margin-bottom: 10px;
    }
    
    .home_title {
      font-weight: bold;
      margin-bottom: 5px;
    }
    
    .home_list_con {
      display: flex;
      align-items: center;
    }
    
    .profile-image {
      margin-right: 10px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
    }
    
    .profile-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .home_list_con p {
      margin: 0;
    }
    

    menu {
      background-image: linear-gradient(rgb(255, 255, 255), #D3B9FF);
      display: flex;
      justify-content: space-around;
      align-items: center;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      margin: 0;
      padding: 5px 0;
      border-top: 1px solid #eee;
    }
    
    .active {
      /* Style for active nav item */
      border-top: 3px solid #007bff;
    }
    
    hr {
      margin: 10px 0;
      border: 0;
      border-top: 1px solid #eee;
    }
  </style> -->

  <script>
    import { onMount } from "svelte";
    // Import navigation icons - using the original imports
    import setting from '$lib/image/settings_icon.png';
    import home from '$lib/image/home_nav.png';
    import likes from '$lib/image/likes_nav.png';
    import message from '$lib/image/message_nav.png';
    import profile from '$lib/image/profile_nav.png';
    
    // Import user profile images
    import David from '$lib/image/Msgs_David.png';
    import Josh from '$lib/image/Msgs_Josh.png';
    import Miles from '$lib/image/Msgs_Miles.png';
    
    // Define message data
    const messagesData = {
      myMessages: [
        { 
          id: 2, 
          name: "Miles", 
          image: Miles, 
          text: "Hey Elizabeth, How are you...", 
          status: "accepted",
          icon: "✓"
        },
        { 
          id: 3, 
          name: "David", 
          image: David, 
          text: "Hey David, How are you...", 
          status: "expiring soon",
          icon: "⏱️"
        }
      ],
      requests: [
        { 
          id: 1, 
          name: "Josh", 
          image: Josh, 
          text: "Hey Josh! I saw your profile and I think we have a lot of...", 
          status: "pending",
          icon: "⏱️"
        }
      ]
    };
    
    let activeTab = "myMessages";
    
    function toggleTab(tab) {
      activeTab = tab;
    }
  </script>
  
  <header>
    <div class="back-button">‹</div>
    <div class="page-title">Messages</div>
  </header>
  
  <div class="toggle-container">
    <div class="toggle-slider {activeTab === 'myMessages' ? 'left' : 'right'}"></div>
    <div 
      class="toggle-option {activeTab === 'myMessages' ? 'active' : ''}" 
      on:click={() => toggleTab('myMessages')}
    >
      My Messages
    </div>
    <div 
      class="toggle-option {activeTab === 'requests' ? 'active' : ''}"
      on:click={() => toggleTab('requests')}
    >
      Message Requests <span class="message-requests-badge">3</span>
    </div>
  </div>
  
  <div class="content">
    {#if activeTab === 'myMessages'}
      {#each messagesData.myMessages as msg}
        <div class="message-card {msg.status === 'pending' ? 'pending' : msg.status === 'accepted' ? 'accepted' : 'expiring'}">
          <div class="profile-image">
            <img src={msg.image} alt="{msg.name}'s profile"/>
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
    {:else}
      {#each messagesData.requests as msg}
        <div class="message-card {msg.status === 'pending' ? 'pending' : msg.status === 'accepted' ? 'accepted' : 'expiring'}">
          <div class="profile-image">
            <img src={msg.image} alt="{msg.name}'s profile"/>
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
  
  <!-- Using the original menu structure to maintain responsiveness -->
  <menu>
    <div id="home">
      <a href="/"> 
        <img src={home} alt="Home" height="60" width="60"/>
      </a>
    </div>
    <div id="map">
      <a href="/likes"> 
        <img src={likes} alt="Likes" height="60" width="60"/>
      </a>
    </div>
    <div class="active" id="order">
      <a href="/messages"> 
        <img src={message} alt="Messages" height="60" width="60"/>
      </a>
    </div>
    <div id="rewards">
      <a href="/profile"> 
        <img src={profile} alt="Profile" height="60" width="60"/>
      </a>
    </div>
  </menu>


<style>
 /* Overall app styling */
:global(body) {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background-color: #f8f8fd;
}

header {
  padding: 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  background-color: white;
}

header .back-button {
  margin-right: 15px;
  font-size: 24px;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
}

/* Toggle bar styling */
.toggle-container {
  display: flex;
  padding: 5px;
  background-color: #e0e0e0;
  margin: 15px;
  border-radius: 30px;
  position: relative;
}

.toggle-option {
  flex: 1;
  text-align: center;
  padding: 10px 0;
  z-index: 1;
  transition: color 0.3s;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

.toggle-option.active {
  color: white;
}

.toggle-slider {
  position: absolute;
  width: 50%;
  height: 80%;
  background-color: #7848FB;
  border-radius: 25px;
  top: 10%;
  transition: left 0.3s ease;
}

.toggle-slider.left {
  left: 2%;
}

.toggle-slider.right {
  left: 48%;
}

.message-requests-badge {
  background-color: #f44336;
  color: white;
  border-radius: 50%;
  padding: 0 6px;
  font-size: 12px;
  margin-left: 5px;
  display: inline-block;
}

/* Message list styling */
.content {
  padding: 0;
  margin-bottom: 70px; /* Make room for the fixed menu */
}

.message-card {
  display: flex;
  padding: 15px;
  border-radius: 15px;
  margin: 10px;
  position: relative;
}

.pending {
  background-color: #e3f2fd;
}

.accepted {
  background-color: #e8f5e9;
}

.expiring {
  background-color: #fff8e1;
}

.profile-image {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 15px;
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
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 5px;
}

.message-preview {
  color: #666;
  font-size: 14px;
}

.message-status {
  position: absolute;
  right: 15px;
  top: 15px;
  font-size: 12px;
  display: flex;
  align-items: center;
}

.status-icon {
  margin-left: 5px;
}

/* Bottom navigation menu - Responsive */
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
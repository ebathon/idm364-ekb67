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


  <script>
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
  </style>
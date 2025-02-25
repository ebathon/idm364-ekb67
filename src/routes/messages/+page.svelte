<script>
    // You might want to define these as props or fetch from an API
    const messages = [
      { name: "Adam", text: "Hey! How are you doing?" },
      { name: "John", text: "I noticed you and I both liked the latte art class!" },
      { name: "Ian", text: "Are you still interested in going to this event?" },
      { name: "Chris", text: "It seems like you and I have a lot of interests in common." },
      { name: "Matt", text: "lorem ipsum delor sit amet lorem ipsum delor sit amet lorem ipsum delor sit amet lorem ipsum delor sit amet lorem ipsum delor sit amet lorem ipsum delor sit amet lorem ipsum delor sit amet lorem ipsum delor sit amet" },
      { name: "Gary", text: "So you're interested in goat yoga too??" }
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
            <img src="image/" alt="Profile image"/>
          </div>
          <p id="liked">{message.text}</p>
        </div>
      </div>
    {/each}
  </div>
  
  <menu>
    <div id="home">
      <a href="home.html"> 
        <img src="image/home_nav.png" alt="Home" height="60" width="60"/>
      </a>
    </div>
    <div id="map">
      <a href="likes.html"> 
        <img src="image/likes_nav.png" alt="Likes" height="60" width="60"/>
      </a>
    </div>
    <div class="active" id="order">
      <a href="messages.html"> 
        <img src="image/message_nav.png" alt="Messages" height="60" width="60"/>
      </a>
    </div>
    <div id="rewards">
      <a href="signin.html"> 
        <img src="image/profile_nav.png" alt="Profile" height="60" width="60"/>
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
  </style>
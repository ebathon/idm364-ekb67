<script>
    // Component props and state can be defined here
    export let isLoggedIn = false;
    
    // You can add your component logic here
    let activeSection = 'home';
    
    function setActive(section) {
      activeSection = section;
    }
    
    function handleNext() {
      // Logic for handling "Next" button click
      // For example, you might want to navigate to profile2
      // Using Svelte's router (e.g., svelte-navigator or svelte-routing)
      // window.location.href = '/profile2';
    }
  </script>
  
  <svelte:head>
    <title>Sign In</title>
    <link rel="icon" type="image/x-icon" href="image/favicon.png">
  </svelte:head>
  
  <header>
    <div>Happen</div>
    <div class="setting"><img src="image/settings_icon.png" height="28" width="28" alt="Settings" /></div>
  </header>
  
  <div class="content">
    <div class="register_content">
      <!-- We would handle error display with Svelte's reactivity -->
      {#if loginError}
        <p class="error">{loginError}</p>
      {/if}
      
      <form on:submit|preventDefault={handleNext}>
        <div class="form-group">
          <label for="email">Phone Number:</label>
          <input type="email" id="email" name="email" required>
        </div>
      </form>
      
      <a href="/profile2">
        <button class="signin" type="submit" on:click={handleNext}>Next</button>
      </a>
    </div>
  </div>
  
  <style>
   @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Permanent+Marker&family=Piazzolla:ital,opsz,wght@0,8..30,100..900;1,8..30,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
   * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
  
    header {
      background-image: linear-gradient(#D3B9FF, rgb(255, 255, 255));
      display: flex;
      justify-content: space-between;
      font-family: 'Roboto', sans-serif;
      color: #000000;
      padding: 28px;
      font-size: 28px;
    }
  
    .content {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      background: #ffffff;
      margin: 0;
      padding: 1rem;
    }
  
    h3 {
      padding-bottom: 16px;
    }
  
    .register_content {
      display: flex;
      justify-content: center;
      flex-direction: column;
      padding: 2rem 3rem;
      border-radius: 20px;
      max-width: 100%;
    }
  
    #edu {
      padding-top: 10px;
      padding-bottom: 10px;
      margin-top: 10px;
      margin-bottom: 40px;
    }
  
    .register_content form {
      width: 400px;
    }
  
    .register_content label {
      font-family: 'Nunito', sans-serif;
      font-size: 1rem;
    }
  
    .register_content input {
      font-family: 'Mobile-Standard', sans-serif;
      font-size: 1rem;
    }
  
    .register_content input[type="submit"] {
      font-family: 'Button-Text', sans-serif;
      font-size: 1rem;
    }
  
    p.error {
      color: red;
    }
  
    h2 {
      font-family: 'Fredoka', sans-serif;
      font-size: 1.75rem;
      margin-top: 20px;
      margin-bottom: 20px;
    }
  
    form, p {
      font-family: 'Mobile-Standard', sans-serif;
      font-size: 1rem;
    }
  
    label {
      font-family: 'poppins', sans-serif;
      font-size: 18px;
      margin-top: 10px;
      margin-bottom: 10px;
      text-align: left;
    }
  
    .register_content label {
      justify-content: left;
    }
  
    input, button {
      font-family: 'Mobile-Standard', sans-serif;
      margin-top: 10px;
      padding: 10px 115px 10px 30px;
      border: 1px solid black;
      border-radius: 10px;
      background-color: #794AFC;
      justify-content: flex-start;
      align-items: center;
    }
  
    button#signin {
      background-color: white;
    }
  
    input {
      justify-content: center;
      align-items: center;
      margin-bottom: 20px;
    }
  
    input.register_btn {
      background-color: #ffffff;
      color: black;
      padding: 10px 40px;
      margin-bottom: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      justify-items: center;
      align-self: center;
    }
  
    .signin_btn {
      background-color: #5B965E;
      color: #794AFC;
      padding: 10px 10px;
      font-family: 'Button-Text', sans-serif;
      font-size: 1rem;
    }
  
    button.pill {
      padding: 5px;
    }
  
    div.button-group {
      margin-bottom: 5px;
    }
  
    button {
      font-family: 'Nunito', sans-serif;
      margin-top: 10px;
      padding: 5px 115px 5px 30px;
      border: 1px solid black;
      border-radius: 20px;
      background-color: #c3c3c3;
      justify-content: flex-start;
      align-items: center;
    }
  
    form {
      display: flex;
      flex-direction: column;
    }
  
    button.signin {
      text-align: center;
      justify-content: center;
      display: flex;
      padding-left: 0;
      padding-right: 0;
      border-radius: 30px;
      margin-top: 20px;
      color: white;
      width: 300px;
      background-color: #794AFC;
    }
  
    a.hobby {
      margin-top: -88px;
    }
  
    .pill:hover {
      background-color: #5f5f5f;
      color: white;
    }
  
    .signin_btn a {
      color: white;
    }
  
    input#password {
      margin-bottom: 10px;
    }
  
    input:focus {
      outline: none;
      border-color: rgba(254, 221, 103, 1);
      box-shadow: 0 0 5px rgba(252, 179, 179, 0.5);
    }
  
    .form-group {
      display: flex;
      flex-direction: column;
    }
  
    a {
      text-decoration: none;
    }
  
    div.content a {
      width: 300px;
    }
  
    @media screen and (max-width: 960px) {
      header {
        padding: 30px;
        font-size: 26px;
      }
  
      .content {
        height: auto;
        padding: 15px;
      }
    }
  
    @media screen and (max-width: 659px) {
      input, button {
        padding: 10px 40px;
      }
  
      div.register_content form {
        width: 300px;
      }
  
      .signin_btn {
        padding: 10px 40px;
        font-size: 14px;
      }
  
      label {
        font-size: 14px;
      }
  
      input.register_btn {
        font-size: 14px;
      }
    }
  
    @media screen and (max-width: 1000px) {
      input {
        width: auto;
      }
  
      .register_content form {
        width: 100%;
      }
  
      input, button {
        padding: 10px 10px;
      }
  
      .signin_btn {
        padding: 10px 40px;
        font-size: 12px;
      }
  
      label {
        font-size: 12px;
      }
  
      input.register_btn {
        font-size: 12px;
      }
  
      .register_content input {
        width: 100%;
        box-sizing: border-box;
      }
    }
  </style>
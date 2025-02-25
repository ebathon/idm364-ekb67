<script>
    let religiousBelief = "";
    const options = [
      "Christian", 
      "Jewish", 
      "Muslim", 
      "Agnostic", 
      "Atheist", 
      "Hindu", 
      "Buddhist"
    ];
  </script>
  
  <header>
    <div>Happen</div>
    <div class="setting">
      <img src="/image/settings_icon.png" height="28" width="28" />
    </div>
  </header>
  
  <div class="content">
    <div class="register_content">
      <form action="signin.php" method="post">
        <div class="form-group">
          <label for="religious-beliefs">Religious Beliefs:</label>
          <select id="religious-beliefs" name="religiousBelief" bind:value={religiousBelief} required>
            <option value="" disabled selected>Select an option</option>
            {#each options as option}
              <option value={option}>{option}</option>
            {/each}
          </select>
        </div>
      </form>
      <a href="profile8.html">
        <button class="signin" type="submit" name="login">Next</button>
      </a>
    </div>
  </div>
  
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
  
    @font-face {
      src: url("/font/PermanentMarker-Regular.ttf");
      font-family: "PermanentMarker-Regular";
    }
    @font-face {
      src: url("/font/Piazzolla_24pt-Bold.ttf");
      font-family: "Piazzolla_24pt-Bold";
    }
    @font-face {
      src: url("/font/Fredoka-VariableFont_wdth,wght.ttf");
      font-family: "Fredoka";
    }
    @font-face {
      src: url("/font/Poppins-Regular.ttf");
      font-family: "Mobile-Standard";
    }
    @font-face {
      src: url("/font/Roboto-VariableFont_wdth,wght.ttf");
      font-family: "Roboto";
    }
    @font-face {
      src: url("/font/Nunito-VariableFont_wght.ttf");
      font-family: "Nunito";
    }
  
    header {
      background-image: linear-gradient(#d3b9ff, rgb(255, 255, 255));
      display: flex;
      justify-content: space-between;
      font-family: "Roboto";
      color: #000;
      padding: 28px;
      font-size: 28px;
    }
  
    .content {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      background: #fff;
      padding: 1rem;
    }
  
    .register_content {
      display: flex;
      justify-content: center;
      flex-direction: column;
      padding: 2rem 3rem;
      border-radius: 20px;
      max-width: 100%;
    }
  
    .register_content label {
      font-family: "Nunito";
      font-size: 1rem;
    }
  
    .register_content select {
      font-family: "Mobile-Standard";
      font-size: 1rem;
      margin-bottom: 20px;
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      background: white;
      cursor: pointer;
    }
  
    button.signin {
      text-align: center;
      justify-content: center;
      display: flex;
      padding: 10px 115px;
      border-radius: 30px;
      margin-top: 300px;
      color: white;
      width: 300px;
      background-color: #794afc;
    }
  
    @media screen and (max-width: 659px) {
      select,
      button {
        padding: 10px 40px;
      }
      .register_content form {
        width: 300px;
      }
    }
  </style>
  
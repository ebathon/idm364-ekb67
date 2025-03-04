<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
  
    let messages = writable([
      { type: 'received', text: 'Hey Elizabeth, How are you doing?' }
    ]);
    
    let currentText = "";
  
    function sendMessage() {
      if (currentText.trim() !== "") {
        messages.update(msgs => [...msgs, { type: 'sent', text: currentText }]);
        currentText = "";
      }
    }
  
    function addThumb() {
      messages.update(msgs => [...msgs, { type: 'sent', thumb: true }]);
    }
  </script>
  
  <style>
    .screen {
      background-color: #fff;
      height: 400px;
      width: 300px;
      margin: 0 auto;
      box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
      display: flex;
      flex-direction: column;
    }
    .conversation {
      flex: 1;
      overflow-y: auto;
      padding: 20px;
    }
    .messages {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
    .message {
      padding: 7px 13px;
      border-radius: 15px;
      max-width: 70%;
    }
    .received { background-color: #ddd; align-self: flex-start; }
    .sent { background-color: #1998e6; color: #fff; align-self: flex-end; }
    .text-bar {
      display: flex;
      border-top: 1px solid #ccc;
      padding: 10px;
    }
    input {
      flex: 1;
      padding: 10px;
      border: none;
    }
    button {
      width: 40px;
      height: 40px;
      background: url('data:image/png;base64,iVBORw0KGgo...') no-repeat center;
      background-size: contain;
      border: none;
      cursor: pointer;
    }
    button:focus {
      outline: 2px solid blue;
    }
    .thumb.animating {
      animation: wiggle 0.2s ease infinite;
    }
    @keyframes wiggle {
      0% { transform: rotateZ(5deg); }
      50% { transform: rotateZ(-5deg); }
      100% { transform: rotateZ(5deg); }
    }
  </style>
  
  <div class="screen">
    <div class="conversation">
      {#each $messages as message}
        <div class="messages">
          {#if message.thumb}
            <div class="message sent thumb animating"></div>
          {:else}
            <div class="message {message.type}">{message.text}</div>
          {/if}
        </div>
      {/each}
    </div>
    <div class="text-bar">
      <input type="text" bind:value={currentText} placeholder="Type or thumb up ;)" on:keydown={(e) => e.key === 'Enter' && sendMessage()} />
      <button on:click={addThumb} on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && addThumb()} aria-label="Send thumb up"></button>
    </div>
  </div>
  
import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Preprocess your Svelte components
  preprocess: vitePreprocess(),
  
  kit: {
    // Adapter for Netlify
    adapter: adapter({
      // If your routes are nested, edge functions can help
      edge: false,
      
      // Split your app into smaller chunks
      split: false
    }),
    
    // You can add aliases, paths, etc. here
  }
};

export default config;
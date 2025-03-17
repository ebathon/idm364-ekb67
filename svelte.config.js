import adapter from '@sveltejs/adapter-netlify';
// Fix the import - use the correct location based on your SvelteKit version
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
// OR if using an older version, you might not need vitePreprocess at all

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Preprocess your Svelte components
  preprocess: vitePreprocess(), // Remove this line if import isn't available
  
  kit: {
    // Adapter for Netlify
    adapter: adapter()
  }
};

export default config;
import adapter from '@sveltejs/adapter-netlify';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    // Specify the adapter with explicit configuration
    adapter: adapter({
      // Edge should be false unless you're specifically using Netlify Edge Functions
      edge: false,
      
      // This helps ensure proper static file generation
      split: false
    })
  }
};

export default config;
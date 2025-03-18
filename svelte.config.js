import adapter from "@sveltejs/adapter-vercel";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      // Vercel Edge Functions configuration (if needed)
      edge: false,
    }),
    // Explicitly specify the static files directory
    files: {
      assets: 'static'
    }
  }
};

export default config;
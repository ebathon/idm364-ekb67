import adapter from '@sveltejs/adapter-netlify';

export default {
  kit: {
    adapter: adapter(),
    alias: {
      $lib: './src/lib'
    }
  }
};

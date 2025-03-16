import adapter from '@sveltejs/adapter-netlify';
import preprocess from 'svelte-preprocess';


export default {
  kit: {
    adapter: adapter(),
    alias: {
      $lib: './src/lib'
    }
  },
  preprocess: preprocess()
};

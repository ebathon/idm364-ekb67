import adapter from '@sveltejs/adapter-netlify';
import preprocess from 'svelte-preprocess';


export default {
  kit: {
    adapter: adapter(),
    paths: {
      base: process.env.NODE_ENV === 'production' ? '' : ''
    }
  },
  preprocess: preprocess()
};

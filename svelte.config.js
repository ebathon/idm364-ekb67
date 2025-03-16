import adapter from '@sveltejs/adapter-netlify';
import preprocess from 'svelte-preprocess';


export default {
  kit: {
    adapter: adapter(),
<<<<<<< HEAD
=======
    alias: {
      $lib: './src/lib'
    }
>>>>>>> 2cd0e63aeecf5af7f0476ad752ee5f0e7bace0ac
  },
  preprocess: preprocess()
};

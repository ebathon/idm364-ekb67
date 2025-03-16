import adapter from '@sveltejs/adapter-netlify';
import { sveltePreprocess }  from 'svelte-preprocess';


export default {
	kit: {
		adapter: adapter()
	  },
	  preprocess: { sveltePreprocess }
		};
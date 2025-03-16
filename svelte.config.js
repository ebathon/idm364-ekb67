import adapter from '@sveltejs/adapter-netlify';

export default {
  kit: {
    adapter: adapter(),
    paths: {
      base: process.env.NODE_ENV === 'production' ? '' : ''
    }
  }
};

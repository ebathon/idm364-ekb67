import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-auto";
import dotenv from "dotenv";

dotenv.config();

export default {
  preprocess: preprocess(),
  kit: {
    adapter: adapter(),
    env: {
      dir: process.cwd(),
    },
  },
};
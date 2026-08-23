import { defineConfig } from 'vite';

// Web build: code-split, data.json fetched as a separate asset, images hashed.
// - `src/main.ts` is the entry (loaded as a module from index.html)
export default defineConfig({
  base: './',
  define: {
    __SINGLEFILE__: 'false',
  },
  build: {
    outDir: 'dist',
  },
});

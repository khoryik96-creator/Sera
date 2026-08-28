import { defineConfig } from 'vite';

// Web build: core lore loads up front; season payloads remain independent chunks.
export default defineConfig({
  base: './',
  define: {
    __SINGLEFILE__: 'false',
  },
  build: {
    outDir: 'dist',
  },
});

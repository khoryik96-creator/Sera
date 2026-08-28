import { defineConfig } from 'vite';

// Web build: React is the production shell. The pre-cutover reader remains as legacy.html for rollback.
export default defineConfig({
  base: './',
  define: {
    __SINGLEFILE__: 'false',
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
        legacy: 'legacy.html',
        reactPreview: 'react-preview.html',
      },
    },
  },
});

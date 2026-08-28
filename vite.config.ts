import { defineConfig } from 'vite';

// React owns the production root. legacy.html is the tested pre-React rollback;
// react-preview.html is only a tiny migration-era redirect kept for old links.
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
        migrationRedirect: 'react-preview.html',
      },
    },
  },
});

import { defineConfig } from 'vite';

// React owns the production root. legacy.html is the tested pre-React rollback;
// react-preview.html remains a tested compatibility alias for historical links.
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
        compatibilityAlias: 'react-preview.html',
      },
    },
  },
});

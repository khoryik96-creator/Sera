import { defineConfig } from 'vite';

// React owns the production root.
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
        compatibilityAlias: 'react-preview.html',
      },
    },
  },
});

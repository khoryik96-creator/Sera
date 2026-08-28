import { defineConfig } from 'vite';

// Web build: core lore loads up front; season payloads remain independent chunks.
// The React reader is built as a parallel preview page until feature parity is complete.
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
        reactPreview: 'react-preview.html',
      },
    },
  },
});

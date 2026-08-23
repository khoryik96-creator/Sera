import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

// Single-file build: inline the JS, CSS, images, and lore data into one
// self-contained index.html that opens by double-clicking (no server).
export default defineConfig({
  base: './',
  define: {
    __SINGLEFILE__: 'true',
  },
  plugins: [viteSingleFile()],
  build: {
    outDir: 'dist-single',
    cssCodeSplit: false,
    // Inline every asset (images + data) as a data URI rather than emitting files.
    assetsInlineLimit: Number.MAX_SAFE_INTEGER,
    chunkSizeWarningLimit: Number.MAX_SAFE_INTEGER,
  },
});

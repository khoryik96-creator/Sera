import { defineConfig } from 'vite';

// Static single-page lore repository.
// - `src/main.ts` is the entry (loaded as a module from index.html)
// - `public/assets/*` are served at /assets/* and copied verbatim into dist/
export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    // The main character portrait is a large inline-free JPEG; keep assets as files.
    assetsInlineLimit: 0,
  },
});

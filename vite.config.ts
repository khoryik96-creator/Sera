import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite';

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8')) as { version: string };
const buildSha = (process.env.GITHUB_SHA || 'dev').slice(0, 7);

// Web build: core lore loads up front; season payloads remain independent chunks.
export default defineConfig({
  base: './',
  define: {
    __SINGLEFILE__: 'false',
    __APP_VERSION__: JSON.stringify(pkg.version),
    __BUILD_SHA__: JSON.stringify(buildSha),
  },
  build: {
    outDir: 'dist',
  },
});

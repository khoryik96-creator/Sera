import { defineConfig } from 'vitest/config';

export default defineConfig({
  define: {
    __SINGLEFILE__: 'false',
  },
  test: {
    environment: 'node',
    include: ['test/**/*.test.ts'],
  },
});

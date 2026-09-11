import { defineConfig } from 'vitest/config';

// Unit tests cover pure TypeScript logic (date math, content loading, stores).
// Date logic is timezone-sensitive, so pin the process timezone to the app's
// fixed timezone rather than inheriting the machine's.
process.env.TZ = 'Asia/Seoul';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts', 'lib/**/*.test.ts'],
    globals: false,
  },
  resolve: {
    alias: {
      '@': __dirname,
    },
  },
});

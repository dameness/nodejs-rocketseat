import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
export default defineConfig({
  test: {
    globals: true,
    reporters: 'verbose',

    // This fix the conflict between tests switches and the single database
    pool: 'forks',
    poolOptions: {
      forks: {
        singleFork: true,
      },
    },
    environmentMatchGlobs: [['src/http/controllers/**', 'prisma']],
    dir: 'src',
  },
  plugins: [tsconfigPaths()],
});

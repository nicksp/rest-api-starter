import path from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    setupFiles: ['./.vitest.config/setup-tests.ts'],
    env: {
      NODE_ENV: 'test',
    },
    coverage: {
      provider: 'v8',
      reportsDirectory: './coverage/raw/default',
      reporter: ['json', 'text', 'html'],
      exclude: [
        // types are compile-time only, so their coverage cannot be measured
        'src/**/types.ts',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
},
)

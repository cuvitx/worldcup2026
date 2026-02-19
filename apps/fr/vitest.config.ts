import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
  },
  resolve: {
    alias: {
      '@repo/data': path.resolve(__dirname, '../../packages/data/src'),
      '@repo/ui': path.resolve(__dirname, '../../packages/ui/src'),
    },
  },
})

import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  'apps/fr/vitest.config.ts',
  'packages/ui/vitest.config.ts',
  'packages/data/vitest.config.ts',
])

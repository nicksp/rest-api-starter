import { defineConfig } from 'drizzle-kit'

import env from '@/env.js'

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schema',
  out: './src/db/migrations',
  casing: 'snake_case',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  strict: true,
})

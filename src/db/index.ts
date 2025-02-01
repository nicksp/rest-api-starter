import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import env from '@/env.js'

import { schema } from './schema/index.js'

export const migrationClient = postgres(env.DATABASE_URL, { max: 1 })
export const queryClient = postgres(env.DATABASE_URL)

export const db = drizzle({
  client: queryClient,
  casing: 'snake_case',
  schema,
})

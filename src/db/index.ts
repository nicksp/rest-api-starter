import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import { schema } from '@/db/schema/index.js'
import env from '@/env.js'

export const migrationClient = postgres(env.DATABASE_URL, { max: 1 })

export const queryClient = postgres(env.DATABASE_URL)

export const db = drizzle({
  client: queryClient,
  casing: 'snake_case',
  schema,
})

export { sql } from 'drizzle-orm'

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import type { Environment } from '@/env.js'

import { schema } from '@/db/schema/index.js'

export function createDb(env: Environment) {
  const migrationClient = postgres(env.DATABASE_URL, { max: 1 })

  const queryClient = postgres(env.DATABASE_URL)

  const db = drizzle({
    client: queryClient,
    casing: 'snake_case',
    schema,
  })

  return { migrationClient, queryClient, db }
}

export { sql } from 'drizzle-orm'

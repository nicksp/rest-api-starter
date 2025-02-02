import { execSync } from 'node:child_process'
import { afterAll, beforeAll } from 'vitest'

import { db, sql } from '../src/db'

beforeAll(async () => {
  execSync('pnpm db:push --force')
  // To ensure the db connection is established before running tests
  await db.execute(sql`SELECT 1`)
})

afterAll(async () => {
  await db.execute(sql`TRUNCATE TABLE tasks CASCADE`)
  await db.$client.end()
})

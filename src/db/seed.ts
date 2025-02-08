import { reset, seed } from 'drizzle-seed'

import { schema } from '@/db/schema/index.js'
import env from '@/env-runtime.js'

import { createDb } from './index.js'

async function main() {
  const { db } = createDb(env)
  await reset(db, schema)
  await seed(db, schema, { count: 100 })
  await db.$client.end()
}

main()

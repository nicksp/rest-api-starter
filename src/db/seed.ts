import { reset, seed } from 'drizzle-seed'

import { schema } from '@/db/schema/index.js'

import { db } from './index.js'

async function main() {
  await reset(db, schema)
  await seed(db, schema, { count: 100 })
  await db.$client.end()
}

main()

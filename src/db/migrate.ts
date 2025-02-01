import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'

import dbConfig from '@/../drizzle.config.js'

import { migrationClient } from './index.js'

async function run() {
  await migrate(drizzle({
    client: migrationClient,
    casing: 'snake_case',
  }), {
    migrationsFolder: dbConfig.out!,
  })

  // Don't forget to close the connection, otherwise the script will hang
  await migrationClient.end()
}

run()

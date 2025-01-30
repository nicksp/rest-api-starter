import { boolean, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

export const tasks = pgTable('tasks', {
  id: uuid('id')
    .primaryKey()
    .defaultRandom(),
  done: boolean('done')
    .default(false)
    .notNull(),
  name: varchar('name', { length: 255 })
    .notNull(),
  createdAt: timestamp('created_at', { mode: 'date' })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
})

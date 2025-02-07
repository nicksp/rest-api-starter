import { boolean, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod'

export const tasks = pgTable('tasks', {
  id: uuid()
    .primaryKey()
    .defaultRandom(),
  done: boolean()
    .default(false)
    .notNull(),
  name: varchar({ length: 255 })
    .notNull(),
  createdAt: timestamp({ mode: 'date' })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp({ mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
})

export const tasksSelectSchema = createSelectSchema(tasks)

export const taskInsertSchema = createInsertSchema(
  tasks,
  {
    name: schema => schema.min(1).max(255).describe('The name of the task.'),
    done: schema => schema.describe('Whether the task is completed.').default(false),
  },
).required({
  done: true,
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export const taskPatchSchema = createUpdateSchema(
  tasks,
  {
    name: schema => schema.min(1).max(255).describe('The name of the task.'),
    done: schema => schema.describe('Whether the task is completed.'),
  },
).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

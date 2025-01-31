import { boolean, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

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

export const taskSelectSchema = createSelectSchema(tasks)
export const taskInsertSchema = createInsertSchema(
  tasks,
  {
    name: schema => schema.min(1).max(255),
  },
).required({
  done: true,
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export const IdParamsSchema = z.object({
  id: z.string().uuid().openapi({
    param: {
      name: 'id',
      in: 'path',
      required: true,
      description: 'The unique identifier of the task to retrieve.',
    },
    examples: [
      'b577253d-5438-49dd-993e-105b38bc9a8c',
      '550e8400-e29b-41d4-a716-446655440000',
      'non-valid-uuid',
    ],
  }),
})

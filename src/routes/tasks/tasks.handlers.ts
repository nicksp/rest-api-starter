import type { AppRouteHandler } from '@/lib/types.js'

import { db } from '@/db/index.js'
import { tasks } from '@/db/schema/tasks.js'

import type { CreateRoute, ListRoute } from './tasks.routes.js'

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const tasks = await db.query.tasks.findMany()
  return c.json(tasks)
}

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const taskPayload = c.req.valid('json')
  const [insertedTask] = await db.insert(tasks).values(taskPayload).returning()
  return c.json(insertedTask, 200)
}

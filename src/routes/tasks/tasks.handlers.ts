import { eq } from 'drizzle-orm'
import { STATUS_CODES } from 'node:http'

import type { AppRouteHandler } from '@/lib/types.js'

import { db } from '@/db/index.js'
import { tasks } from '@/db/schema/tasks.js'

import type { CreateRoute, GetOneRoute, ListRoute, PatchRoute } from './tasks.routes.js'

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const tasks = await db.query.tasks.findMany()
  return c.json(tasks)
}

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const taskPayload = c.req.valid('json')
  const [insertedTask] = await db.insert(tasks).values(taskPayload).returning()
  return c.json(insertedTask, 200)
}

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
  const { id } = c.req.valid('param')

  const task = await db.query.tasks.findFirst({
    where(fields, operators) {
      return operators.eq(fields.id, id)
    },
  })

  if (!task) {
    const statusCode = 404
    return c.json({ message: STATUS_CODES[statusCode]! }, statusCode)
  }

  return c.json(task, 200)
}

export const patch: AppRouteHandler<PatchRoute> = async (c) => {
  const { id } = c.req.valid('param')
  const updates = c.req.valid('json')

  const [task] = await db.update(tasks)
    .set(updates)
    .where(eq(tasks.id, id))
    .returning()

  if (!task) {
    const statusCode = 404
    return c.json({ message: STATUS_CODES[statusCode]! }, statusCode)
  }

  return c.json(task, 200)
}

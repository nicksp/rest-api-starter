import { eq } from 'drizzle-orm'
import { STATUS_CODES } from 'node:http'

import type { AppRouteHandler } from '@/lib/types.js'

import { createDb } from '@/db/index.js'
import { tasks } from '@/db/schema/tasks.js'
import { ZOD_ERROR_CODES, ZOD_ERROR_MESSAGES } from '@/lib/constants.js'

import type { CreateRoute, GetOneRoute, ListRoute, PatchRoute, RemoveRoute } from './tasks.routes.js'

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const { db } = createDb(c.env)
  const tasks = await db.query.tasks.findMany()
  return c.json(tasks)
}

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const { db } = createDb(c.env)
  const taskPayload = c.req.valid('json')
  const [insertedTask] = await db.insert(tasks).values(taskPayload).returning()
  return c.json(insertedTask, 200)
}

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
  const { db } = createDb(c.env)
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
  const { db } = createDb(c.env)
  const { id } = c.req.valid('param')
  const updates = c.req.valid('json')

  if (Object.keys(updates).length === 0) {
    return c.json(
      {
        success: false,
        error: {
          issues: [
            {
              code: ZOD_ERROR_CODES.INVALID_UPDATE,
              path: [],
              message: ZOD_ERROR_MESSAGES.NO_UPDATE,
            },
          ],
          name: 'ZodError',
        },
      },
      422,
    )
  }

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

export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
  const { db } = createDb(c.env)
  const { id } = c.req.valid('param')

  const deletedResult = await db.delete(tasks)
    .where(eq(tasks.id, id))
    .returning()

  if (deletedResult.length === 0) {
    const statusCode = 404
    return c.json({ message: STATUS_CODES[statusCode]! }, statusCode)
  }

  return c.body(null, 204)
}

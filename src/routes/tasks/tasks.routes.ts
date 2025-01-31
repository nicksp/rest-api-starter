import { createRoute, z } from '@hono/zod-openapi'

import { IdParamsSchema, taskInsertSchema, taskSelectSchema } from '@/db/schema/tasks.js'
import { notFoundSchema } from '@/lib/constants.js'
import createErrorSchema from '@/utils/openapi/create-error-schema.js'
import jsonContentRequired from '@/utils/openapi/json-content-required.js'
import jsonContent from '@/utils/openapi/json-content.js'

const tags = ['Tasks']

export const list = createRoute({
  path: '/tasks',
  method: 'get',
  tags,
  responses: {
    200: jsonContent(
      z.array(taskSelectSchema),
      'The list of tasks',
    ),
  },
})

export const create = createRoute({
  path: '/tasks',
  method: 'post',
  request: {
    body: jsonContentRequired(
      taskInsertSchema,
      'Payload to create a new task',
    ),
  },
  tags,
  responses: {
    200: jsonContent(
      taskSelectSchema,
      'The created task',
    ),
    422: jsonContent(
      createErrorSchema(taskInsertSchema),
      'The validation error(s)',
    ),
  },
})

export const getOne = createRoute({
  path: '/tasks/{id}',
  method: 'get',
  summary: 'Get a task by ID',
  description: 'Retrieves a single task record by its unique identifier.',
  request: {
    params: IdParamsSchema,
  },
  tags,
  responses: {
    200: jsonContent(
      taskSelectSchema,
      'Task retrieved successfully',
    ),
    422: jsonContent(
      createErrorSchema(IdParamsSchema),
      'Invalid ID error',
    ),
    404: jsonContent(
      notFoundSchema,
      'Task not found',
    ),
  },
})

export type ListRoute = typeof list
export type CreateRoute = typeof create
export type GetOneRoute = typeof getOne

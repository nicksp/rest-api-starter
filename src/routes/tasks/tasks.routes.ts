import { createRoute, z } from '@hono/zod-openapi'

import { taskInsertSchema, taskPatchSchema, taskSelectSchema } from '@/db/schema/tasks.js'
import createErrorSchema from '@/utils/openapi/create-error-schema.js'
import createIdUUIDParamsSchema from '@/utils/openapi/create-id-uuid-params-schema.js'
import jsonContentOneOf from '@/utils/openapi/json-content-one-of.js'
import jsonContentRequired from '@/utils/openapi/json-content-required.js'
import jsonContent from '@/utils/openapi/json-content.js'
import notFoundSchema from '@/utils/openapi/not-found-schema.js'

const tags = ['Tasks']

export const list = createRoute({
  path: '/tasks',
  method: 'get',
  tags,
  summary: 'Fetch a list of tasks',
  description: 'Retrieves available user tasks.',
  responses: {
    200: jsonContent(
      z.array(taskSelectSchema),
      'A list of all tasks successfully retrieved',
    ),
  },
})

export const create = createRoute({
  path: '/tasks',
  method: 'post',
  tags,
  summary: 'Create a new task',
  description: 'Creates a new task with the provided details.',
  request: {
    body: jsonContentRequired(
      taskInsertSchema,
      'Task',
    ),
  },
  responses: {
    200: jsonContent(
      taskSelectSchema,
      'Task created successfully',
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
  tags,
  summary: 'Get a task by ID',
  description: 'Retrieves a single task record by its unique identifier.',
  request: {
    params: createIdUUIDParamsSchema('The unique identifier of the task to retrieve.'),
  },
  responses: {
    200: jsonContent(
      taskSelectSchema,
      'Task retrieved successfully',
    ),
    404: jsonContent(
      notFoundSchema,
      'Task not found',
    ),
    422: jsonContent(
      createErrorSchema(createIdUUIDParamsSchema('The unique identifier of the task to retrieve.')),
      'Invalid ID error',
    ),
  },
})

export const patch = createRoute({
  path: '/tasks/{id}',
  method: 'patch',
  tags,
  summary: 'Update task details',
  description: 'Updates specified details of an existing task.',
  request: {
    params: createIdUUIDParamsSchema('The unique identifier of the task to update.'),
    body: jsonContentRequired(
      taskPatchSchema,
      'The task updates',
    ),
  },
  responses: {
    200: jsonContent(
      taskSelectSchema,
      'Task updated successfully',
    ),
    404: jsonContent(
      notFoundSchema,
      'Task not found',
    ),
    422: jsonContentOneOf(
      [
        createErrorSchema(taskPatchSchema),
        createErrorSchema(createIdUUIDParamsSchema('The unique identifier of the task to update.')),
      ],
      'The validation error(s)',
    ),
  },
})

export const remove = createRoute({
  path: '/tasks/{id}',
  method: 'delete',
  tags,
  summary: 'Delete a task',
  description: 'Deletes a task by its unique identifier.',
  request: {
    params: createIdUUIDParamsSchema('The unique identifier of the task to delete.'),
  },
  responses: {
    204: {
      description: 'Task deleted successfully',
    },
    404: jsonContent(
      notFoundSchema,
      'Task not found',
    ),
    422: jsonContent(
      createErrorSchema(createIdUUIDParamsSchema('The unique identifier of the task to delete.')),
      'Invalid ID error',
    ),
  },
})

export type ListRoute = typeof list
export type CreateRoute = typeof create
export type GetOneRoute = typeof getOne
export type PatchRoute = typeof patch
export type RemoveRoute = typeof remove

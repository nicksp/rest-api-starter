import { createRoute, z } from '@hono/zod-openapi'

import { taskInsertSchema, taskPatchSchema, tasksSelectSchema } from '@/db/schema/tasks.js'
import jsonContentRequired from '@/lib/openapi/helpers/json-content-required.js'
import jsonContent from '@/lib/openapi/helpers/json-content.js'
import createErrorSchema from '@/lib/openapi/schema/create-error-schema.js'
import createIdUUIDParamsSchema from '@/lib/openapi/schema/create-id-uuid-params-schema.js'
import createNotFoundObjectSchema from '@/lib/openapi/schema/create-not-found-object-schema.js'

const tags = ['Tasks']

export const list = createRoute({
  path: '/tasks',
  method: 'get',
  tags,
  summary: 'Fetch a list of tasks',
  description: 'Retrieves available user tasks.',
  responses: {
    200: jsonContent(
      z.array(tasksSelectSchema),
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
      tasksSelectSchema,
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
      tasksSelectSchema,
      'Task retrieved successfully',
    ),
    404: jsonContent(
      createNotFoundObjectSchema(),
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
      tasksSelectSchema,
      'Task updated successfully',
    ),
    404: jsonContent(
      createNotFoundObjectSchema(),
      'Task not found',
    ),
    422: jsonContent(
      createErrorSchema(createIdUUIDParamsSchema('The unique identifier of the task to update.'))
        .or(createErrorSchema(taskPatchSchema)),
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
      createNotFoundObjectSchema(),
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

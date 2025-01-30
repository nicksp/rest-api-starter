import { createRoute, z } from '@hono/zod-openapi'

import { taskSelectSchema } from '@/db/schema/tasks.js'
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

export type ListRoute = typeof list

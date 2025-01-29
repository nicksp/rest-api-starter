import { createRoute, z } from '@hono/zod-openapi'

import jsonContent from '@/utils/openapi/json-content.js'

const tags = ['Tasks']

export const list = createRoute({
  path: '/tasks',
  method: 'get',
  tags,
  responses: {
    200: jsonContent(
      z.array(z.object({
        name: z.string(),
        done: z.boolean(),
      })),
      'The list of tasks',
    ),
  },
})

export type ListRoute = typeof list

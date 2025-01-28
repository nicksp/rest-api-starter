import { createRoute, z } from '@hono/zod-openapi'

import { createRouter } from '@/lib/create-app.js'

const router = createRouter()
  .openapi(createRoute({
    method: 'get',
    path: '/',
    responses: {
      200: {
        content: {
          'application/json': {
            schema: z.object({
              message: z.string(),
            }),
          },
        },
        description: 'REST API index',
      },
    },
  }), (c) => {
    return c.json({ message: 'REST API' })
  })

export default router

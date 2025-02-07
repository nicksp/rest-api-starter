import { createRoute } from '@hono/zod-openapi'

import { createRouter } from '@/lib/create-app.js'
import jsonContent from '@/lib/openapi/helpers/json-content.js'
import createMessageObjectSchema from '@/lib/openapi/schema/create-message-object-schema.js'

const router = createRouter()
  .openapi(createRoute({
    tags: ['Index'],
    method: 'get',
    path: '/',
    responses: {
      200: jsonContent(
        createMessageObjectSchema('REST API'),
        'REST API index',
      ),
    },
  }), (c) => {
    return c.json({ message: 'REST API' })
  })

export default router

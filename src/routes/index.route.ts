import { createRoute } from '@hono/zod-openapi'

import { createRouter } from '@/lib/create-app.js'
import createMessageObjectSchema from '@/utils/openapi/create-message-object.js'
import jsonContent from '@/utils/openapi/json-content.js'

const router = createRouter()
  .openapi(createRoute({
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

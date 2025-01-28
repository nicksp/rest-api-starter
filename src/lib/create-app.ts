import type { ContentfulStatusCode } from 'hono/utils/http-status'

import { OpenAPIHono } from '@hono/zod-openapi'
import { requestId } from 'hono/request-id'
import { STATUS_CODES } from 'node:http'

import { pinoLogger } from '@/middlewares/pino-logger.js'
import serveEmojiFavicon from '@/middlewares/serve-emoji-favicon.js'

import type { AppBindings } from './types.js'

export default function createApp() {
  const app = new OpenAPIHono<AppBindings>({ strict: false })

  app.use(requestId())
  app.use(serveEmojiFavicon('🌮'))
  app.use(pinoLogger())

  app.notFound((c) => {
    const statusCode = 404
    return c.json({ message: `${STATUS_CODES[statusCode]} - ${c.req.path}` }, statusCode)
  })

  app.onError((err, c) => {
    const currentStatus = 'status' in err
      ? err.status
      : c.newResponse(null).status
    const statusCode = currentStatus !== 200
      ? currentStatus as ContentfulStatusCode
      : 500
    // eslint-disable-next-line node/no-process-env
    const env = c.env?.NODE_ENV ?? process.env?.NODE_ENV

    return c.json({
      message: err.message,
      stack: env === 'production'
        ? undefined
        : err.stack,
    }, statusCode)
  })

  return app
}

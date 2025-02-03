import type { Schema } from 'hono'

import { OpenAPIHono } from '@hono/zod-openapi'
import { requestId } from 'hono/request-id'

import defaultHook from '@/hooks/default-hook.js'
import notFound from '@/middlewares/not-found.js'
import onError from '@/middlewares/on-error.js'
import { pinoLogger } from '@/middlewares/pino-logger.js'
import serveEmojiFavicon from '@/middlewares/serve-emoji-favicon.js'

import type { AppBindings, AppOpenAPI } from './types.js'

export function createRouter() {
  return new OpenAPIHono<AppBindings>({ defaultHook, strict: false })
}

export default function createApp() {
  const app = createRouter()

  app.use(requestId())
  app.use(serveEmojiFavicon('🌮'))
  app.use(pinoLogger())

  app.notFound(notFound)
  app.onError(onError)

  return app
}

export function createTestApp<S extends Schema>(router: AppOpenAPI<S>) {
  return createApp().route('/', router)
}

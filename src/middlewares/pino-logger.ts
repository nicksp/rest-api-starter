import type { Context, MiddlewareHandler } from 'hono'
import type { Env } from 'hono-pino'

import { pinoLogger as logger } from 'hono-pino'
import { pino } from 'pino'
import pretty from 'pino-pretty'

import type { AppBindings } from '@/lib/types.js'

export function pinoLogger() {
  return ((c, next) => logger({
    pino: pino({
      level: c.env.LOG_LEVEL,
    }, c.env.NODE_ENV === 'production' ? undefined : pretty()),
  })(c as unknown as Context<Env>, next)) satisfies MiddlewareHandler<AppBindings>
}

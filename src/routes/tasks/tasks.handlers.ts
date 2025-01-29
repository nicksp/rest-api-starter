import type { AppRouteHandler } from '@/lib/types.js'

import type { ListRoute } from './tasks.routes.js'

export const list: AppRouteHandler<ListRoute> = (c) => {
  return c.json([{
    name: 'Learn Hono',
    done: false,
  }])
}

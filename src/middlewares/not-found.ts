import type { NotFoundHandler } from 'hono'

import { STATUS_CODES } from 'node:http'

const notFound: NotFoundHandler = (c) => {
  const statusCode = 404
  return c.json({ message: `${STATUS_CODES[statusCode]} - ${c.req.path}` }, statusCode)
}

export default notFound

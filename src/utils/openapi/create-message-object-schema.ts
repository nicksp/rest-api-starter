import { z } from '@hono/zod-openapi'

export default function createMessageObjectSchema(exampleMessage = 'Example message') {
  return z.object({
    message: z.string(),
  }).openapi({
    example: {
      message: exampleMessage,
    },
  })
}

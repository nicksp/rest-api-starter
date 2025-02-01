import { z } from '@hono/zod-openapi'

export default function createIdParamsSchema(description = 'The unique identifier of the entity.') {
  return z.object({
    id: z.coerce.number().openapi({
      param: {
        name: 'id',
        in: 'path',
        required: true,
        description,
      },
      required: ['id'],
      example: 42,
    }),
  })
}

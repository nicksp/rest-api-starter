import { z } from '@hono/zod-openapi'

export default function createIdUUIDParamsSchema(description = 'The unique identifier of the entity.') {
  return z.object({
    id: z.string().uuid().openapi({
      param: {
        name: 'id',
        in: 'path',
        required: true,
        description,
      },
      examples: [
        'b577253d-5438-49dd-993e-105b38bc9a8c',
        '550e8400-e29b-41d4-a716-446655440000',
      ],
    }),
  })
}

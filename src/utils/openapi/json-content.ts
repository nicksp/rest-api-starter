import type { ZodSchema } from './types.js'

export default function jsonContent<
  T extends ZodSchema,
>(schema: T, description: string) {
  return {
    content: {
      'application/json': {
        schema,
      },
    },
    description,
  }
}

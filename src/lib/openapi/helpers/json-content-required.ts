import type { ZodSchema } from './types.js'

import jsonContent from './json-content.js'

export default function jsonContentRequired<
  T extends ZodSchema,
>(schema: T, description: string) {
  return {
    ...jsonContent(schema, description),
    required: true,
  }
}

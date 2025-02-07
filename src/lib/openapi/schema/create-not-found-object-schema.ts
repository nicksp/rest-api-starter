import { STATUS_CODES } from 'node:http'

import createMessageObjectSchema from './create-message-object-schema.js'

export default function createNotFoundObjectSchema() {
  return createMessageObjectSchema(STATUS_CODES[404])
}

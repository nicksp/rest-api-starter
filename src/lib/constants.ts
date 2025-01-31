import { STATUS_CODES } from 'node:http'

import createMessageObjectSchema from '@/utils/openapi/create-message-object.js'

export const notFoundSchema = createMessageObjectSchema(STATUS_CODES[404])

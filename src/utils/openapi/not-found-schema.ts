import { STATUS_CODES } from 'node:http'

import createMessageObjectSchema from './create-message-object-schema.js'

const notFoundSchema = createMessageObjectSchema(STATUS_CODES[404])

export default notFoundSchema

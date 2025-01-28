import type { AppOpenAPI } from './types.js'

import packageJSON from '../../package.json' assert { type: 'json' }

export default function configureOpenAPI(app: AppOpenAPI) {
  app.doc('/doc', {
    openapi: '3.0.0',
    info: {
      version: packageJSON.version,
      title: 'REST API',
    },
  })
}

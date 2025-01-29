import { apiReference } from '@scalar/hono-api-reference'

import type { AppOpenAPI } from './types.js'

import packageJSON from '../../package.json' assert { type: 'json' }

const openAPIDocPath = '/doc'

export default function configureOpenAPI(app: AppOpenAPI) {
  app.doc(openAPIDocPath, {
    openapi: '3.0.0',
    info: {
      version: packageJSON.version,
      title: 'REST API',
    },
  })

  app.get(
    '/reference',
    apiReference({
      theme: 'kepler',
      layout: 'classic',
      defaultHttpClient: {
        targetKey: 'js',
        clientKey: 'fetch',
      },
      pageTitle: 'REST API Reference',
      spec: {
        url: openAPIDocPath,
      },
    }),
  )
}

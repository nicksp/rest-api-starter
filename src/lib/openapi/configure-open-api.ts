import { apiReference } from '@scalar/hono-api-reference'

import env from '@/env.js'

import type { AppOpenAPI } from '../types.js'

import packageJSON from '../../../package.json' assert { type: 'json' }

const openAPIDocPath = '/doc'

export default function configureOpenAPI(app: AppOpenAPI) {
  app.doc(openAPIDocPath, {
    openapi: '3.0.0',
    info: {
      version: packageJSON.version,
      title: 'Product API',
      description: 'The Product API allows for managing tasks. It is based on the OpenAPI 3.0 specification. You can find out more about Swagger at <http://swagger.io>.',
    },
  })

  app.get(
    '/reference',
    apiReference({
      theme: 'kepler',
      servers: [
        { url: `http://localhost:${env.PORT}`, description: 'Local server' },
        { url: 'https://api.product.com/v1', description: 'Production server' },
      ],
      defaultHttpClient: {
        targetKey: 'js',
        clientKey: 'fetch',
      },
      pageTitle: 'Product API Documentation',
      hideClientButton: true,
      spec: {
        url: openAPIDocPath,
      },
    }),
  )
}

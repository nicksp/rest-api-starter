import { testClient } from 'hono/testing'
import { describe, expect, it } from 'vitest'

import { createTestApp } from '@/lib/create-app.js'

import router from './index.route.js'

const client = testClient(createTestApp(router))

describe('Index', () => {
  describe('GET /', () => {
    it('responds with a message', async () => {
      const response = await client.index.$get()

      expect(response.status).toBe(200)
      const json = await response.json()
      expect(json.message).toBe('REST API')
    })
  })
})

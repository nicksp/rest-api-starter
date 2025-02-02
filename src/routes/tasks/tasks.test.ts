import { testClient } from 'hono/testing'
import { describe, expect, expectTypeOf, it } from 'vitest'

import { createTestApp } from '@/lib/create-app.js'

import router from './tasks.index.js'

const client = testClient(createTestApp(router))

describe('tasks', () => {
  it('responds with an array', async () => {
    const response = await client.tasks.$get()
    expect(response.status).toBe(200)
    expectTypeOf(await response.json()).toBeArray()
  })
})

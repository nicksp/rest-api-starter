/* eslint-disable ts/ban-ts-comment */
import { testClient } from 'hono/testing'
import { STATUS_CODES } from 'node:http'
import { describe, expect, it } from 'vitest'
import { ZodIssueCode } from 'zod'

import { ZOD_ERROR_CODES, ZOD_ERROR_MESSAGES } from '@/lib/constants.js'
import { createTestApp } from '@/lib/create-app.js'

import router from './tasks.index.js'

const client = testClient(createTestApp(router))

describe('Tasks', () => {
  const name = 'Test name'
  let taskId: string

  describe('POST /tasks', async () => {
    it('validates the body when creating', async () => {
      const response = await client.tasks.$post({
        // @ts-expect-error
        json: {
          done: true,
        },
      })

      expect(response.status).toBe(422)
      if (response.status === 422) {
        const json = await response.json()
        expect(json.error.issues[0].path[0]).toBe('name')
        expect(json.error.issues[0].message).toBe(ZOD_ERROR_MESSAGES.REQUIRED)
      }
    })

    it('creates a task', async () => {
      const response = await client.tasks.$post({
        json: {
          name,
        },
      })

      expect(response.status).toBe(200)
      if (response.status === 200) {
        const json = await response.json()
        taskId = json.id

        expect(json.name).toBe(name)
        expect(json.done).toBe(false)
      }
    })
  })

  describe('GET /tasks', () => {
    it('lists all tasks', async () => {
      const response = await client.tasks.$get()

      expect(response.status).toBe(200)
      if (response.status === 200) {
        const json = await response.json()
        expect(json.length).toBe(1)
      }
    })
  })

  describe('GET /tasks:id', () => {
    it('validates the id param', async () => {
      const response = await client.tasks[':id'].$get({
        param: {
          id: 'non-uuid',
        },
      })

      expect(response.status).toBe(422)
      if (response.status === 422) {
        const json = await response.json()
        expect(json.error.issues[0].path[0]).toBe('id')
        expect(json.error.issues[0].message).toBe(ZOD_ERROR_MESSAGES.INVALID_UUID)
      }
    })

    it('returns 404 when task not found', async () => {
      const response = await client.tasks[':id'].$get({
        param: {
          id: 'ba14f20c-c953-4b05-a81b-38328a540d51',
        },
      })

      expect(response.status).toBe(404)
      if (response.status === 404) {
        const json = await response.json()
        expect(json.message).toBe(STATUS_CODES[404])
      }
    })

    it('retrieves a single task', async () => {
      const response = await client.tasks[':id'].$get({
        param: {
          id: taskId,
        },
      })

      expect(response.status).toBe(200)
      if (response.status === 200) {
        const json = await response.json()
        expect(json.name).toBe(name)
        expect(json.done).toBe(false)
      }
    })
  })

  describe('PATCH /tasks/:id', () => {
    it('validates the body when updating', async () => {
      const response = await client.tasks[':id'].$patch({
        param: {
          id: taskId,
        },
        json: {
          name: '',
        },
      })

      expect(response.status).toBe(422)
      if (response.status === 422) {
        const json = await response.json()
        expect(json.error.issues[0].path[0]).toBe('name')
        expect(json.error.issues[0].code).toBe(ZodIssueCode.too_small)
      }
    })

    it('validates the id param', async () => {
      const response = await client.tasks[':id'].$patch({
        param: {
          id: 'non-uuid',
        },
        json: {
          name: 'Example name',
        },
      })

      expect(response.status).toBe(422)
      if (response.status === 422) {
        const json = await response.json()
        expect(json.error.issues[0].path[0]).toBe('id')
        expect(json.error.issues[0].message).toBe(ZOD_ERROR_MESSAGES.INVALID_UUID)
      }
    })

    it('validates empty body', async () => {
      const response = await client.tasks[':id'].$patch({
        param: {
          id: taskId,
        },
        json: {},
      })

      expect(response.status).toBe(422)
      if (response.status === 422) {
        const json = await response.json()
        expect(json.error.issues[0].code).toBe(ZOD_ERROR_CODES.INVALID_UPDATE)
        expect(json.error.issues[0].message).toBe(ZOD_ERROR_MESSAGES.NO_UPDATE)
      }
    })

    it('updates a single property of a task', async () => {
      const response = await client.tasks[':id'].$patch({
        param: {
          id: taskId,
        },
        json: {
          done: true,
        },
      })

      expect(response.status).toBe(200)
      if (response.status === 200) {
        const json = await response.json()
        expect(json.done).toBe(true)
      }
    })
  })

  describe('DELETE /tasks:id', () => {
    it('validates the id when deleting', async () => {
      const response = await client.tasks[':id'].$delete({
        param: {
          id: 'non-uuid',
        },
      })

      expect(response.status).toBe(422)
      if (response.status === 422) {
        const json = await response.json()
        expect(json.error.issues[0].path[0]).toBe('id')
        expect(json.error.issues[0].message).toBe(ZOD_ERROR_MESSAGES.INVALID_UUID)
      }
    })

    it('removes a task', async () => {
      const response = await client.tasks[':id'].$delete({
        param: {
          id: taskId,
        },
      })
      expect(response.status).toBe(204)
      expect(response.body).toBeNull()
    })
  })
})

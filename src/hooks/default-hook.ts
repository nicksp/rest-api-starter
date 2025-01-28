import type { Hook } from '@hono/zod-openapi'

const defaultHook: Hook<any, any, any, any> = (result, c) => {
  if (!result.success) {
    return c.json(
      {
        success: result.success,
        error: result.error,
      },
      422,
    )
  }
}

export default defaultHook

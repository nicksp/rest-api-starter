import { config } from 'dotenv'
import { expand } from 'dotenv-expand'
import path from 'node:path'
import { z } from 'zod'

// eslint-disable-next-line node/no-process-env
const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
expand(config({
  path: path.resolve(process.cwd(), envFile),
}))

const EnvSchema = z.object({
  NODE_ENV: z.string().default('development'),
  PORT: z.coerce.number().default(4000),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']),
  DB_HOST: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  DB_PORT: z.coerce.number(),
  DATABASE_URL: z.string().url(),
})

export type Environment = z.infer<typeof EnvSchema>

export function parseEnv(data: any) {
  const parsedEnv = EnvSchema.safeParse(data)

  if (parsedEnv.error) {
    const errorMessage = `❌ Invalid environment variables: ${Object.entries(parsedEnv.error.flatten().fieldErrors).map(([key, errors]) => `${key}: ${errors.join(',')}`).join(' | ')}`
    throw new Error(errorMessage)
  }

  return parsedEnv.data
}

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

export type env = z.infer<typeof EnvSchema>

// eslint-disable-next-line node/no-process-env
const parsedEnv = EnvSchema.safeParse(process.env)

if (!parsedEnv.success) {
  console.error(
    '❌ Invalid environment variables:',
    JSON.stringify(parsedEnv.error.flatten().fieldErrors, null, 2),
  )
  process.exit(1)
}

export default parsedEnv.data

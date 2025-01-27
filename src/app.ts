import createApp from '@/lib/create-app.js'

const app = createApp()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app

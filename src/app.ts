import createApp from '@/lib/create-app.js'
import configureOpenAPI from '@/lib/openapi/configure-open-api.js'
import index from '@/routes/index.route.js'
import tasks from '@/routes/tasks/tasks.index.js'

const app = createApp()

configureOpenAPI(app)

const routes = [
  index,
  tasks,
]

routes.forEach((route) => {
  app.route('/', route)
})

export default app

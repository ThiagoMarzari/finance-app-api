import 'dotenv/config'
import express from 'express'
import { env } from './config/env.ts'
import { CreateUserController } from './controllers/user/create-user-controller.ts'
import { GetUserByIdController } from './controllers/user/get-user-by-id-controller.ts'

const app = express()
app.use(express.json())

app.post('/api/users', new CreateUserController().execute)
app.get('/api/users/:id', new GetUserByIdController().execute)

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`)
  console.log(`Environment: ${env.NODE_ENV}`)
})

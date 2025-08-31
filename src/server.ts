import 'dotenv/config'
import express from 'express'
import { env } from './config/env.ts'
import { CreateUserController } from './controllers/create-user-controller.ts'

const app = express()
app.use(express.json())

app.post('/api/users', new CreateUserController().execute)

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`)
  console.log(`Environment: ${env.NODE_ENV}`)
})

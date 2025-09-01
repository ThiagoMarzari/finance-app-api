import 'dotenv/config'
import express from 'express'
import { router } from './routes.ts'
import { env } from './config/env.ts'

const app = express()
app.use(express.json())
app.use(router)

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`)
  console.log(`Environment: ${env.NODE_ENV}`)
})

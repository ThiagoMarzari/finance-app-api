import 'dotenv/config'
import express from 'express'
import { env } from './config/env.js'

const app = express()
app.use(express.json())

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`)
  console.log(`Environment: ${env.NODE_ENV}`)
})

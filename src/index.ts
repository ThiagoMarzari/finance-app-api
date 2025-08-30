import 'dotenv/config'
import express from 'express'
import { postgresClient } from './db/postgres/helper.js'
import { env } from './config/env.js'

const app = express()

app.get('/', async (req, res) => {
  const results = await postgresClient.query('SELECT * FROM users')

  res.send(results)
})

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`)
  console.log(`Environment: ${env.NODE_ENV}`)
})

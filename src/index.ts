import 'dotenv/config'
import express from 'express'
import { pool } from './db/postgres/client.js'
import { env } from './config/env.js'

const app = express()

app.get('/', async (req, res) => {
  const client = await pool.connect()

  const result = await client.query('SELECT * FROM users')

  res.send(result)
})

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`)
  console.log(`Environment: ${env.NODE_ENV}`)
})

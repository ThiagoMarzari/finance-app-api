import 'dotenv/config'
import express from 'express'
import { postgresClient } from './db/postgres/helper.js'
import { env } from './config/env.js'

const app = express()

//Pega tu que a gente manda no body e converte para json
app.use(express.json())

app.get('/', async (req, res) => {
  const results = await postgresClient.query('SELECT * FROM users')
  console.log(req.body)
  console.log(req.headers)
  res.status(200).send(results)
})

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`)
  console.log(`Environment: ${env.NODE_ENV}`)
})

import { Pool } from 'pg'
import { env } from '../../config/env.ts'

export const pool = new Pool({
  user: env.PG_USER,
  password: env.PG_PASSWORD,
  port: env.PG_PORT,
  database: env.PG_DB,
  host: env.PG_HOST,
})

export const postgresClient = {
  query: async (query: string, params?: string[]) => {
    const client = await pool.connect()

    const results = await client.query(query, params)

    await client.release() // Libera o cliente

    return results.rows
  },
}

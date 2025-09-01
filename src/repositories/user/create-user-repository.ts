import { postgresClient } from '../../db/postgres/helper.ts'

interface createUserProps {
  id: string
  firstName: string
  lastName: string
  email: string
  password: string
}

export class CreateUserRepository {
  async execute({ id, firstName, lastName, email, password }: createUserProps) {
    const result = await postgresClient.query(
      'INSERT INTO users (id ,first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING first_name, last_name, email, created_at',
      [id, firstName, lastName, email, password],
    )
    return result[0]
  }
}

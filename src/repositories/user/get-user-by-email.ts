import { postgresClient } from '../../db/postgres/helper.ts'

export class GetUserByEmailRepository {
  async execute(email: string) {
    const result = await postgresClient.query(
      'SELECT first_name, last_name, email FROM users WHERE email = $1',
      [email],
    )
    return result[0]
  }
}

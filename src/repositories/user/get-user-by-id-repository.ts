import { postgresClient } from '../../db/postgres/helper.ts'

export class GetUserByIdRepository {
  async execute(id: string) {
    const result = await postgresClient.query(
      'SELECT * FROM users WHERE id = $1',
      [id],
    )
    return result[0]
  }
}

import { postgresClient } from '../../db/postgres/helper.ts'

export class DeleteUserRepository {
  async execute(id: string) {
    const query = `
      DELETE FROM users WHERE id = $1 RETURNING id, first_name last_name, email 
    `
    const deletedUser = await postgresClient.query(query, [id])

    return deletedUser[0]
  }
}

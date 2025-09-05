import { postgresClient } from '../../db/postgres/helper.ts'

export class GetTransactionByUserRepository {
  async execute(userId: string) {
    const query = `
      SELECT * FROM transactions WHERE user_id = $1
    `
    const transaction = postgresClient.query(query, [userId])

    return transaction
  }
}

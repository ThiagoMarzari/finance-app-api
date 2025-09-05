import { postgresClient } from '../../db/postgres/helper.ts'

export class DeleteTransactionRepository {
  async execute(transactionId: string) {
    const query = `
      DELETE FROM transactions 
      WHERE id = $1 
      RETURNING id, user_id, name, date, amount, type
    `

    const result = await postgresClient.query(query, [transactionId])
    return result[0]
  }
}

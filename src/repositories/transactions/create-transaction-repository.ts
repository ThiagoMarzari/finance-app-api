import { postgresClient } from '../../db/postgres/helper.ts'
import { TransactionTypeEnum } from '../../schemas/transaction.ts'

interface CreateTransactionParams {
  id: string
  userId: string
  name: string
  date: string
  amount: number
  type: TransactionTypeEnum
}

export class CreateTransactionRepository {
  async execute({
    id,
    userId,
    name,
    date,
    amount,
    type,
  }: CreateTransactionParams) {
    const query = `
      INSERT INTO transactions (id, user_id, name, date, amount, type)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
    `

    const result = await postgresClient.query(query, [
      id,
      userId,
      name,
      date,
      amount.toString(),
      type,
    ])
    return result[0]
  }
}

import { postgresClient } from '../../db/postgres/helper.ts'

enum TransactionType {
  EARNING = 'EARNING',
  EXPENSE = 'EXPENSE',
  INVESTMENT = 'INVESTMENT',
}

interface CreateTransactionParams {
  id: string
  userId: string
  name: string
  date: string
  amount: number
  type: TransactionType
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

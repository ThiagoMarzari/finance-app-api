import { postgresClient } from '../../db/postgres/helper.ts'

enum TransactionType {
  EARNING = 'EARNING',
  EXPENSE = 'EXPENSE',
  INVESTMENT = 'INVESTMENT',
}

interface CreateTransactionParams {
  userId: string
  name: string
  date: string
  amount: number
  type: TransactionType
}

export class CreateTransactionRepository {
  async execute(createTransactionParams: CreateTransactionParams) {
    const query = `
      INSERT INTO transactions (id, user_id, name, date, amount, type)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
    `

    const result = await postgresClient.query(query, [
      createTransactionParams.userId,
      createTransactionParams.name,
      createTransactionParams.date,
      createTransactionParams.amount.toString(),
      createTransactionParams.type,
    ])
    return result[0]
  }
}

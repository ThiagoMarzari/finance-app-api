import { prisma } from '../../db/prisma/index.ts'
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
    const transaction = prisma.transaction.create({
      data: {
        id,
        user_id: userId,
        name,
        date,
        amount,
        type,
      },
    })
    return transaction
  }
}

import { prisma } from '../../db/prisma/index.ts'
interface UpdateTransactionProps {
  name?: string
  date?: string
  amount?: number
  type?: 'EARNING' | 'EXPENSE' | 'INVESTMENT'
}

export class UpdateTransactionRepository {
  async execute(transactionId: string, transaction: UpdateTransactionProps) {
    try {
      const updatedTransaction = await prisma.transaction.update({
        where: {
          id: transactionId,
        },
        data: transaction,
      })

      return updatedTransaction
    } catch (error) {
      console.log(error)
      return null
    }
  }
}

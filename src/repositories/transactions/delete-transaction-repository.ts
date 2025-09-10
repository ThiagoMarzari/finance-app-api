import { prisma } from '../../db/prisma/index.ts'

export class DeleteTransactionRepository {
  async execute(transactionId: string) {
    try {
      const deletedTransaction = await prisma.transaction.delete({
        where: {
          id: transactionId,
        },
      })

      return deletedTransaction
    } catch (error) {
      console.log(error)
      return null
    }
  }
}

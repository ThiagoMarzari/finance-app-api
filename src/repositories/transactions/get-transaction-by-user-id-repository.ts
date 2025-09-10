import { prisma } from '../../db/prisma/index.ts'

export class GetTransactionByUserRepository {
  async execute(userId: string) {
    const transactions = await prisma.transaction.findMany({
      where: {
        user_id: userId,
      },
    })

    return transactions
  }
}

import { prisma } from '../../db/prisma/index.ts'

export class GetUserBalanceRepository {
  async execute(userId: string) {
    const {
      _sum: { amount: totalExpenses },
    } = await prisma.transaction.aggregate({
      where: {
        user_id: userId,
        type: 'EXPENSE',
      },
      _sum: {
        amount: true,
      },
    })

    const {
      _sum: { amount: totalEarnings },
    } = await prisma.transaction.aggregate({
      where: {
        user_id: userId,
        type: 'EARNING',
      },
      _sum: {
        amount: true,
      },
    })

    const {
      _sum: { amount: totalInvestments },
    } = await prisma.transaction.aggregate({
      where: {
        user_id: userId,
        type: 'INVESTMENT',
      },
      _sum: {
        amount: true,
      },
    })

    const _totalEarnings = Number(totalEarnings ?? 0)
    const _totalExpenses = Number(totalExpenses ?? 0)
    const _totalInvestments = Number(totalInvestments ?? 0)

    const balance = _totalEarnings - _totalExpenses - _totalInvestments

    return {
      balance,
      totalEarnings: _totalEarnings,
      totalExpenses: _totalExpenses,
      totalInvestments: _totalInvestments,
    }
  }
}

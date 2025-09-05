import { UpdateTransactionRepository } from '../../repositories/index.ts'

enum TransactionType {
  EARNING = 'EARNING',
  EXPENSE = 'EXPENSE',
  INVESTMENT = 'INVESTMENT',
}

interface UpdateTransactionProps {
  name?: string
  date?: string
  amount?: number
  type?: TransactionType
}

export class UpdateTransactionService {
  constructor(
    private updateTransactionRepository: UpdateTransactionRepository,
  ) {
    this.updateTransactionRepository = updateTransactionRepository
  }

  async execute(
    transactionId: string,
    updateTransaction: UpdateTransactionProps,
  ) {
    const transaction = {
      ...updateTransaction,
    }

    const updatedTransaction = await this.updateTransactionRepository.execute(
      transactionId,
      transaction,
    )
    return updatedTransaction
  }
}

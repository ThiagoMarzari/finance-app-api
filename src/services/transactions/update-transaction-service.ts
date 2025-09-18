import { UpdateTransactionRepository } from '../../repositories/index.ts'
import { TransactionTypeEnum } from '../../schemas/transaction.ts'

interface UpdateTransactionProps {
  name?: string
  date?: string
  amount?: number
  type?: TransactionTypeEnum
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

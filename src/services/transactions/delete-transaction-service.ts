import { TransactionNotFound } from '../../errors/transaction.ts'
import { DeleteTransactionRepository } from '../../repositories/index.ts'

export class DeleteTransactionService {
  constructor(
    private deleteTransactionRepository: DeleteTransactionRepository,
  ) {
    this.deleteTransactionRepository = deleteTransactionRepository
  }

  async execute(transactionId: string) {
    const deletedTransaction =
      await this.deleteTransactionRepository.execute(transactionId)

    if (!deletedTransaction) {
      throw new TransactionNotFound(transactionId)
    }

    return deletedTransaction
  }
}

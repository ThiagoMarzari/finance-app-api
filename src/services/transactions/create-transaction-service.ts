import { UuidGeneratorAdapter } from '../../adapters/index.ts'
import { UserNotFound } from '../../errors/user.ts'
import {
  CreateTransactionRepository,
  GetUserByIdRepository,
} from '../../repositories/index.ts'
import { TransactionTypeEnum } from '../../schemas/transaction.ts'

interface CreateTransactionParams {
  userId: string
  name: string
  date: string
  amount: number
  type: TransactionTypeEnum
}

export class CreateTransactionService {
  constructor(
    private createTransactionRepository: CreateTransactionRepository,
    private getUserByIdRepository: GetUserByIdRepository,
    private uuidGeneratorAdapter: UuidGeneratorAdapter,
  ) {
    this.createTransactionRepository = createTransactionRepository
    this.getUserByIdRepository = getUserByIdRepository
    this.uuidGeneratorAdapter = uuidGeneratorAdapter
  }

  async execute({ userId, name, date, amount, type }: CreateTransactionParams) {
    const user = await this.getUserByIdRepository.execute(userId)
    if (!user) {
      throw new UserNotFound(userId)
    }

    const transactionID = this.uuidGeneratorAdapter.execute()

    const transaction = await this.createTransactionRepository.execute({
      id: transactionID,
      userId,
      name,
      date,
      amount,
      type,
    })

    return transaction
  }
}

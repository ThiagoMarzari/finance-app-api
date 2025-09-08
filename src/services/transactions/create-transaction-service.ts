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
  ) {
    this.createTransactionRepository = createTransactionRepository
    this.getUserByIdRepository = getUserByIdRepository
  }

  async execute({ userId, name, date, amount, type }: CreateTransactionParams) {
    const user = await this.getUserByIdRepository.execute(userId)
    if (!user) {
      throw new UserNotFound(userId)
    }

    const transactionID = crypto.randomUUID()

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

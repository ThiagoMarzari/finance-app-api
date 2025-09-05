import { UserNotFound } from '../../errors/user.ts'
import {
  GetTransactionByUserRepository,
  GetUserByIdRepository,
} from '../../repositories/index.ts'

interface GetTransactionByUserIdServiceRequest {
  userId: string
}

export class GetTransactionByUserIdService {
  constructor(
    private getTransactionByUserIdRepository: GetTransactionByUserRepository,
    private getUserByIdRepository: GetUserByIdRepository,
  ) {
    this.getTransactionByUserIdRepository = getTransactionByUserIdRepository
    this.getUserByIdRepository = getUserByIdRepository
  }

  async execute(request: GetTransactionByUserIdServiceRequest) {
    const { userId } = request

    //Validar se o usuario existe
    const user = await this.getUserByIdRepository.execute(userId)
    if (!user) {
      throw new UserNotFound(userId)
    }

    const transactions =
      await this.getTransactionByUserIdRepository.execute(userId)

    return transactions
  }
}

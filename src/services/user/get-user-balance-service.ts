import { UserNotFound } from '../../errors/user.ts'
import {
  GetUserBalanceRepository,
  GetUserByIdRepository,
} from '../../repositories/index.ts'

export class GetUserBalanceService {
  constructor(
    private getUserBalanceRepository: GetUserBalanceRepository,
    private getUserByIdRepository: GetUserByIdRepository,
  ) {
    this.getUserBalanceRepository = getUserBalanceRepository
    this.getUserByIdRepository = getUserByIdRepository
  }
  async execute(userId: string) {
    const user = await this.getUserByIdRepository.execute(userId)
    if (!user) {
      throw new UserNotFound(userId)
    }

    const balance = await this.getUserBalanceRepository.execute(userId)
    return balance
  }
}

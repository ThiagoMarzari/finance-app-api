import { GetUserByIdRepository } from '../../repositories/index.ts'

export class GetUserByIdService {
  constructor(private getUserByIdRepository: GetUserByIdRepository) {
    this.getUserByIdRepository = getUserByIdRepository
  }
  async execute(id: string) {
    const user = await this.getUserByIdRepository.execute(id)

    return user
  }
}

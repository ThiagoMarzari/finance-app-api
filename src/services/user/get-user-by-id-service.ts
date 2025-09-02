import { GetUserByIdRepository } from '../../repositories/index.ts'

export class GetUserByIdService {
  async execute(id: string) {
    const getUserByIdRepository = new GetUserByIdRepository()
    const user = await getUserByIdRepository.execute(id)

    return user
  }
}

import { GetUserByIdRepository } from '../../repositories/user/get-user-by-id-repository.ts'

export class GetUserByIdService {
  async execute(id: string) {
    const getUserByIdRepository = new GetUserByIdRepository()
    const user = await getUserByIdRepository.execute(id)
    return user
  }
}

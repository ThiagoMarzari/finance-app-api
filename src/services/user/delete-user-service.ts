import { DeleteUserRepository } from '../../repositories/index.ts'

export class DeleteUserService {
  async execute(id: string) {
    const deleteUserRepository = new DeleteUserRepository()
    const deletedUser = await deleteUserRepository.execute(id)

    return deletedUser
  }
}

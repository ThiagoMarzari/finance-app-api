import { DeleteUserRepository } from '../../repositories/index.ts'

export class DeleteUserService {
  constructor(private deleteUserRepository: DeleteUserRepository) {
    this.deleteUserRepository = deleteUserRepository
  }
  async execute(id: string) {
    const deletedUser = await this.deleteUserRepository.execute(id)

    return deletedUser
  }
}

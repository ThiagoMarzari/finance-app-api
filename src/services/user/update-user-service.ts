import bcrypt from 'bcryptjs'
import { EmailAlreadyExists } from '../../errors/user.ts'
import {
  GetUserByEmailRepository,
  UpdateUserRepository,
} from '../../repositories/index.ts'

interface updateUserProps {
  firstName?: string
  lastName?: string
  email?: string
  password?: string
}

export class UpdateUserService {
  constructor(
    private updateUserRepository: UpdateUserRepository,
    private getUserByEmailRepository: GetUserByEmailRepository,
  ) {
    this.updateUserRepository = updateUserRepository
    this.getUserByEmailRepository = getUserByEmailRepository
  }
  async execute(userId: string, updateUser: updateUserProps) {
    if (updateUser.email) {
      const existsUser = await this.getUserByEmailRepository.execute(
        updateUser.email,
      )
      if (existsUser && existsUser.id !== userId) {
        throw new EmailAlreadyExists(existsUser.email)
      }
    }
    const user = {
      ...updateUser,
    }

    if (updateUser.password) {
      const hashedPassword = await bcrypt.hash(updateUser.password, 10)

      user.password = hashedPassword
    }

    const updatedUser = await this.updateUserRepository.execute(userId, user)
    return updatedUser
  }
}

import bcrypt from 'bcryptjs'
import { EmailAlreadyExists } from '../../errors/user.ts'
import { GetUserByEmailRepository } from '../../repositories/user/get-user-by-email.ts'
import { UpdateUserRepository } from '../../repositories/user/update-user-repository.ts'

interface updateUserProps {
  firstName?: string
  lastName?: string
  email?: string
  password?: string
}

export class UpdateUserService {
  async execute(userId: string, updateUser: updateUserProps) {
    if (updateUser.email) {
      const getUserByEmailRepository = new GetUserByEmailRepository()
      const existsUser = await getUserByEmailRepository.execute(
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

    const updateUserRepository = new UpdateUserRepository()
    const updatedUser = await updateUserRepository.execute(userId, user)
    return updatedUser
  }
}

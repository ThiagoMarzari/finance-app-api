import { prisma } from '../../db/prisma/index.ts'

export class DeleteUserRepository {
  async execute(id: string) {
    try {
      const deletedUser = await prisma.user.delete({
        where: {
          id,
        },
      })
      return deletedUser
    } catch (error) {
      console.log(error)
      return null
    }
  }
}

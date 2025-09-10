import { prisma } from '../../db/prisma/index.ts'

interface updateUserProps {
  firstName?: string
  lastName?: string
  email?: string
  password?: string
}

export class UpdateUserRepository {
  async execute(userId: string, user: updateUserProps) {
    const result = await prisma.user.update({
      where: {
        id: userId,
      },
      data: user,
    })

    return result
  }
}

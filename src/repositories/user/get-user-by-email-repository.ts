import { prisma } from '../../db/prisma/index.ts'

export class GetUserByEmailRepository {
  async execute(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }
}

import { prisma } from '../../db/prisma/index.ts'

export class GetUserByIdRepository {
  async execute(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }
}

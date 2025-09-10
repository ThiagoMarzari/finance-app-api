import { prisma } from '../../db/prisma/index.ts'

export class GetUserByIdRepository {
  async execute(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
        created_at: true,
      },
    })

    return user
  }
}

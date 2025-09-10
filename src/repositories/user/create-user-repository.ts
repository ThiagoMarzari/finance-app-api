import { prisma } from '../../db/prisma/index.ts'

interface createUserProps {
  id: string
  firstName: string
  lastName: string
  email: string
  password: string
}

export class CreateUserRepository {
  async execute({ id, firstName, lastName, email, password }: createUserProps) {
    const user = await prisma.user.create({
      data: {
        id,
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      },
    })

    return user
  }
}

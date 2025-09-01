import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import { CreateUserRepository } from '../../repositories/user/create-user-repository.ts'
import { GetUserByEmailRepository } from '../../repositories/user/get-user-by-email.ts'

interface createUserProps {
  firstName: string
  lastName: string
  email: string
  password: string
}

export class CreateUserService {
  async execute({ firstName, lastName, email, password }: createUserProps) {
    const getUserByEmailRepository = new GetUserByEmailRepository()
    const existsUser = await getUserByEmailRepository.execute(email)

    if (existsUser) {
      throw new Error('User already exists')
    }

    //Gerar id do usuario
    const userId = crypto.randomUUID()
    //Criptografar a senha
    const passwordHashed = await bcrypt.hash(password, 10)
    const user: createUserProps & { id: string } = {
      id: userId,
      password: passwordHashed,
      firstName,
      lastName,
      email,
    }

    const userRepository = new CreateUserRepository()
    //inserir usuario no banco de dados
    const createdUser = await userRepository.execute(user)

    return createdUser
  }
}

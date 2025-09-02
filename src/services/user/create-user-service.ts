import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import {
  CreateUserRepository,
  GetUserByEmailRepository,
} from '../../repositories/index.ts'
import { EmailAlreadyExists } from '../../errors/user.ts'

interface createUserProps {
  firstName: string
  lastName: string
  email: string
  password: string
}

export class CreateUserService {
  async execute({ firstName, lastName, email, password }: createUserProps) {
    const getUserByEmailRepository = new GetUserByEmailRepository()
    const existsUserEmail = await getUserByEmailRepository.execute(email)

    if (existsUserEmail) {
      throw new EmailAlreadyExists(email)
    }

    const userId = crypto.randomUUID()
    //Criptografar a senha
    const passwordHashed = await bcrypt.hash(password, 10)
    const user: createUserProps & { id: string } = {
      id: userId,
      password: passwordHashed,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
    }

    const userRepository = new CreateUserRepository()
    //inserir usuario no banco de dados
    const createdUser = await userRepository.execute(user)

    return createdUser
  }
}

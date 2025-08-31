import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import { CreateUserRepository } from '../repositories/create-user-repository.ts'

interface createUserProps {
  firstName: string
  lastName: string
  email: string
  password: string
}

export class CreateUserService {
  async execute({ firstName, lastName, email, password }: createUserProps) {
    // TODO: Verificar se o usuário já existe
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

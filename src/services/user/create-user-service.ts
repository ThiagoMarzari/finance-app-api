import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import { CreateUserRepository } from '../../repositories/user/create-user-repository.ts'
import { GetUserByEmailRepository } from '../../repositories/user/get-user-by-email.ts'
import {
  EmailAlreadyExists,
  EmailInvalid,
  PasswordInvalid,
  PasswordLengthInvalid,
} from '../../errors/user.ts'
import { isEmail } from '../../utils/validator.ts'

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

    // Validar se a senha contém pelo menos uma letra e um número
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)/
    if (!passwordRegex.test(password)) {
      throw new PasswordInvalid()
    }

    if (password.length < 8) {
      throw new PasswordLengthInvalid()
    }

    // Validar se o email é válido
    if (!isEmail(email)) {
      throw new EmailInvalid()
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

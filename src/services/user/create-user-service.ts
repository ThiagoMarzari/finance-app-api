import {
  CreateUserRepository,
  GetUserByEmailRepository,
} from '../../repositories/index.ts'
import { EmailAlreadyExists } from '../../errors/user.ts'
import {
  PasswordHasherAdapter,
  UuidGeneratorAdapter,
} from '../../adapters/index.ts'

interface createUserProps {
  firstName: string
  lastName: string
  email: string
  password: string
}

export class CreateUserService {
  constructor(
    private createUserRepository: CreateUserRepository,
    private getUserByEmailRepository: GetUserByEmailRepository,
    private passwordHasherAdapter: PasswordHasherAdapter,
    private uuidGeneratorAdapter: UuidGeneratorAdapter,
  ) {
    this.createUserRepository = createUserRepository
    this.getUserByEmailRepository = getUserByEmailRepository
    this.passwordHasherAdapter = passwordHasherAdapter
    this.uuidGeneratorAdapter = uuidGeneratorAdapter
  }

  async execute({ firstName, lastName, email, password }: createUserProps) {
    const existsUserEmail = await this.getUserByEmailRepository.execute(email)

    if (existsUserEmail) {
      throw new EmailAlreadyExists(email)
    }

    const userId = this.uuidGeneratorAdapter.execute()
    //Criptografar a senha
    const passwordHashed = await this.passwordHasherAdapter.execute(password)
    const user: createUserProps & { id: string } = {
      id: userId,
      password: passwordHashed,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
    }

    //inserir usuario no banco de dados
    const createdUser = await this.createUserRepository.execute(user)

    return createdUser
  }
}

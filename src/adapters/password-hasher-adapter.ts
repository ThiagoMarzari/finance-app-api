import bcrypt from 'bcryptjs'

export class PasswordHasherAdapter {
  async execute(password: string) {
    return await bcrypt.hash(password, 10)
  }
}

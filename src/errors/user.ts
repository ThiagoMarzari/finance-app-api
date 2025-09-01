export class EmailAlreadyExists extends Error {
  constructor(email?: string) {
    super(`Email ${email} already exists`)
    this.name = 'EmailAlreadyExists'
  }
}

export class EmailAlreadyExists extends Error {
  constructor(email?: string) {
    super(`Email ${email} already exists`)
    this.name = 'EmailAlreadyExists'
  }
}

export class UserNotFound extends Error {
  constructor(id?: string) {
    super(`User ${id} not found`)
    this.name = 'UserNotFound'
  }
}

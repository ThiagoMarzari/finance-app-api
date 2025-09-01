export class EmailAlreadyExists extends Error {
  constructor(email?: string) {
    super(`Email ${email} already exists`)
    this.name = 'EmailAlreadyExists'
  }
}

export class PasswordInvalid extends Error {
  constructor() {
    super('Password must contain at least one letter and one number')
    this.name = 'PasswordInvalid'
  }
}

export class PasswordLengthInvalid extends Error {
  constructor() {
    super('Password must be at least 8 characters long')
    this.name = 'PasswordLengthInvalid'
  }
}

export class EmailInvalid extends Error {
  constructor() {
    super('Email is invalid')
    this.name = 'EmailInvalid'
  }
}

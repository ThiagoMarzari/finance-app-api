export const isValidPassword = (password: string) => {
  // Validar se a senha tem pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
  return passwordRegex.test(password)
}

export const isEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const invalidPasswordMessage =
  'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)'

export const invalidEmailMessage = 'Email must be a valid email address'

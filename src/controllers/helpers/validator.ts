import { badRequest } from './http.ts'
import { Response } from 'express'

export const invalidPasswordResponse = (res: Response) =>
  badRequest(
    res,
    'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)',
  )

export const invalidEmailResponse = (res: Response) =>
  badRequest(res, 'Email must be a valid email address')

export const isEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const isUUID = (id: string) => {
  // Validar se o ID é um UUID válido
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return uuidRegex.test(id)
}

export const isValidPassword = (password: string) => {
  // Validar se a senha tem pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
  return passwordRegex.test(password)
}

export const isValidCurrency = (currency: string | number) => {
  // Validar se a string ou número representa uma moeda válida
  if (currency === null || currency === undefined) {
    return false
  }

  // Se for número, converter para string com 2 casas decimais
  if (typeof currency === 'number') {
    if (isNaN(currency) || currency < 0) {
      return false
    }
    // Verificar se tem no máximo 2 casas decimais
    const decimalPlaces = (currency.toString().split('.')[1] || '').length
    return decimalPlaces <= 2
  }

  if (typeof currency !== 'string') {
    return false
  }

  // Remove espaços em branco no início e fim
  const trimmedCurrency = currency.trim()

  // Regex para validar diferentes formatos monetários:
  // - Símbolos de moeda opcionais: $, R$, €, £, ¥, etc.
  // - Separadores de milhar: vírgula, ponto ou espaço
  // - Separador decimal: vírgula ou ponto
  // - Exatamente 2 casas decimais obrigatórias
  const currencyRegex =
    /^([R$€£¥$]?\s?)([0-9]{1,3}([.\s,][0-9]{3})*)([,.][0-9]{2})$/

  if (!currencyRegex.test(trimmedCurrency)) {
    return false
  }

  // Extrair a parte numérica para validações adicionais
  const numericPart = trimmedCurrency.replace(/^[R$€£¥$]?\s?/, '')

  // Verificar se tem exatamente 2 casas decimais
  const decimalParts = numericPart.split(/[,.]/)
  if (decimalParts.length < 2) {
    return false
  }

  const decimalPart = decimalParts[decimalParts.length - 1]
  if (decimalPart.length !== 2) {
    return false
  }

  // Verificar se não há caracteres inválidos
  const cleanNumber = numericPart.replace(/[^0-9,.]/g, '')
  if (cleanNumber !== numericPart) {
    return false
  }

  // Verificar se o valor é um número válido quando convertido
  const normalizedNumber = numericPart
    .replace(/[\s,]/g, '') // Remove espaços e vírgulas de separação de milhar
    .replace(/,([0-9]{2})$/, '.$1') // Converte vírgula decimal para ponto

  const numberValue = parseFloat(normalizedNumber)
  return !isNaN(numberValue) && numberValue >= 0
}

export const invalidIdResponse = (res: Response) =>
  badRequest(res, 'User ID is invalid')

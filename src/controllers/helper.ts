import { Response } from 'express'

// Helper functions para respostas padronizadas
export const badRequest = (res: Response, message: string) => {
  return res.status(400).json({ message })
}

type status = {
  code: number
  message: string
}

export const ok = (
  res: Response,
  data: unknown,
  status: status = {
    code: 200,
    message: 'OK',
  },
) => {
  return res.status(status.code).json({
    message: status.message,
    data,
  })
}

export const created = (
  res: Response,
  data: unknown,
  status: status = {
    code: 201,
    message: 'Created',
  },
) => {
  return res.status(status.code).json({
    message: status.message,
    data,
  })
}

export const internalServerError = (
  res: Response,
  message = 'Internal Server Error',
  status: status = {
    code: 500,
    message: 'Internal Server Error',
  },
) => {
  return res.status(status.code).json({ message })
}

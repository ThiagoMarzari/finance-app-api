import { Response } from 'express'

// Helper functions para respostas padronizadas
export const badRequest = (res: Response, message: string) => {
  return res.status(400).json({ message })
}

export const ok = (res: Response, data: unknown) => {
  return res.status(200).json(data)
}

export const created = (res: Response, data: unknown) => {
  return res.status(201).json(data)
}

export const internalServerError = (
  res: Response,
  message = 'Internal Server Error',
) => {
  return res.status(500).json({ message })
}

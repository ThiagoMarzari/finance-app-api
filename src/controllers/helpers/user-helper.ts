import { badRequest } from './http.ts'
import { Response } from 'express'

export const invalidPasswordResponse = (res: Response) =>
  badRequest(
    res,
    'Password must be at least 8 characters long and contain both numbers and letters',
  )

export const invalidEmailResponse = (res: Response) =>
  badRequest(res, 'Email must be a valid email address')

export const invalidIdResponse = (res: Response) =>
  badRequest(res, 'User ID is invalid')

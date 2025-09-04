import { UpdateUserService } from '../../services/index.ts'
import { EmailAlreadyExists, UserNotFound } from '../../errors/user.ts'
import { Request, Response } from 'express'
import {
  invalidPasswordMessage,
  isEmail,
  isUUID,
  isValidPassword,
} from '../helpers/index.ts'
import { badRequest, internalServerError, ok } from '../helpers/index.ts'

export class UpdateUserController {
  constructor(private updateUserService: UpdateUserService) {
    this.updateUserService = updateUserService
  }
  async execute(req: Request, res: Response) {
    try {
      const { first_name, last_name, email, password } = req.body
      const { id } = req.params

      if (!isUUID(id)) {
        return badRequest(res, 'User ID is invalid')
      }

      if (!first_name && !last_name && !email && !password) {
        return badRequest(res, 'No data to update')
      }

      if (email && !isEmail(email)) {
        return badRequest(res, 'Email must be a valid email address')
      }

      if (password && !isValidPassword(password)) {
        return badRequest(res, invalidPasswordMessage)
      }

      const updatedUser = await this.updateUserService.execute(id, {
        firstName: first_name,
        lastName: last_name,
        email,
        password,
      })
      return ok(res, updatedUser)
    } catch (error) {
      if (error instanceof EmailAlreadyExists) {
        return badRequest(res, error.message)
      }
      if (error instanceof UserNotFound) {
        return badRequest(res, error.message)
      }
      console.error('Error updating user:', error)
      return internalServerError(res, 'Internal server error')
    }
  }
}

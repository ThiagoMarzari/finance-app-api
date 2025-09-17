import { UpdateUserService } from '../../services/index.ts'
import { EmailAlreadyExists, UserNotFound } from '../../errors/user.ts'
import { Request, Response } from 'express'
import { isUUID, notFound } from '../helpers/index.ts'
import { badRequest, internalServerError, ok } from '../helpers/index.ts'
import { updateUserSchema } from '../../schemas/user.ts'
import { ZodError } from 'zod'

export class UpdateUserController {
  constructor(private updateUserService: UpdateUserService) {
    this.updateUserService = updateUserService
  }
  async execute(req: Request, res: Response) {
    try {
      const { first_name, last_name, email, password } = updateUserSchema.parse(
        req.body,
      )
      const { id } = req.params

      if (!isUUID(id)) {
        return badRequest(res, 'User ID is invalid')
      }

      if (!first_name && !last_name && !email && !password) {
        return badRequest(res, 'At least one field is required')
      }

      const updatedUser = await this.updateUserService.execute(id, {
        firstName: first_name,
        lastName: last_name,
        email,
        password,
      })
      return ok(res, updatedUser)
    } catch (error) {
      if (error instanceof ZodError) {
        return badRequest(res, error.issues[0].message)
      }
      if (error instanceof EmailAlreadyExists) {
        return badRequest(res, error.message)
      }
      if (error instanceof UserNotFound) {
        return notFound(res, error.message)
      }
      console.error('Error updating user:', error)
      return internalServerError(res, 'Internal server error')
    }
  }
}

import { UpdateUserService } from '../../services/index.ts'
import { EmailAlreadyExists } from '../../errors/user.ts'
import { Request, Response } from 'express'
import { isEmail, isUUID, isValidPassword } from '../../utils/validator.ts'
import {
  invalidIdResponse,
  invalidEmailResponse,
  badRequest,
  internalServerError,
  invalidPasswordResponse,
  ok,
} from '../helpers/index.ts'

export class UpdateUserController {
  async execute(req: Request, res: Response) {
    try {
      const { first_name, last_name, email, password } = req.body
      const { id } = req.params

      if (!isUUID(id)) {
        return invalidIdResponse(res)
      }

      if (!first_name && !last_name && !email && !password) {
        return badRequest(res, 'No data to update')
      }

      if (email && !isEmail(email)) {
        return invalidEmailResponse(res)
      }

      if (password && !isValidPassword(password)) {
        return invalidPasswordResponse(res)
      }

      const updateUserService = new UpdateUserService()
      const updatedUser = await updateUserService.execute(id, {
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
      console.error('Error updating user:', error)
      return internalServerError(res)
    }
  }
}

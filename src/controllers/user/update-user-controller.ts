import { UpdateUserService } from '../../services/user/update-user-service.ts'
import { ok } from '../helper.ts'
import { EmailAlreadyExists } from '../../errors/user.ts'
import { badRequest } from '../helper.ts'
import { internalServerError } from '../helper.ts'
import { Request, Response } from 'express'
import { isEmail, isUUID, isValidPassword } from '../../utils/validator.ts'

export class UpdateUserController {
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
        return badRequest(res, 'Email is invalid')
      }

      if (password && !isValidPassword(password)) {
        return badRequest(res, 'Password is invalid')
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

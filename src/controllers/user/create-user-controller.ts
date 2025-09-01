import { Request, Response } from 'express'
import { badRequest } from '../helper.ts'
import { CreateUserService } from '../../services/user/create-user-service.ts'
import { created, internalServerError } from '../helper.ts'
import {
  EmailAlreadyExists,
  EmailInvalid,
  PasswordInvalid,
  PasswordLengthInvalid,
} from '../../errors/user.ts'

export class CreateUserController {
  async execute(req: Request, res: Response) {
    try {
      const { first_name, last_name, email, password } = req.body

      if (
        !first_name.trim() ||
        !last_name.trim() ||
        !email.trim() ||
        !password.trim()
      ) {
        return badRequest(
          res,
          'All fields are required: first_name, last_name, email, password',
        )
      }

      const createUserService = new CreateUserService()
      const createdUser = await createUserService.execute({
        firstName: first_name,
        lastName: last_name,
        email,
        password,
      })
      return created(res, createdUser)
    } catch (error) {
      if (error instanceof EmailAlreadyExists) {
        return badRequest(res, error.message)
      }
      if (error instanceof PasswordInvalid) {
        return badRequest(res, error.message)
      }
      if (error instanceof EmailInvalid) {
        return badRequest(res, error.message)
      }
      if (error instanceof PasswordLengthInvalid) {
        return badRequest(res, error.message)
      }
      console.error('Error creating user:', error)
      return internalServerError(res)
    }
  }
}

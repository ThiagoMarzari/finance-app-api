import { Request, Response } from 'express'
import { CreateUserService } from '../../services/index.ts'
import { isEmail, isValidPassword } from '../../utils/validator.ts'
import { EmailAlreadyExists } from '../../errors/user.ts'
import {
  badRequest,
  created,
  internalServerError,
  invalidEmailResponse,
  invalidPasswordResponse,
} from '../helpers/index.ts'
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

      if (!isEmail(email)) {
        return invalidEmailResponse(res)
      }

      if (!isValidPassword(password)) {
        return invalidPasswordResponse(res)
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
      console.error('Error creating user:', error)
      return internalServerError(res)
    }
  }
}

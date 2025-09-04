import { Request, Response } from 'express'
import { CreateUserService } from '../../services/index.ts'
import { EmailAlreadyExists } from '../../errors/user.ts'
import {
  badRequest,
  created,
  internalServerError,
  invalidEmailMessage,
  invalidPasswordMessage,
  isEmail,
  isValidPassword,
} from '../helpers/index.ts'

export class CreateUserController {
  constructor(private createUserService: CreateUserService) {
    this.createUserService = createUserService
  }
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
        return badRequest(res, invalidEmailMessage)
      }

      if (!isValidPassword(password)) {
        return badRequest(res, invalidPasswordMessage)
      }

      const createdUser = await this.createUserService.execute({
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
      return internalServerError(res, 'Internal server error')
    }
  }
}

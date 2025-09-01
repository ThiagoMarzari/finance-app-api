import { Request, Response } from 'express'
import { badRequest } from '../helper.ts'
import { CreateUserService } from '../../services/user/create-user-service.ts'
import { created, internalServerError } from '../helper.ts'
import { isEmail } from '../../utils/validator.ts'
import { EmailAlreadyExists } from '../../errors/user.ts'

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

      if (password.length < 8) {
        return badRequest(res, 'password must be at least 8 characters long')
      }

      if (!isEmail(email)) {
        return badRequest(res, 'Invalid email format')
      }

      // Validar se a senha contém pelo menos uma letra e um número
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)/
      if (!passwordRegex.test(password)) {
        return badRequest(
          res,
          'password must contain at least one letter and one number',
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
      console.error('Error creating user:', error)
      return internalServerError(res)
    }
  }
}

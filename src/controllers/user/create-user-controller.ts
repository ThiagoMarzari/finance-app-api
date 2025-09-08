import { Request, Response } from 'express'
import { CreateUserService } from '../../services/index.ts'
import { EmailAlreadyExists } from '../../errors/user.ts'
import { badRequest, created, internalServerError } from '../helpers/index.ts'
import { ZodError } from 'zod'
import { createUserSchema } from '../../schemas/index.ts'

export class CreateUserController {
  constructor(private createUserService: CreateUserService) {
    this.createUserService = createUserService
  }
  async execute(req: Request, res: Response) {
    try {
      const { first_name, last_name, email, password } = createUserSchema.parse(
        req.body,
      )

      const createdUser = await this.createUserService.execute({
        firstName: first_name,
        lastName: last_name,
        email,
        password,
      })
      return created(res, createdUser)
    } catch (error) {
      if (error instanceof ZodError) {
        return badRequest(res, error.issues[0].message)
      }
      if (error instanceof EmailAlreadyExists) {
        return badRequest(res, error.message)
      }
      console.error('Error creating user:', error)
      return internalServerError(res, 'Internal server error')
    }
  }
}

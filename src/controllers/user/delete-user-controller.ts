import { Request, Response } from 'express'
import { DeleteUserService } from '../../services/index.ts'
import { isUUID } from '../helpers/index.ts'
import {
  badRequest,
  internalServerError,
  notFound,
  ok,
} from '../helpers/index.ts'

export class DeleteUserController {
  constructor(private deleteUserService: DeleteUserService) {
    this.deleteUserService = deleteUserService
  }
  async execute(req: Request, res: Response) {
    try {
      const { id } = req.params
      if (!isUUID(id)) {
        return badRequest(res, 'Invalid UUID format')
      }

      const deletedUser = await this.deleteUserService.execute(id)
      if (!deletedUser) {
        return notFound(res, 'User not found')
      }

      return ok(res, deletedUser)
    } catch (error) {
      console.error('Error deleting user:', error)
      return internalServerError(res)
    }
  }
}

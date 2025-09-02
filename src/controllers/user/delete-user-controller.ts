import { Request, Response } from 'express'
import { DeleteUserService } from '../../services/index.ts'
import { isUUID } from '../../utils/validator.ts'
import {
  badRequest,
  internalServerError,
  notFound,
  ok,
} from '../helpers/index.ts'

export class DeleteUserController {
  async execute(req: Request, res: Response) {
    try {
      const { id } = req.params
      if (!isUUID(id)) {
        return badRequest(res, 'Invalid UUID format')
      }

      const deleteUserService = new DeleteUserService()
      const deletedUser = await deleteUserService.execute(id)
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

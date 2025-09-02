import { Request, Response } from 'express'
import { GetUserByIdService } from '../../services/index.ts'
import { isUUID } from '../../utils/validator.ts'
import {
  badRequest,
  internalServerError,
  notFound,
  ok,
} from '../helpers/index.ts'

export class GetUserByIdController {
  constructor(private getUserByidService: GetUserByIdService) {
    this.getUserByidService = getUserByidService
  }
  async execute(req: Request, res: Response) {
    try {
      const { id } = req.params
      if (!isUUID(id)) {
        return badRequest(res, 'Invalid UUID format')
      }

      const user = await this.getUserByidService.execute(id)
      if (!user) {
        return notFound(res, 'User not found')
      }

      return ok(res, user)
    } catch (error) {
      console.error('Error getting user by id:', error)
      return internalServerError(res)
    }
  }
}

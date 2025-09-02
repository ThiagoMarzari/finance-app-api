import { Request, Response } from 'express'
import { GetUserByIdService } from '../../services/user/get-user-by-id-service.ts'
import { isUUID } from '../../utils/validator.ts'
import { ok } from 'assert'
import {
  notFound,
  internalServerError,
  invalidIdResponse,
} from '../helpers/index.ts'

export class GetUserByIdController {
  async execute(req: Request, res: Response) {
    try {
      const { id } = req.params
      if (!isUUID(id)) {
        return invalidIdResponse(res)
      }

      const getUserByIdService = new GetUserByIdService()
      const user = await getUserByIdService.execute(id)
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

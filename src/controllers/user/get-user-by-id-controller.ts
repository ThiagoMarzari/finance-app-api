import { Request, Response } from 'express'
import { badRequest, internalServerError, notFound, ok } from '../helper.ts'
import { GetUserByIdService } from '../../services/user/get-user-by-id-service.ts'
import { isUUID } from '../../utils/validator.ts'

export class GetUserByIdController {
  async execute(req: Request, res: Response) {
    try {
      const { id } = req.params
      if (!id) {
        return badRequest(res, 'id is required')
      }

      // Validar se o ID é um UUID válido
      if (!isUUID(id)) {
        return badRequest(res, 'Invalid UUID format')
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

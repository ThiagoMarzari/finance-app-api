import { Request, Response } from 'express'
import { badRequest, internalServerError, ok } from '../helper.ts'
import { GetUserByIdService } from '../../services/user/get-user-by-id-service.ts'

export class GetUserByIdController {
  async execute(req: Request, res: Response) {
    try {
      const { id } = req.params
      if (!id) {
        return badRequest(res, 'id is required')
      }

      // Validar se o ID é um UUID válido
      const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
      if (!uuidRegex.test(id)) {
        return badRequest(res, 'Invalid UUID format')
      }

      const getUserByIdService = new GetUserByIdService()
      const user = await getUserByIdService.execute(id)
      if (!user) {
        return badRequest(res, 'User not found')
      }

      return ok(res, user)
    } catch (error) {
      console.error('Error getting user by id:', error)
      return internalServerError(res)
    }
  }
}

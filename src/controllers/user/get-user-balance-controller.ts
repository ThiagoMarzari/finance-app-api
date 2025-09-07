import { Request, Response } from 'express'
import { GetUserBalanceService } from '../../services/index.ts'
import {
  badRequest,
  internalServerError,
  ok,
  isUUID,
} from '../helpers/index.ts'
import { UserNotFound } from '../../errors/user.ts'

export class GetUserBalanceController {
  constructor(private getUserBalanceService: GetUserBalanceService) {
    this.getUserBalanceService = getUserBalanceService
  }

  async execute(req: Request, res: Response) {
    try {
      const { userId } = req.params

      if (!isUUID(userId)) {
        return badRequest(res, 'Invalid UUID format')
      }

      const balance = await this.getUserBalanceService.execute(userId)

      return ok(res, balance)
    } catch (error) {
      console.error('Error getting user balance:', error)

      // Handle specific user not found error
      if (error instanceof UserNotFound) {
        return badRequest(res, error.message)
      }

      return internalServerError(res)
    }
  }
}

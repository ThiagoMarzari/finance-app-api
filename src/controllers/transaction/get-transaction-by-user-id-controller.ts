import { UserNotFound } from '../../errors/user.ts'
import { GetTransactionByUserIdService } from '../../services/index.ts'
import {
  badRequest,
  internalServerError,
  notFound,
  ok,
} from '../helpers/index.ts'

import { isUUID } from '../helpers/validator.ts'
import { Response, Request } from 'express'

export class GetTransactionByUserIdController {
  constructor(
    private getTransactionByUserIdService: GetTransactionByUserIdService,
  ) {
    this.getTransactionByUserIdService = getTransactionByUserIdService
  }

  async execute(request: Request, res: Response) {
    try {
      const { userId } = request.query as { userId: string }

      if (!userId) {
        return badRequest(res, 'User ID is required')
      }

      if (!isUUID(userId)) {
        return badRequest(res, 'User ID is invalid')
      }

      const transactions = await this.getTransactionByUserIdService.execute({
        userId,
      })
      return ok(res, transactions)
    } catch (error) {
      if (error instanceof UserNotFound) {
        return notFound(res, error.message)
      }
      return internalServerError(res)
    }
  }
}

import { Request, Response } from 'express'
import {
  badRequest,
  internalServerError,
  ok,
  notFound,
} from '../helpers/index.ts'
import { isUUID } from '../helpers/index.ts'
import { DeleteTransactionService } from '../../services/transactions/delete-transaction-service.ts'
import { TransactionNotFound } from '../../errors/transaction.ts'

export class DeleteTransactionController {
  constructor(private deleteTransactionService: DeleteTransactionService) {
    this.deleteTransactionService = deleteTransactionService
  }

  async execute(req: Request, res: Response) {
    try {
      const { id } = req.params

      if (!isUUID(id)) {
        return badRequest(res, 'Transaction ID is invalid')
      }

      const deletedTransaction = await this.deleteTransactionService.execute(id)

      return ok(res, {
        message: 'Transaction deleted successfully',
        transaction: deletedTransaction,
      })
    } catch (error) {
      if (error instanceof TransactionNotFound) {
        return notFound(res, error.message)
      }
      console.log('DeleteTransactionController - ' + error)
      return internalServerError(res)
    }
  }
}

import { Request, Response } from 'express'
import { UserNotFound } from '../../errors/user.ts'
import { badRequest, internalServerError, ok } from '../helpers/index.ts'
import { isUUID, isValidCurrency } from '../helpers/index.ts'
import { UpdateTransactionService } from '../../services/transactions/update-transaction-service.ts'
import { checkIfTransactionTypeIsValid } from '../helpers/transaction-helper.ts'

export class UpdateTransactionController {
  constructor(private updateTransactionService: UpdateTransactionService) {
    this.updateTransactionService = updateTransactionService
  }

  async execute(req: Request, res: Response) {
    try {
      const { name, date, amount, type } = req.body
      const { id } = req.params

      if (!isUUID(id)) {
        return badRequest(res, 'Transaction ID is invalid')
      }

      if (!name && !date && !amount && !type) {
        return badRequest(res, 'No data to update')
      }

      if (type && !checkIfTransactionTypeIsValid(type)) {
        return badRequest(
          res,
          'Invalid transaction type. Must be EARNING, EXPENSE, or INVESTMENT',
        )
      }

      if (amount !== undefined && !isValidCurrency(amount)) {
        return badRequest(res, 'Invalid amount format')
      }

      const typeUpperCase = type ? type.toUpperCase() : undefined

      const updatedTransaction = await this.updateTransactionService.execute(
        id,
        {
          name,
          date,
          amount,
          type: typeUpperCase,
        },
      )

      return ok(res, updatedTransaction)
    } catch (error) {
      if (error instanceof UserNotFound) {
        return badRequest(res, error.message)
      }
      console.log('UpdateTransactionController - ' + error)
      return internalServerError(res)
    }
  }
}

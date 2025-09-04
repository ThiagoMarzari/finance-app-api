import { Request, Response } from 'express'
import { UserNotFound } from '../../errors/user.ts'
import { badRequest, created, internalServerError } from '../helpers/index.ts'
import { isUUID, isValidCurrency } from '../helpers/index.ts'
import { CreateTransactionService } from '../../services/transactions/create-transaction-service.ts'

enum TransactionType {
  EARNING = 'EARNING',
  EXPENSE = 'EXPENSE',
  INVESTMENT = 'INVESTMENT',
}

export class CreateTransactionController {
  constructor(private createTransactionService: CreateTransactionService) {
    this.createTransactionService = createTransactionService
  }
  async execute(req: Request, res: Response) {
    const { user_id, name, date, amount, type } = req.body
    console.log('CreateTransactionController - ' + JSON.stringify(req.body))
    try {
      if (
        !user_id?.trim() ||
        !name?.trim() ||
        !date?.trim() ||
        !amount ||
        !type?.trim()
      ) {
        return badRequest(
          res,
          'All fields are required: user_id, name, date, amount, type',
        )
      }

      if (!isUUID(user_id)) {
        return badRequest(res, 'Invalid user_id format')
      }

      const typeUpperCase = type.toUpperCase() as TransactionType

      if (!Object.values(TransactionType).includes(typeUpperCase)) {
        return badRequest(
          res,
          'Invalid transaction type. Must be EARNING, EXPENSE, or INVESTMENT',
        )
      }

      if (!isValidCurrency(amount)) {
        return badRequest(res, 'Invalid amount format')
      }

      const createdTransaction = await this.createTransactionService.execute({
        userId: user_id,
        name,
        date,
        amount,
        type: typeUpperCase,
      })

      return created(res, createdTransaction)
    } catch (error) {
      if (error instanceof UserNotFound) {
        return badRequest(res, error.message)
      }
      console.log('CreateTransactionController - ' + error)
      return internalServerError(res)
    }
  }
}

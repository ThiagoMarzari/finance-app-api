import { Request, Response } from 'express'
import { UserNotFound } from '../../errors/user.ts'
import {
  badRequest,
  created,
  internalServerError,
  notFound,
} from '../helpers/index.ts'
import { CreateTransactionService } from '../../services/transactions/create-transaction-service.ts'
import {
  createTransactionSchema,
  TransactionTypeEnum,
} from '../../schemas/index.ts'
import { ZodError } from 'zod'

export class CreateTransactionController {
  constructor(private createTransactionService: CreateTransactionService) {
    this.createTransactionService = createTransactionService
  }
  async execute(req: Request, res: Response) {
    try {
      const { user_id, name, date, amount, type } =
        createTransactionSchema.parse(req.body)
      const createdTransaction = await this.createTransactionService.execute({
        userId: user_id,
        name,
        date: date.toISOString(),
        amount,
        type: type as TransactionTypeEnum,
      })

      return created(res, createdTransaction)
    } catch (error) {
      if (error instanceof ZodError) {
        return badRequest(res, error.issues[0].message)
      }
      if (error instanceof UserNotFound) {
        return notFound(res, error.message)
      }
      console.log('CreateTransactionController - ' + error)
      return internalServerError(res)
    }
  }
}

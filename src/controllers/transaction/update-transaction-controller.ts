import { Request, Response } from 'express'
import { UserNotFound } from '../../errors/user.ts'
import {
  badRequest,
  internalServerError,
  notFound,
  ok,
} from '../helpers/index.ts'
import { isUUID } from '../helpers/index.ts'
import { UpdateTransactionService } from '../../services/transactions/update-transaction-service.ts'
import {
  TransactionTypeEnum,
  updateTransactionSchema,
} from '../../schemas/transaction.ts'
import { ZodError } from 'zod'

export class UpdateTransactionController {
  constructor(private updateTransactionService: UpdateTransactionService) {
    this.updateTransactionService = updateTransactionService
  }

  async execute(req: Request, res: Response) {
    try {
      // Se body está vazio, retorna 400
      if (!req.body || Object.keys(req.body).length === 0) {
        return badRequest(res, 'At least one field must be provided to update')
      }

      const { id } = req.params
      if (!isUUID(id)) {
        return badRequest(res, 'Transaction ID is invalid')
      }

      // Faz o parse e validação
      const { name, date, amount, type } = updateTransactionSchema.parse(
        req.body,
      )

      // Passa a data como string original (igual ao mock/teste)
      const updatedTransaction = await this.updateTransactionService.execute(
        id,
        {
          name,
          date: date ? req.body.date : undefined,
          amount,
          type: type as TransactionTypeEnum,
        },
      )

      return ok(res, updatedTransaction)
    } catch (error) {
      if (error instanceof ZodError) {
        return badRequest(res, error.issues[0].message)
      }
      if (error instanceof UserNotFound) {
        return notFound(res, error.message)
      }
      console.log('UpdateTransactionController - ' + error)
      return internalServerError(res)
    }
  }
}

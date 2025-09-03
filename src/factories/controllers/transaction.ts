import { CreateTransactionController } from '../../controllers/index.ts'
import {
  CreateTransactionRepository,
  GetUserByIdRepository,
} from '../../repositories/index.ts'
import { CreateTransactionService } from '../../services/index.ts'

//------------------------------------------------//
export const makeCreateTransactionController = () => {
  const createTransactionRepository = new CreateTransactionRepository()
  const getUserByIdRepository = new GetUserByIdRepository()
  const createTransactionService = new CreateTransactionService(
    createTransactionRepository,
    getUserByIdRepository,
  )
  const createTransactionController = new CreateTransactionController(
    createTransactionService,
  )

  return createTransactionController
}

import {
  CreateTransactionController,
  GetTransactionByUserIdController,
} from '../../controllers/index.ts'
import {
  CreateTransactionRepository,
  GetTransactionByUserRepository,
  GetUserByIdRepository,
} from '../../repositories/index.ts'
import {
  CreateTransactionService,
  GetTransactionByUserIdService,
} from '../../services/index.ts'

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

export const makeGetTransactionByUserIdController = () => {
  const getTransactionByUserIdRepository = new GetTransactionByUserRepository()
  const getUserByIdRepository = new GetUserByIdRepository()

  const getTransactionByUserIdService = new GetTransactionByUserIdService(
    getTransactionByUserIdRepository,
    getUserByIdRepository,
  )
  const getTransactionByUserIdController = new GetTransactionByUserIdController(
    getTransactionByUserIdService,
  )

  return getTransactionByUserIdController
}

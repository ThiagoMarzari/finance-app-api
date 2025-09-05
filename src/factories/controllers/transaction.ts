import {
  CreateTransactionController,
  GetTransactionByUserIdController,
  UpdateTransactionController,
} from '../../controllers/index.ts'
import {
  CreateTransactionRepository,
  GetTransactionByUserRepository,
  GetUserByIdRepository,
  UpdateTransactionRepository,
} from '../../repositories/index.ts'
import {
  CreateTransactionService,
  GetTransactionByUserIdService,
  UpdateTransactionService,
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

export const makeUpdateTransactionController = () => {
  const updateTransactionRepository = new UpdateTransactionRepository()
  const updateTransactionService = new UpdateTransactionService(
    updateTransactionRepository,
  )
  const updateTransactionController = new UpdateTransactionController(
    updateTransactionService,
  )

  return updateTransactionController
}

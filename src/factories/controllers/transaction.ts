import { UuidGeneratorAdapter } from '../../adapters/uuid-generator-adapter.ts'
import {
  CreateTransactionController,
  DeleteTransactionController,
  GetTransactionByUserIdController,
  UpdateTransactionController,
} from '../../controllers/index.ts'
import {
  CreateTransactionRepository,
  DeleteTransactionRepository,
  GetTransactionByUserRepository,
  GetUserByIdRepository,
  UpdateTransactionRepository,
} from '../../repositories/index.ts'
import {
  CreateTransactionService,
  DeleteTransactionService,
  GetTransactionByUserIdService,
  UpdateTransactionService,
} from '../../services/index.ts'

//------------------------------------------------//
export const makeCreateTransactionController = () => {
  const createTransactionRepository = new CreateTransactionRepository()
  const getUserByIdRepository = new GetUserByIdRepository()
  const uuidGeneratorAdapter = new UuidGeneratorAdapter()
  const createTransactionService = new CreateTransactionService(
    createTransactionRepository,
    getUserByIdRepository,
    uuidGeneratorAdapter,
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

export const makeDeleteTransactionController = () => {
  const deleteTransactionRepository = new DeleteTransactionRepository()
  const deleteTransactionService = new DeleteTransactionService(
    deleteTransactionRepository,
  )
  const deleteTransactionController = new DeleteTransactionController(
    deleteTransactionService,
  )

  return deleteTransactionController
}

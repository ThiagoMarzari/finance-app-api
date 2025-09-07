import {
  CreateUserController,
  DeleteUserController,
  GetUserByIdController,
  GetUserBalanceController,
  UpdateUserController,
} from '../../controllers/index.ts'
import {
  CreateUserRepository,
  DeleteUserRepository,
  GetUserByEmailRepository,
  GetUserByIdRepository,
  GetUserBalanceRepository,
  UpdateUserRepository,
} from '../../repositories/index.ts'
import {
  CreateUserService,
  DeleteUserService,
  GetUserByIdService,
  GetUserBalanceService,
  UpdateUserService,
} from '../../services/index.ts'

//------------------------------------------------//
export const makeGetUserByIdController = () => {
  const getUserByIdRepository = new GetUserByIdRepository()
  const getUserByidService = new GetUserByIdService(getUserByIdRepository)
  const getUserByIdController = new GetUserByIdController(getUserByidService)

  return getUserByIdController
}

export const makeCreateUserController = () => {
  const createUserRepository = new CreateUserRepository()
  const createUserService = new CreateUserService(createUserRepository)
  const createUserController = new CreateUserController(createUserService)

  return createUserController
}

export const makeUpdateUserController = () => {
  const updateUserRepository = new UpdateUserRepository()
  const getUserByEmailRepository = new GetUserByEmailRepository()
  const getUserByIdRepository = new GetUserByIdRepository()
  const updateUserService = new UpdateUserService(
    updateUserRepository,
    getUserByEmailRepository,
    getUserByIdRepository,
  )
  const updateUserController = new UpdateUserController(updateUserService)

  return updateUserController
}
export const makeDeleteUserController = () => {
  const deleteUserRepository = new DeleteUserRepository()
  const deleteUserService = new DeleteUserService(deleteUserRepository)
  const deleteUserController = new DeleteUserController(deleteUserService)

  return deleteUserController
}

export const makeGetUserBalanceController = () => {
  const getUserBalanceRepository = new GetUserBalanceRepository()
  const getUserByIdRepository = new GetUserByIdRepository()
  const getUserBalanceService = new GetUserBalanceService(
    getUserBalanceRepository,
    getUserByIdRepository,
  )
  const getUserBalanceController = new GetUserBalanceController(
    getUserBalanceService,
  )

  return getUserBalanceController
}

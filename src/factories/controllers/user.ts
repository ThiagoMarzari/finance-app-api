import {
  PasswordHasherAdapter,
  UuidGeneratorAdapter,
} from '../../adapters/index.ts'
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
  const createUserService = new CreateUserService(
    new CreateUserRepository(),
    new GetUserByEmailRepository(),
    new PasswordHasherAdapter(),
    new UuidGeneratorAdapter(),
  )
  const createUserController = new CreateUserController(createUserService)

  return createUserController
}

export const makeUpdateUserController = () => {
  const updateUserService = new UpdateUserService(
    new UpdateUserRepository(),
    new GetUserByEmailRepository(),
    new GetUserByIdRepository(),
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
  const getUserBalanceService = new GetUserBalanceService(
    new GetUserBalanceRepository(),
    new GetUserByIdRepository(),
  )
  const getUserBalanceController = new GetUserBalanceController(
    getUserBalanceService,
  )

  return getUserBalanceController
}

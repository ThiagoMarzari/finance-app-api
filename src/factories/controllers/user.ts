import { GetUserByIdController } from '../../controllers/index.ts'
import { GetUserByIdRepository } from '../../repositories/index.ts'
import { GetUserByIdService } from '../../services/index.ts'

export const makeGetUserByIdController = () => {
  const getUserByIdRepository = new GetUserByIdRepository()
  const getUserByidService = new GetUserByIdService(getUserByIdRepository)
  const getUserByIdController = new GetUserByIdController(getUserByidService)

  return getUserByIdController
}

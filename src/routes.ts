import { Request, Response, Router } from 'express'
import {
  CreateUserController,
  DeleteUserController,
  GetUserByIdController,
  UpdateUserController,
} from './controllers/index.ts'
import { GetUserByIdService } from './services/index.ts'
import { GetUserByIdRepository } from './repositories/index.ts'

export const router = Router()

//-- ROTAS USER --//
router.post('/api/users', new CreateUserController().execute)
router.get('/api/users/:id', async (req: Request, res: Response) => {
  const getUserByIdRepository = new GetUserByIdRepository()
  const getUserByidService = new GetUserByIdService(getUserByIdRepository)
  const getUserByIdController = new GetUserByIdController(getUserByidService)

  await getUserByIdController.execute(req, res)
})
router.patch('/api/users/:id', new UpdateUserController().execute)
router.delete('/api/users/:id', new DeleteUserController().execute)

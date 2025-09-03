import { Request, Response, Router } from 'express'
import {
  CreateUserController,
  DeleteUserController,
} from './controllers/index.ts'
import { CreateUserService, DeleteUserService } from './services/index.ts'
import {
  CreateUserRepository,
  DeleteUserRepository,
} from './repositories/index.ts'
import {
  makeGetUserByIdController,
  makeUpdateUserController,
} from './factories/controllers/user.ts'

export const router = Router()

//-- ROTAS USER --//
router.post('/api/users', async (req: Request, res: Response) => {
  const createUserRepository = new CreateUserRepository()
  const createUserService = new CreateUserService(createUserRepository)
  const createUserController = new CreateUserController(createUserService)

  await createUserController.execute(req, res)
})
router.get('/api/users/:id', async (req: Request, res: Response) => {
  const getUserByIdController = makeGetUserByIdController()

  await getUserByIdController.execute(req, res)
})
router.patch('/api/users/:id', async (req: Request, res: Response) => {
  const updateUserController = makeUpdateUserController()

  await updateUserController.execute(req, res)
})
router.delete('/api/users/:id', async (req: Request, res: Response) => {
  const deleteUserRepository = new DeleteUserRepository()
  const deleteUserService = new DeleteUserService(deleteUserRepository)
  const deleteUserController = new DeleteUserController(deleteUserService)

  await deleteUserController.execute(req, res)
})

import { Request, Response, Router } from 'express'
import {
  CreateUserController,
  DeleteUserController,
  UpdateUserController,
} from './controllers/index.ts'
import {
  CreateUserService,
  DeleteUserService,
  UpdateUserService,
} from './services/index.ts'
import {
  CreateUserRepository,
  DeleteUserRepository,
  GetUserByEmailRepository,
  UpdateUserRepository,
} from './repositories/index.ts'
import { makeGetUserByIdController } from './factories/controllers/user.ts'

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
  const updateUserRepository = new UpdateUserRepository()
  const getUserByEmailRepository = new GetUserByEmailRepository()
  const updateUserService = new UpdateUserService(
    updateUserRepository,
    getUserByEmailRepository,
  )
  const updateUserController = new UpdateUserController(updateUserService)

  await updateUserController.execute(req, res)
})
router.delete('/api/users/:id', async (req: Request, res: Response) => {
  const deleteUserRepository = new DeleteUserRepository()
  const deleteUserService = new DeleteUserService(deleteUserRepository)
  const deleteUserController = new DeleteUserController(deleteUserService)

  await deleteUserController.execute(req, res)
})

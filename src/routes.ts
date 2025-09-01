import { Router } from 'express'
import { CreateUserController } from './controllers/user/create-user-controller.ts'
import { GetUserByIdController } from './controllers/user/get-user-by-id-controller.ts'
import { UpdateUserController } from './controllers/user/update-user-controller.ts'

export const router = Router()

//-- ROTAS USER --//
router.post('/api/users', new CreateUserController().execute)
router.get('/api/users/:id', new GetUserByIdController().execute)
router.patch('/api/users/:id', new UpdateUserController().execute)

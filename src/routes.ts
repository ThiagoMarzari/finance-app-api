import { Router } from 'express'
import {
  CreateUserController,
  DeleteUserController,
  GetUserByIdController,
  UpdateUserController,
} from './controllers/index.ts'

export const router = Router()

//-- ROTAS USER --//
router.post('/api/users', new CreateUserController().execute)
router.get('/api/users/:id', new GetUserByIdController().execute)
router.patch('/api/users/:id', new UpdateUserController().execute)
router.delete('/api/users/:id', new DeleteUserController().execute)

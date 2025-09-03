import { Request, Response, Router } from 'express'

import {
  makeCreateTransactionController,
  makeCreateUserController,
  makeDeleteUserController,
  makeGetUserByIdController,
  makeUpdateUserController,
} from './factories/index.ts'

export const router = Router()
//-- ROTAS USER --//
router.post('/api/users', async (req: Request, res: Response) => {
  const createUserController = makeCreateUserController()

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
  const deleteUserController = makeDeleteUserController()

  await deleteUserController.execute(req, res)
})

//-- ROTAS TRANSACTION --//
router.post('/api/transactions', async (req: Request, res: Response) => {
  const createTransactionController = makeCreateTransactionController()

  await createTransactionController.execute(req, res)
})

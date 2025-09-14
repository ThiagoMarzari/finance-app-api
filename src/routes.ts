import { Request, Response, Router } from 'express'

import {
  makeCreateTransactionController,
  makeCreateUserController,
  makeDeleteTransactionController,
  makeDeleteUserController,
  makeGetTransactionByUserIdController,
  makeGetUserByIdController,
  makeGetUserBalanceController,
  makeUpdateTransactionController,
  makeUpdateUserController,
} from './factories/index.ts'

export const router = Router()
//-- ROTAS USER --//
router.post('/api/users', async (req: Request, res: Response) => {
  await makeCreateUserController().execute(req, res)
})

router.get('/api/users/:id', async (req: Request, res: Response) => {
  await makeGetUserByIdController().execute(req, res)
})

router.patch('/api/users/:id', async (req: Request, res: Response) => {
  await makeUpdateUserController().execute(req, res)
})

router.delete('/api/users/:id', async (req: Request, res: Response) => {
  await makeDeleteUserController().execute(req, res)
})

router.get(
  '/api/users/:userId/balance',
  async (req: Request, res: Response) => {
    await makeGetUserBalanceController().execute(req, res)
  },
)

//-- ROTAS TRANSACTION --//
router.post('/api/transactions', async (req: Request, res: Response) => {
  await makeCreateTransactionController().execute(req, res)
})

router.get('/api/transactions/', async (req: Request, res: Response) => {
  await makeGetTransactionByUserIdController().execute(req, res)
})

router.patch('/api/transactions/:id', async (req: Request, res: Response) => {
  await makeUpdateTransactionController().execute(req, res)
})

router.delete('/api/transactions/:id', async (req: Request, res: Response) => {
  await makeDeleteTransactionController().execute(req, res)
})

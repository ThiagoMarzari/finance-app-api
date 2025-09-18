import { CreateTransactionController } from '../../../src/controllers/index'
import { UserNotFound } from '../../../src/errors/user'
import { CreateTransactionService } from '../../../src/services/index'
import { Request, Response } from 'express'

describe('CreateTransactionController', () => {
  let createTransactionController: CreateTransactionController
  let fakeService: { execute: jest.Mock }
  let request: Partial<Request>
  let response: Partial<Response>

  beforeEach(() => {
    request = {
      body: {
        user_id: '78b1cbd6-5154-4af3-b2fa-1be9a8bbdd1e',
        name: 'Transaction 1',
        date: '2021-01-01',
        amount: 100,
        type: 'EARNING',
      },
    }
    response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }

    const service = { execute: jest.fn() }
    const sut = new CreateTransactionController(
      service as unknown as CreateTransactionService,
    )
    createTransactionController = sut
    fakeService = service
  })

  it('should return status 201 when creating transaction', async () => {
    await createTransactionController.execute(
      request as Request,
      response as Response,
    )
    expect(response.status).toHaveBeenCalledWith(201)
  })

  it('should return status 404 when user not found', async () => {
    fakeService.execute.mockRejectedValueOnce(new UserNotFound())
    await createTransactionController.execute(
      request as Request,
      response as Response,
    )
    expect(response.status).toHaveBeenCalledWith(404)
  })

  it('should return status 500 if occurs internal server error', async () => {
    fakeService.execute.mockRejectedValueOnce(new Error('any_error'))
    await createTransactionController.execute(
      request as Request,
      response as Response,
    )
    expect(response.status).toHaveBeenCalledWith(500)
  })

  it('should return status 400 if request body is empty', async () => {
    request.body = {}
    await createTransactionController.execute(
      request as Request,
      response as Response,
    )
    expect(response.status).toHaveBeenCalledWith(400)
  })

  it('should call CreateTransactionService with correct values', async () => {
    await createTransactionController.execute(
      request as Request,
      response as Response,
    )

    expect(fakeService.execute).toHaveBeenCalledWith({
      userId: '78b1cbd6-5154-4af3-b2fa-1be9a8bbdd1e',
      name: 'Transaction 1',
      date: new Date('2021-01-01').toISOString(),
      amount: 100,
      type: 'EARNING',
    })
  })
})

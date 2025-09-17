import { GetTransactionByUserIdService } from '../../../src/services'
import { GetTransactionByUserIdController } from '../../../src/controllers'
import { Request, Response } from 'express'
import { UserNotFound } from '../../../src/errors/user'

describe('GetTransactionByUserIdController', () => {
  let getTransactionByUserIdController: GetTransactionByUserIdController
  let fakeService: { execute: jest.Mock }
  let request: Partial<Request>
  let response: Partial<Response>

  const mock = {
    id: '78b1cbd6-5154-4af3-b2fa-1be9a8bbdd1e',
    user_id: '78b1cbd6-5154-4af3-b2fa-1be9a8bbdd1e',
    name: 'Transaction 1',
    date: '2021-01-01',
    amount: 100,
    type: 'EARNING',
  }

  beforeEach(() => {
    request = {
      query: {
        userId: '78b1cbd6-5154-4af3-b2fa-1be9a8bbdd1e',
      },
    }
    response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }
    const service = { execute: jest.fn() }
    const sut = new GetTransactionByUserIdController(
      service as unknown as GetTransactionByUserIdService,
    )
    getTransactionByUserIdController = sut
    fakeService = service
  })

  it('should return status 200 when fetching transactions successfully', async () => {
    fakeService.execute.mockResolvedValue([mock])
    await getTransactionByUserIdController.execute(
      request as Request,
      response as Response,
    )
    expect(response.status).toHaveBeenCalledWith(200)
  })

  it('should return status 400 if user ID is missing', async () => {
    request.query = {}
    await getTransactionByUserIdController.execute(
      request as Request,
      response as Response,
    )
    expect(response.status).toHaveBeenCalledWith(400)
  })

  it('should return status 400 if user ID is invalid', async () => {
    request.query = { userId: 'invalid-uuid' }

    await getTransactionByUserIdController.execute(
      request as Request,
      response as Response,
    )
    expect(response.status).toHaveBeenCalledWith(400)
  })

  it('should return status 404 if user not found', async () => {
    fakeService.execute.mockRejectedValueOnce(new UserNotFound())
    await getTransactionByUserIdController.execute(
      request as Request,
      response as Response,
    )
    expect(response.status).toHaveBeenCalledWith(404)
  })

  it('should return status 500 on internal server error', async () => {
    fakeService.execute.mockRejectedValueOnce(new Error('any_error'))
    await getTransactionByUserIdController.execute(
      request as Request,
      response as Response,
    )
    expect(response.status).toHaveBeenCalledWith(500)
  })
})

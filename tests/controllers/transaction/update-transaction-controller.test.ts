import { UpdateTransactionService } from '../../../src/services'
import { UpdateTransactionController } from '../../../src/controllers'
import { UserNotFound } from '../../../src/errors/user'
import { Request, Response } from 'express'

describe('UpdateTransactionController', () => {
  let updateTransactionController: UpdateTransactionController
  let fakeService: { execute: jest.Mock }
  let request: Partial<Request>
  let response: Partial<Response>

  const mockUpdatedTransaction = {
    id: '78b1cbd6-5154-4af3-b2fa-1be9a8bbdd1e',
    user_id: '78b1cbd6-5154-4af3-b2fa-1be9a8bbdd1e',
    name: 'Updated Transaction',
    date: '2021-01-02',
    amount: 200,
    type: 'EXPENSE',
  }

  beforeEach(() => {
    request = {
      params: {
        id: '78b1cbd6-5154-4af3-b2fa-1be9a8bbdd1e',
      },
      body: {
        name: 'Updated Transaction',
        date: '2021-01-02',
        amount: 200,
        type: 'EXPENSE',
      },
    }
    response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }
    const service = { execute: jest.fn() }
    const sut = new UpdateTransactionController(
      service as unknown as UpdateTransactionService,
    )
    updateTransactionController = sut
    fakeService = service
  })

  it('should return status 200 when updating transaction successfully', async () => {
    fakeService.execute.mockResolvedValue(mockUpdatedTransaction)

    await updateTransactionController.execute(
      request as Request,
      response as Response,
    )

    expect(response.status).toHaveBeenCalledWith(200)
  })

  it('should return status 400 if transaction ID is invalid', async () => {
    request.params = { id: 'invalid-uuid' }

    await updateTransactionController.execute(
      request as Request,
      response as Response,
    )

    expect(response.status).toHaveBeenCalledWith(400)
  })

  it('should return status 400 if no data to update', async () => {
    request.body = {}

    await updateTransactionController.execute(
      request as Request,
      response as Response,
    )

    expect(response.status).toHaveBeenCalledWith(400)
  })

  it('should return status 400 if transaction type is invalid', async () => {
    request.body.type = 'INVALID_TYPE'

    await updateTransactionController.execute(
      request as Request,
      response as Response,
    )

    expect(response.status).toHaveBeenCalledWith(400)
  })

  it('should return status 400 if amount format is invalid', async () => {
    request.body.amount = 'invalid-amount'

    await updateTransactionController.execute(
      request as Request,
      response as Response,
    )

    expect(response.status).toHaveBeenCalledWith(400)
  })

  it('should return status 400 when user not found', async () => {
    fakeService.execute.mockRejectedValueOnce(new UserNotFound())

    await updateTransactionController.execute(
      request as Request,
      response as Response,
    )

    expect(response.status).toHaveBeenCalledWith(400)
  })

  it('should return status 500 if occurs internal server error', async () => {
    fakeService.execute.mockRejectedValueOnce(new Error('any_error'))

    await updateTransactionController.execute(
      request as Request,
      response as Response,
    )

    expect(response.status).toHaveBeenCalledWith(500)
  })
})

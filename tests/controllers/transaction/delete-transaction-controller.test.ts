import { DeleteTransactionService } from '../../../src/services'
import { DeleteTransactionController } from '../../../src/controllers'
import { TransactionNotFound } from '../../../src/errors/transaction'
import { Request, Response } from 'express'

describe('DeleteTransactionController', () => {
  let deleteTransactionController: DeleteTransactionController
  let fakeService: { execute: jest.Mock }
  let request: Partial<Request>
  let response: Partial<Response>

  const mockDeletedTransaction = {
    id: '78b1cbd6-5154-4af3-b2fa-1be9a8bbdd1e',
    user_id: '78b1cbd6-5154-4af3-b2fa-1be9a8bbdd1e',
    name: 'Transaction 1',
    date: '2021-01-01',
    amount: 100,
    type: 'EARNING',
  }

  beforeEach(() => {
    request = {
      params: {
        id: '78b1cbd6-5154-4af3-b2fa-1be9a8bbdd1e',
      },
    }
    response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }
    const service = { execute: jest.fn() }
    const sut = new DeleteTransactionController(
      service as unknown as DeleteTransactionService,
    )
    deleteTransactionController = sut
    fakeService = service
  })

  it('should return status 200 when deleting transaction successfully', async () => {
    fakeService.execute.mockResolvedValue(mockDeletedTransaction)

    await deleteTransactionController.execute(
      request as Request,
      response as Response,
    )

    expect(response.status).toHaveBeenCalledWith(200)
  })

  it('should return status 400 if transaction ID is invalid', async () => {
    request.params = { id: 'invalid-uuid' }

    await deleteTransactionController.execute(
      request as Request,
      response as Response,
    )

    expect(response.status).toHaveBeenCalledWith(400)
  })

  it('should return status 404 when transaction not found', async () => {
    fakeService.execute.mockRejectedValueOnce(new TransactionNotFound())

    await deleteTransactionController.execute(
      request as Request,
      response as Response,
    )

    expect(response.status).toHaveBeenCalledWith(404)
  })

  it('should return status 500 if occurs internal server error', async () => {
    fakeService.execute.mockRejectedValueOnce(new Error('any_error'))

    await deleteTransactionController.execute(
      request as Request,
      response as Response,
    )

    expect(response.status).toHaveBeenCalledWith(500)
  })
})

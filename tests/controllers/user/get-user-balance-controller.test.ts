import { Request, Response } from 'express'
import { GetUserBalanceController } from '../../../src/controllers/user/get-user-balance-controller'
import { GetUserBalanceService } from '../../../src/services'
import { UserNotFound } from '../../../src/errors/user'

describe('GetUserBalanceController', () => {
  let getUserBalanceController: GetUserBalanceController
  let fakeService: { execute: jest.Mock }
  let request: Partial<Request>
  let response: Partial<Response>

  const mockBalance = {
    balance: '1500.00',
    totalEarnings: 5000.0,
    totalExpenses: 2500.0,
    totalInvestments: 1000.0,
  }

  beforeEach(() => {
    request = {
      params: {
        userId: '78b1cbd6-5154-4af3-b2fa-1be9a8bbdd1e',
      },
    }
    response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }

    const service = { execute: jest.fn() }
    const sut = new GetUserBalanceController(
      service as unknown as GetUserBalanceService,
    )
    getUserBalanceController = sut
    fakeService = service
  })

  it('should return status 200 when user balance is retrieved successfully', async () => {
    //arrange
    fakeService.execute.mockResolvedValue(mockBalance)

    //act
    await getUserBalanceController.execute(
      request as Request,
      response as Response,
    )

    //assert
    expect(response.status).toHaveBeenCalledWith(200)
    expect(response.json).toHaveBeenCalledWith(mockBalance)
  })

  it('should return status 400 if userId is not a valid UUID', async () => {
    //arrange
    request.params = { userId: 'invalid-uuid' }

    //act
    await getUserBalanceController.execute(
      request as Request,
      response as Response,
    )

    //assert
    expect(response.status).toHaveBeenCalledWith(400)
  })

  it('should return status 400 when user is not found', async () => {
    //arrange
    const userId = '78b1cbd6-5154-4af3-b2fa-1be9a8bbdd1e'
    fakeService.execute.mockRejectedValue(new UserNotFound(userId))

    //act
    await getUserBalanceController.execute(
      request as Request,
      response as Response,
    )

    //assert
    expect(response.status).toHaveBeenCalledWith(400)
  })

  it('should return status 500 if GetUserBalanceService throws an unexpected error', async () => {
    //arrange
    fakeService.execute.mockRejectedValue(
      new Error('Database connection error'),
    )

    //act
    await getUserBalanceController.execute(
      request as Request,
      response as Response,
    )

    //assert
    expect(response.status).toHaveBeenCalledWith(500)
  })

  it('should call GetUserBalanceService with correct userId', async () => {
    //arrange
    const userId = '78b1cbd6-5154-4af3-b2fa-1be9a8bbdd1e'
    fakeService.execute.mockResolvedValue(mockBalance)

    //act
    await getUserBalanceController.execute(
      request as Request,
      response as Response,
    )

    //assert
    expect(fakeService.execute).toHaveBeenCalledWith(userId)
    expect(fakeService.execute).toHaveBeenCalledTimes(1)
  })

  it('should log error when an exception occurs', async () => {
    //arrange
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
    const error = new Error('Test error')
    fakeService.execute.mockRejectedValue(error)

    //act
    await getUserBalanceController.execute(
      request as Request,
      response as Response,
    )

    //assert
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error getting user balance:',
      error,
    )
  })
})

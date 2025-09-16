import { Request, Response } from 'express'
import { GetUserByIdController } from '../../../src/controllers/user/get-user-by-id-controller'
import { GetUserByIdService } from '../../../src/services'

describe('GetUserByIdController', () => {
  let getUserByIdController: GetUserByIdController
  let fakeService: { execute: jest.Mock }
  let request: Partial<Request>
  let response: Partial<Response>

  const mockUser = {
    id: '78b1cbd6-5154-4af3-b2fa-1be9a8bbdd1e',
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    created_at: new Date('2024-01-01T00:00:00.000Z'),
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
    const sut = new GetUserByIdController(
      service as unknown as GetUserByIdService,
    )
    getUserByIdController = sut
    fakeService = service
  })

  it('should return status 200 when user is found successfully', async () => {
    //arrange
    fakeService.execute.mockResolvedValue(mockUser)

    //act
    await getUserByIdController.execute(
      request as Request,
      response as Response,
    )

    //assert
    expect(response.status).toHaveBeenCalledWith(200)
  })

  it('should return status 400 if id is not a valid UUID', async () => {
    //arrange
    request.params = { id: 'invalid-uuid' }

    //act
    await getUserByIdController.execute(
      request as Request,
      response as Response,
    )

    //assert
    expect(response.status).toHaveBeenCalledWith(400)
  })

  it('should return status 404 when user is not found', async () => {
    //arrange
    fakeService.execute.mockResolvedValue(null)

    //act
    await getUserByIdController.execute(
      request as Request,
      response as Response,
    )

    //assert
    expect(response.status).toHaveBeenCalledWith(404)
  })

  it('should return status 500 if GetUserByIdService throws an unexpected error', async () => {
    //arrange
    fakeService.execute.mockRejectedValue(
      new Error('Database connection error'),
    )

    //act
    await getUserByIdController.execute(
      request as Request,
      response as Response,
    )

    //assert
    expect(response.status).toHaveBeenCalledWith(500)
  })

  it('should call GetUserByIdService with correct id', async () => {
    //arrange
    const userId = '78b1cbd6-5154-4af3-b2fa-1be9a8bbdd1e'
    fakeService.execute.mockResolvedValue(mockUser)

    //act
    await getUserByIdController.execute(
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
    await getUserByIdController.execute(
      request as Request,
      response as Response,
    )

    //assert
    expect(consoleSpy).toHaveBeenCalledWith('Error getting user by id:', error)
  })

  it('should validate returned user data structure', async () => {
    //arrange
    fakeService.execute.mockResolvedValue(mockUser)

    //act
    await getUserByIdController.execute(
      request as Request,
      response as Response,
    )

    //assert
    expect(response.json).toHaveBeenCalledWith(
      expect.objectContaining({
        id: expect.any(String),
        first_name: expect.any(String),
        last_name: expect.any(String),
        email: expect.any(String),
        created_at: expect.any(Date),
      }),
    )
  })

  it('should handle empty string as invalid UUID', async () => {
    //arrange
    request.params = { id: '' }

    //act
    await getUserByIdController.execute(
      request as Request,
      response as Response,
    )

    //assert
    expect(response.status).toHaveBeenCalledWith(400)
  })

  it('should handle undefined id parameter', async () => {
    //arrange
    request.params = {}

    //act
    await getUserByIdController.execute(
      request as Request,
      response as Response,
    )

    //assert
    expect(response.status).toHaveBeenCalledWith(400)
  })
})

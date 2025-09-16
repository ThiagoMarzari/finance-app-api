import { DeleteUserService } from '../../../src/services'
import { DeleteUserController } from '../../../src/controllers'
import { Request, Response } from 'express'

describe('DeleteUserController', () => {
  let deleteUserController: DeleteUserController
  let fakeService: { execute: jest.Mock }
  let request: Partial<Request>
  let response: Partial<Response>

  const mockDeletedUser = {
    id: '78b1cbd6-5154-4af3-b2fa-1be9a8bbdd1e',
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    password: 'hashedPassword',
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
    const sut = new DeleteUserController(
      service as unknown as DeleteUserService,
    )
    deleteUserController = sut
    fakeService = service
  })

  it('should return 200 if user is deleted', async () => {
    //arrange
    fakeService.execute.mockResolvedValue(mockDeletedUser)

    //act
    await deleteUserController.execute(request as Request, response as Response)
    //assert
    expect(response.status).toHaveBeenCalledWith(200)
  })

  it('should return status 400 if UUID is invalid', async () => {
    //arrange
    request.params = { id: 'invalid-uuid' }
    //act
    await deleteUserController.execute(request as Request, response as Response)
    //assert
    expect(response.status).toHaveBeenCalledWith(400)
  })

  it('should return status 404 if user is not found', async () => {
    //arrange
    fakeService.execute.mockResolvedValue(null)
    //act
    await deleteUserController.execute(request as Request, response as Response)
    //assert
    expect(response.status).toHaveBeenCalledWith(404)
  })

  it('should return status 500 if an error occurs', async () => {
    //arrange
    fakeService.execute.mockRejectedValue(new Error('Internal server error'))
    //act
    await deleteUserController.execute(request as Request, response as Response)
    //assert
    expect(response.status).toHaveBeenCalledWith(500)
  })
})

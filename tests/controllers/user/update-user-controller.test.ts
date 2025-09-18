import { UpdateUserController } from '../../../src/controllers/index.ts'
import { EmailAlreadyExists, UserNotFound } from '../../../src/errors/user.ts'
import { UpdateUserService } from '../../../src/services/index.ts'
import { Request, Response } from 'express'

describe('UpdateUserController', () => {
  let updateUserController: UpdateUserController
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
      body: {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        password: 'Password123!@',
      },
    }

    response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }

    const service = { execute: jest.fn() }
    const sut = new UpdateUserController(
      service as unknown as UpdateUserService,
    )
    updateUserController = sut
    fakeService = service
  })

  it('should return status 200 if user is updated successfully', async () => {
    fakeService.execute.mockResolvedValue(mockUser)
    await updateUserController.execute(request as Request, response as Response)

    expect(response.status).toHaveBeenCalledWith(200)
  })

  it('should return status 400 if UUID is invalid', async () => {
    //arrange
    request.params = { id: 'invalid-uuid' }

    //act
    await updateUserController.execute(request as Request, response as Response)

    //assert
    expect(response.status).toHaveBeenCalledWith(400)
  })

  it('should return status 400 if email already exists', async () => {
    //arrange
    fakeService.execute.mockRejectedValue(
      new EmailAlreadyExists('Email already exists'),
    )

    //act
    await updateUserController.execute(request as Request, response as Response)

    //assert
    expect(response.status).toHaveBeenCalledWith(400)
  })

  it('should return status 500 if is an internalServerError', async () => {
    //arrange
    fakeService.execute.mockRejectedValue(new Error('Internal server error'))

    //act
    await updateUserController.execute(request as Request, response as Response)

    //assert
    expect(response.status).toHaveBeenCalledWith(500)
  })

  // Schema validation tests
  describe('Schema validation tests', () => {
    it('should return status 400 if first_name is not a string', async () => {
      //arrange
      request.body = { ...request.body, first_name: 123 }

      //act
      await updateUserController.execute(
        request as Request,
        response as Response,
      )

      //assert
      expect(response.status).toHaveBeenCalledWith(400)
    })

    it('should return status 400 if last_name is not a string', async () => {
      //arrange
      request.body = { ...request.body, last_name: 123 }

      //act
      await updateUserController.execute(
        request as Request,
        response as Response,
      )

      //assert
      expect(response.status).toHaveBeenCalledWith(400)
    })

    it('should return status 400 if email format is invalid', async () => {
      //arrange
      request.body = { ...request.body, email: 'invalid-email' }

      //act
      await updateUserController.execute(
        request as Request,
        response as Response,
      )

      //assert
      expect(response.status).toHaveBeenCalledWith(400)
    })

    it('should return status 400 if password is too short', async () => {
      //arrange
      request.body = { ...request.body, password: '123' }

      //act
      await updateUserController.execute(
        request as Request,
        response as Response,
      )

      //assert
      expect(response.status).toHaveBeenCalledWith(400)
    })

    it('should return status 400 if password does not contain uppercase letter', async () => {
      //arrange
      request.body = { ...request.body, password: 'password123!@' }

      //act
      await updateUserController.execute(
        request as Request,
        response as Response,
      )

      //assert
      expect(response.status).toHaveBeenCalledWith(400)
    })

    it('should return status 400 if password does not contain lowercase letter', async () => {
      //arrange
      request.body = { ...request.body, password: 'PASSWORD123!@' }

      //act
      await updateUserController.execute(
        request as Request,
        response as Response,
      )

      //assert
      expect(response.status).toHaveBeenCalledWith(400)
    })

    it('should return status 400 if password does not contain number', async () => {
      //arrange
      request.body = { ...request.body, password: 'Password!@' }

      //act
      await updateUserController.execute(
        request as Request,
        response as Response,
      )

      //assert
      expect(response.status).toHaveBeenCalledWith(400)
    })

    it('should return status 400 if password does not contain special character', async () => {
      //arrange
      request.body = { ...request.body, password: 'Password123' }

      //act
      await updateUserController.execute(
        request as Request,
        response as Response,
      )

      //assert
      expect(response.status).toHaveBeenCalledWith(400)
    })

    it('should return status 400 if body contains unknown fields', async () => {
      //arrange
      request.body = { ...request.body, unknown_field: 'value' }

      //act
      await updateUserController.execute(
        request as Request,
        response as Response,
      )

      //assert
      expect(response.status).toHaveBeenCalledWith(400)
    })

    it('should return status 400 if body is empty', async () => {
      //arrange
      request.body = {}

      //act
      await updateUserController.execute(
        request as Request,
        response as Response,
      )

      //assert
      expect(response.status).toHaveBeenCalledWith(400)
    })
  })

  // User not found tests
  describe('User not found tests', () => {
    it('should return status 404 if user is not found', async () => {
      //arrange
      fakeService.execute.mockRejectedValue(new UserNotFound('User not found'))

      //act
      await updateUserController.execute(
        request as Request,
        response as Response,
      )

      //assert
      expect(response.status).toHaveBeenCalledWith(404)
    })
  })

  // Partial update tests
  describe('Partial update tests', () => {
    it('should update only first_name when provided', async () => {
      //arrange
      request.body = { first_name: 'Jane' }
      const updatedUser = { ...mockUser, first_name: 'Jane' }
      fakeService.execute.mockResolvedValue(updatedUser)

      //act
      await updateUserController.execute(
        request as Request,
        response as Response,
      )

      //assert
      expect(response.status).toHaveBeenCalledWith(200)
    })

    it('should update only last_name when provided', async () => {
      //arrange
      request.body = { last_name: 'Smith' }
      const updatedUser = { ...mockUser, last_name: 'Smith' }
      fakeService.execute.mockResolvedValue(updatedUser)

      //act
      await updateUserController.execute(
        request as Request,
        response as Response,
      )

      //assert
      expect(response.status).toHaveBeenCalledWith(200)
    })

    it('should update only email when provided', async () => {
      //arrange
      request.body = { email: 'jane.doe@example.com' }
      const updatedUser = { ...mockUser, email: 'jane.doe@example.com' }
      fakeService.execute.mockResolvedValue(updatedUser)

      //act
      await updateUserController.execute(
        request as Request,
        response as Response,
      )

      //assert
      expect(response.status).toHaveBeenCalledWith(200)
    })

    it('should update only password when provided', async () => {
      //arrange
      request.body = { password: 'NewPassword123!@' }
      fakeService.execute.mockResolvedValue(mockUser)

      //act
      await updateUserController.execute(
        request as Request,
        response as Response,
      )

      //assert
      expect(response.status).toHaveBeenCalledWith(200)
    })
  })

  it('should call UpdateUserService with correct value', async () => {
    await updateUserController.execute(request as Request, response as Response)
    expect(fakeService.execute).toHaveBeenCalledWith(
      '78b1cbd6-5154-4af3-b2fa-1be9a8bbdd1e',
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'Password123!@',
      },
    )
  })
})

import { Request, Response } from 'express'
import { CreateUserController } from '../../../src/controllers/user/create-user-controller'
import { CreateUserService } from '../../../src/services'
import { EmailAlreadyExists } from '../../../src/errors/user'

describe('CreateUserController', () => {
  it('should return status 201 when user is created', async () => {
    //arrange - Preparacao
    const fakeService = {
      execute: jest.fn().mockResolvedValue({
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'Password123!',
      }),
    }

    //Controller real
    const createUserController = new CreateUserController(
      fakeService as unknown as CreateUserService,
    )

    //fake request
    const fakeRequest = {
      body: {
        first_name: 'John',
        last_name: 'Doee',
        email: 'john.doe@example.com',
        password: 'Password123!',
      },
    } as Partial<Request>

    //fake response
    const fakeResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response>

    //ACT - Acao

    await createUserController.execute(
      fakeRequest as Request,
      fakeResponse as Response,
    )

    //Assert - Verificacao
    expect(fakeResponse.status).toHaveBeenCalledWith(201)
  })

  it('should return status 400 if firstName is empty', async () => {
    //arrange
    const fakerService = {
      execute: jest.fn(),
    }
    const createUserController = new CreateUserController(
      fakerService as unknown as CreateUserService,
    )
    const request = {
      body: {
        first_name: '',
        last_name: 'Doee',
        email: 'john.doe@example.com',
        password: 'Password123!',
      },
    } as Partial<Request>
    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response>
    //act
    await createUserController.execute(request as Request, response as Response)
    //assert
    expect(response.status).toHaveBeenCalledWith(400)
  })
  it('should return 500 if CreateUserService throws', async () => {
    //arrange
    const fakerService = {
      execute: jest.fn().mockRejectedValue(new Error('Error')),
    }
    const createUserController = new CreateUserController(
      fakerService as unknown as CreateUserService,
    )
    const request = {
      body: {
        first_name: 'John',
        last_name: 'Doee',
        email: 'john.doe@example.com',
        password: 'Password123!',
      },
    } as Partial<Request>
    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response>

    //act
    await createUserController.execute(request as Request, response as Response)
    //assert
    expect(response.status).toHaveBeenCalledWith(500)
  })

  it('should return 500 if CreateUserService throws EmailIsAlreadyInUse Error', async () => {
    //arrange
    const fakerService = {
      execute: jest
        .fn()
        .mockRejectedValue(new EmailAlreadyExists('Email already exists')),
    }
    const createUserController = new CreateUserController(
      fakerService as unknown as CreateUserService,
    )
    const request = {
      body: {
        first_name: 'John',
        last_name: 'Doee',
        email: 'john.doe@example.com',
        password: 'Password123!',
      },
    } as Partial<Request>
    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response>
    //act
    await createUserController.execute(request as Request, response as Response)
    //assert
    expect(response.status).toHaveBeenCalledWith(400)
  })
})

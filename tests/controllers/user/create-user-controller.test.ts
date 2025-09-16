import { Request, Response } from 'express'
import { CreateUserController } from '../../../src/controllers/user/create-user-controller'
import { CreateUserService } from '../../../src/services'
import { EmailAlreadyExists } from '../../../src/errors/user'

describe('CreateUserController', () => {
  const makeSut = () => {
    const service = {
      execute: jest.fn(),
    }
    const sut = new CreateUserController(
      service as unknown as CreateUserService,
    )

    return {
      fakerService: service,
      createUserController: sut,
    }
  }

  it('should return status 201 when user is created', async () => {
    //arrange - Preparacao
    const { createUserController } = makeSut()

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
    const { createUserController } = makeSut()
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
    const { createUserController, fakerService } = makeSut()
    fakerService.execute.mockRejectedValue(new Error('Error'))
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
    const { createUserController, fakerService } = makeSut()
    fakerService.execute.mockRejectedValue(
      new EmailAlreadyExists('Email already exists'),
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

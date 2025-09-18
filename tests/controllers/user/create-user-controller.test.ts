import { Request, Response } from 'express'
import { CreateUserController } from '../../../src/controllers/user/create-user-controller'
import { CreateUserService } from '../../../src/services'
import { EmailAlreadyExists } from '../../../src/errors/user'

describe('CreateUserController', () => {
  let createUserController: CreateUserController
  let fakeService: { execute: jest.Mock }
  let request: Partial<Request>
  let response: Partial<Response>

  beforeEach(() => {
    request = {
      body: {
        first_name: 'John',
        last_name: 'Doee',
        email: 'john.doe@example.com',
        password: 'Password123!',
      },
    }
    response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }

    const service = { execute: jest.fn() }
    const sut = new CreateUserController(
      service as unknown as CreateUserService,
    )
    createUserController = sut
    fakeService = service
  })

  it('should return status 201 when user is created', async () => {
    //ACT - Acao
    await createUserController.execute(request as Request, response as Response)
    //Assert - Verificacao
    expect(response.status).toHaveBeenCalledWith(201)
  })

  it('should return status 400 if firstName is empty', async () => {
    //arrange
    request.body.first_name = ''
    //act
    await createUserController.execute(request as Request, response as Response)
    //assert
    expect(response.status).toHaveBeenCalledWith(400)
  })
  it('should return status 400 if password is invalid', async () => {
    //arrange
    request.body.password = '12345678'
    //act
    await createUserController.execute(request as Request, response as Response)
    //assert
    expect(response.status).toHaveBeenCalledWith(400)
  })
  it('should return 500 if CreateUserService throws', async () => {
    //arrange
    fakeService.execute.mockRejectedValue(new Error('Error'))

    //act
    await createUserController.execute(request as Request, response as Response)
    //assert
    expect(response.status).toHaveBeenCalledWith(500)
  })

  it('should return 400 if CreateUserService throws EmailIsAlreadyInUse Error', async () => {
    fakeService.execute.mockRejectedValue(
      new EmailAlreadyExists('Email already exists'),
    )
    await createUserController.execute(request as Request, response as Response)
    expect(response.status).toHaveBeenCalledWith(400)
  })

  it('should call CreateUserService with correct values', async () => {
    await createUserController.execute(request as Request, response as Response)

    expect(fakeService.execute).toHaveBeenCalledWith({
      firstName: 'John',
      lastName: 'Doee',
      email: 'john.doe@example.com',
      password: 'Password123!',
    })
  })
})

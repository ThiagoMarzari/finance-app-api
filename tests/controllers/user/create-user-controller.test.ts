import { Request, Response } from 'express'
import { CreateUserController } from '../../../src/controllers/user/create-user-controller'
import { CreateUserService } from '../../../src/services'

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
})

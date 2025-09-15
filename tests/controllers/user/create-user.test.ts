import { CreateUserController } from '../../../src/controllers/user/create-user-controller'
import { Request, Response } from 'express'
import { CreateUserService } from '../../../src/services/user/create-user-service'

let createUserServiceMock: {
  execute: jest.Mock
}

describe('CreateUserController', () => {
  let createUserController: CreateUserController
  let req: Partial<Request>
  let res: Partial<Response>

  beforeEach(() => {
    createUserServiceMock = {
      execute: jest.fn().mockResolvedValue({
        id: 'any_uuid',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        createdAt: new Date(),
      }),
    }

    createUserController = new CreateUserController(
      createUserServiceMock as unknown as CreateUserService,
    )

    req = {
      body: {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        password: 'Password123!',
      },
    }

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return 201 and the created user on success', async () => {
    await createUserController.execute(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        firstName: 'John',
      }),
    )
    expect(createUserServiceMock.execute).toHaveBeenCalledWith({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'Password123!',
    })
  })
})

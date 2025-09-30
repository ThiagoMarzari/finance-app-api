import { CreateUserService } from '../../../src/services/user/create-user-service'
import {
  CreateUserRepository,
  GetUserByEmailRepository,
} from '../../../src/repositories/index'
import {
  PasswordHasherAdapter,
  UuidGeneratorAdapter,
} from '../../../src/adapters/index'
import { EmailAlreadyExists } from '../../../src/errors/user'

describe('CreateUserService', () => {
  let createUserService: CreateUserService
  let fakeCreateUserRepository: { execute: jest.Mock }
  let fakeGetUserByEmailRepository: { execute: jest.Mock }
  let fakePasswordHasherAdapter: { execute: jest.Mock }
  let fakeUuidGeneratorAdapter: { execute: jest.Mock }
  let userData: {
    firstName: string
    lastName: string
    email: string
    password: string
  }

  beforeEach(() => {
    userData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'Password123!',
    }

    fakeCreateUserRepository = { execute: jest.fn() }
    fakeGetUserByEmailRepository = { execute: jest.fn() }
    fakePasswordHasherAdapter = { execute: jest.fn() }
    fakeUuidGeneratorAdapter = { execute: jest.fn() }

    const sut = new CreateUserService(
      fakeCreateUserRepository as unknown as CreateUserRepository,
      fakeGetUserByEmailRepository as unknown as GetUserByEmailRepository,
      fakePasswordHasherAdapter as unknown as PasswordHasherAdapter,
      fakeUuidGeneratorAdapter as unknown as UuidGeneratorAdapter,
    )
    createUserService = sut
  })

  it('should successfully create a user', async () => {
    // Arrange
    const mockUserId = 'mock-uuid-123'
    const mockHashedPassword = 'hashed-password-123'
    const mockCreatedUser = {
      id: mockUserId,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: mockHashedPassword,
    }

    fakeGetUserByEmailRepository.execute.mockResolvedValue(null)
    fakeUuidGeneratorAdapter.execute.mockReturnValue(mockUserId)
    fakePasswordHasherAdapter.execute.mockResolvedValue(mockHashedPassword)
    fakeCreateUserRepository.execute.mockResolvedValue(mockCreatedUser)

    // Act
    const result = await createUserService.execute(userData)

    // Assert
    expect(result).toEqual(mockCreatedUser)
    expect(fakeGetUserByEmailRepository.execute).toHaveBeenCalledWith(
      userData.email,
    )
    expect(fakeUuidGeneratorAdapter.execute).toHaveBeenCalled()
    expect(fakePasswordHasherAdapter.execute).toHaveBeenCalledWith(
      userData.password,
    )
    expect(fakeCreateUserRepository.execute).toHaveBeenCalledWith({
      id: mockUserId,
      firstName: userData.firstName.trim(),
      lastName: userData.lastName.trim(),
      email: userData.email.trim(),
      password: mockHashedPassword,
    })
  })

  it('should throw EmailAlreadyExists when email is already in use', async () => {
    // Arrange
    const existingUser = {
      id: 'existing-user-id',
      firstName: 'Jane',
      lastName: 'Smith',
      email: userData.email,
      password: 'hashed-password',
    }
    fakeGetUserByEmailRepository.execute.mockResolvedValue(existingUser)

    // Act & Assert
    await expect(createUserService.execute(userData)).rejects.toThrow(
      EmailAlreadyExists,
    )
    expect(fakeGetUserByEmailRepository.execute).toHaveBeenCalledWith(
      userData.email,
    )
    expect(fakeUuidGeneratorAdapter.execute).not.toHaveBeenCalled()
    expect(fakePasswordHasherAdapter.execute).not.toHaveBeenCalled()
    expect(fakeCreateUserRepository.execute).not.toHaveBeenCalled()
  })

  it('should throw error when CreateUserRepository fails', async () => {
    // Arrange
    const mockUserId = 'mock-uuid-123'
    const mockHashedPassword = 'hashed-password-123'

    fakeGetUserByEmailRepository.execute.mockResolvedValue(null)
    fakeUuidGeneratorAdapter.execute.mockReturnValue(mockUserId)
    fakePasswordHasherAdapter.execute.mockResolvedValue(mockHashedPassword)
    fakeCreateUserRepository.execute.mockRejectedValue(
      new Error('Database error'),
    )

    // Act & Assert
    await expect(createUserService.execute(userData)).rejects.toThrow(
      'Database error',
    )
  })

  it('should call repositories and adapters with correct values', async () => {
    // Arrange
    const mockUserId = 'mock-uuid-123'
    const mockHashedPassword = 'hashed-password-123'
    const mockCreatedUser = {
      id: mockUserId,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: mockHashedPassword,
    }

    fakeGetUserByEmailRepository.execute.mockResolvedValue(null)
    fakeUuidGeneratorAdapter.execute.mockReturnValue(mockUserId)
    fakePasswordHasherAdapter.execute.mockResolvedValue(mockHashedPassword)
    fakeCreateUserRepository.execute.mockResolvedValue(mockCreatedUser)

    // Act
    await createUserService.execute(userData)

    // Assert
    expect(fakeGetUserByEmailRepository.execute).toHaveBeenCalledWith(
      'john.doe@example.com',
    )
    expect(fakePasswordHasherAdapter.execute).toHaveBeenCalledWith(
      'Password123!',
    )
    expect(fakeCreateUserRepository.execute).toHaveBeenCalledWith({
      id: 'mock-uuid-123',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'hashed-password-123',
    })
  })
})

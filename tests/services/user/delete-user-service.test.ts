import { DeleteUserService } from '../../../src/services/user/delete-user-service'
import { DeleteUserRepository } from '../../../src/repositories/user/delete-user-repository'

describe('DeleteUserService', () => {
  let deleteUserService: DeleteUserService
  let fakeDeleteUserRepository: { execute: jest.Mock }
  let fakeDeletedUser: {
    id: string
    first_name: string
    last_name: string
    email: string
  }

  beforeEach(() => {
    fakeDeleteUserRepository = { execute: jest.fn() }
    fakeDeletedUser = {
      id: '78b1cbd6-5154-4af3-b2fa-1be9a8bbdd1e',
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
    }
    deleteUserService = new DeleteUserService(
      fakeDeleteUserRepository as unknown as DeleteUserRepository,
    )
  })

  it('should successfully delete a user', async () => {
    fakeDeleteUserRepository.execute.mockResolvedValue(fakeDeletedUser)
    const deletedUser = await deleteUserService.execute(
      '78b1cbd6-5154-4af3-b2fa-1be9a8bbdd1e',
    )
    expect(deletedUser).toEqual({
      id: fakeDeletedUser.id,
      first_name: fakeDeletedUser.first_name,
      last_name: fakeDeletedUser.last_name,
      email: fakeDeletedUser.email,
    })
  })

  it('should call repository with correct user id', async () => {
    fakeDeleteUserRepository.execute.mockResolvedValue(fakeDeletedUser)
    const userId = '78b1cbd6-5154-4af3-b2fa-1be9a8bbdd1e'

    await deleteUserService.execute(userId)

    expect(fakeDeleteUserRepository.execute).toHaveBeenCalledWith(userId)
    expect(fakeDeleteUserRepository.execute).toHaveBeenCalledTimes(1)
  })

  it('should return null when user does not exist', async () => {
    fakeDeleteUserRepository.execute.mockResolvedValue(null)

    const result = await deleteUserService.execute(
      '78b1cbd6-5154-4af3-b2fa-1be9a8bbdd1e',
    )

    expect(result).toBeNull()
  })

  it('should handle repository errors gracefully', async () => {
    const error = new Error('Database connection failed')
    fakeDeleteUserRepository.execute.mockRejectedValue(error)

    await expect(
      deleteUserService.execute('78b1cbd6-5154-4af3-b2fa-1be9a8bbdd1e'),
    ).rejects.toThrow('Database connection failed')
  })

  it('should throw error when repository throws error', async () => {
    const error = new Error('User not found')
    fakeDeleteUserRepository.execute.mockRejectedValue(error)

    await expect(deleteUserService.execute('invalid-user-id')).rejects.toThrow(
      'User not found',
    )
  })

  it('should handle empty string id', async () => {
    fakeDeleteUserRepository.execute.mockResolvedValue(null)

    const result = await deleteUserService.execute('')

    expect(result).toBeNull()
    expect(fakeDeleteUserRepository.execute).toHaveBeenCalledWith('')
  })

  it('should handle undefined id', async () => {
    fakeDeleteUserRepository.execute.mockResolvedValue(null)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await deleteUserService.execute(undefined as any)

    expect(result).toBeNull()
    expect(fakeDeleteUserRepository.execute).toHaveBeenCalledWith(undefined)
  })
})

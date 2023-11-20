import { Test, TestingModule } from '@nestjs/testing'
import { UserService } from './user.service'

describe('UserService', () => {
  let service: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile()

    service = module.get<UserService>(UserService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })


  
  it('should create a new user', async () => {
    const data = {
      name: 'John',
      email: 'john@example.com',
      roles: [],
      password: 'password',
      passwordHash: '',
    }
    const result = await service.createUser(data)
    expect(result).toHaveProperty('id')
    expect(result.name).toEqual(data.name)
    expect(result.email).toEqual(data.email)
    expect(result.roles).toEqual(data.roles)
  })



  it('should update an existing user', async () => {
    const existingUser = await service.createUser({
      name: 'John',
      email: 'john@example.com',
      roles: [],
      passwordHash: '',
    })
    const newData = { name: 'Jane' }
    const result = await service.updateUser(existingUser.id, newData)
    if (result) {
      expect(result).toHaveProperty('id')
      expect(result.name).toEqual(newData.name)
      expect(result.email).toEqual(existingUser.email)
      expect(result.roles).toEqual(existingUser.roles)
    } else {
      fail('User not found')
    }
  })
  
  it('should delete an existing user', async () => {
    const existingUser = await service.createUser({
      name: 'John',
      email: 'john@example.com',
      roles: [],
      passwordHash: '',
    })
    const result = await service.deleteUser(existingUser.id)
    if (result) {
      expect(result).toHaveProperty('id')
      expect(result.name).toEqual(existingUser.name)
      expect(result.email).toEqual(existingUser.email)
      expect(result.roles).toEqual(existingUser.roles)
      expect(await service.getUserById(existingUser.id)).toBeNull()
    } else {
      fail('user not found')
    }

  })

  it('should return all users', async () => {
    const existingUsers = await Promise.all([
      service.createUser({
        name: 'John',
        email: 'john@example.com',
        roles: ['USER'],
        passwordHash: '',
      }),
      service.createUser({
        name: 'Jane',
        email: 'jane@example.com',
        roles: ['USER'],
        passwordHash: '',
      }),
    ])
    const result = await service.getAllUsers()
    expect(result.length).toEqual(existingUsers.length)
    expect(result.map((user) => user.id)).toEqual(existingUsers.map((user) => user.id))
  })
})

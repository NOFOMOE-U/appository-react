import { Test, TestingModule } from '@nestjs/testing'
import { BackendDataAccessService } from './backend-data-access.service'

describe('BackendDataAccessService', () => {
  let service: BackendDataAccessService

  describe('BackendDataAccessService', () => {
    let service: BackendDataAccessService

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [BackendDataAccessService],
      }).compile()

      service = module.get<BackendDataAccessService>(BackendDataAccessService)
    })

    it('should be defined', () => {
      expect(service).toBeDefined()
    })
  })

  describe('createUser', () => {
    it('should create a user in the database', async () => {
      const newUser = {
        id: '',
        name: 'John Doe',
        email: 'john.doe@example.com',
        roles: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        resetPasswordToken: undefined,
        passwordHash: 'randomHashHere',
      }
      const createdUser = await service.createUser(newUser)
      expect(createdUser).toHaveProperty('id')
      expect(createdUser.name).toBe(newUser.name)
      expect(createdUser.email).toBe(newUser.email)
    })
  })
  
  describe('createUser', () => {
    it('should hash the user password before storing it in the database', async () => {
      const newUser = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        passwordHash: 'ffi38dd8',
        password: 'password123',
      }
      const createdUser = await service.createUser(newUser)
      expect(createdUser.passwordHash).toBeDefined()
      expect(createdUser.passwordHash).not.toBe(newUser.password)
    })
  })
  
  // Test that the getUserById method returns a user object without the password or passwordHash:
  describe('getUserById', () => {
    it('should return a user from the database by id without the password or passwordHash', async () => {
      const newUser = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        passwordHash: '4jajf84'
      }
      const createdUser = await service.createUser(newUser)
      if (!createdUser) {
        throw new Error('Failed to create user')
      }
  
      const fetchedUser = createdUser?.id && (await service.getUserById(createdUser.id))
      if (typeof fetchedUser === 'string') {
        throw new Error('Failed to fetch user')
      }
      expect(fetchedUser).toHaveProperty('id')
      expect(fetchedUser?.name).toBe(newUser.name)
      expect(fetchedUser?.email).toBe(newUser.email)
    })
  })
  
  // Test that the updateUser method does not allow the password or passwordHash to be updated
  describe('updateUser', () => {
    it('should update a user in the database without updating the password or passwordHash', async () => {
      const newUser = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        passwordHash: 'password123',
      }
      const createdUser = await service.createUser(newUser)
      if (!createdUser) {
        throw new Error('Failed to create user')
      }
      const updatedUser = {
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
      }

      if(createdUser.id){
      const result =  await service.updateUser(createdUser.id, updatedUser)
        if (!result) {
        throw new Error('Failed to updated user')
      }
        
      expect(result).toHaveProperty('id')
      expect(result.name).toBe(updatedUser.name)
      expect(result.email).toBe(updatedUser.email)
      expect(result.passwordHash).toBe(newUser.passwordHash)}
    })
  })
  
  // Test that the deleteUser method removes the password and passwordHash from the deleted user
  describe('deleteUser', () => {
    it('should delete a user from the database and remove the password and passwordHash', async () => {
      const newUser = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        passwordHash: 'password123',
      }
      const createdUser = await service.createUser(newUser)
      if (!createdUser) {
        throw new Error('Failed to create user')
      }
      if(createdUser.id){
      const result = await service.deleteUser(createdUser?.id)
      expect(result).toHaveProperty('id')
      expect(result.name).toBe(newUser.name)
      expect(result.email).toBe(newUser.email)
        expect(result.passwordHash).not.toBe(newUser.passwordHash)
      }
    })
  })

  describe('getAllUsers', () => {
    it('should return all users from the database', async () => {
      const newUser1 = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        passwordHash: '4fji4ni4',
      }
      const newUser2 = {
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        passwordHash: '434393n3ah',
      }
      await service.createUser(newUser1)
      await service.createUser(newUser2)
      const result = await service.getAllUsers()
      expect(result).toHaveLength(2)
    })
  })
})

import { Test, TestingModule } from '@nestjs/testing';
import { BackendDataAccessService } from '../backend-data-access/backend-data-access.service';
import { BackendDataModelModule } from './backend-data-model';

describe('UserRepository', () => {
  let service: BackendDataAccessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [BackendDataModelModule],
      providers: [BackendDataAccessService],
    }).compile();

    service = module.get<BackendDataAccessService>(BackendDataAccessService);
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const user= await service.createUser({
        name: 'John Doe',
        email: 'john.doe@example.com',
        passwordHash: 'password',
      });
      
      expect(user).toBeDefined();
      expect(user.name).toEqual('John Doe');
      expect(user.email).toEqual('john.doe@example.com');
    });
  });
});

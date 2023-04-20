import { Test, TestingModule } from '@nestjs/testing';
import { ContextService } from '../context/context.service';
import { CommonContextModule } from './common-context.module';

describe('CommonContextModule', () => {
  let module: TestingModule;
  let contextService: ContextService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [CommonContextModule],
    }).compile();

    contextService = module.get<ContextService>(ContextService);
  });

  afterAll(async () => {
    await module.close();
  });

  describe('ContextService', () => {
    it('should be defined', () => {
      expect(contextService).toBeDefined();
    });
  });
});

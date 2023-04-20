import { Test } from '@nestjs/testing';
import { ContextService } from '../context/context.service';
import { BackendDataModelModule } from '../lib/backend-data-model';
import { PrismaService } from '../lib/prisma/prisma.service';
import { BackendDataAccessModule } from './backend-data-access.module';
import { BackendDataAccessService } from './backend-data-access.service';

describe('BackendDataAccessModule', () => {
  let module: BackendDataAccessModule;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      imports: [BackendDataAccessModule],
    }).compile();

    module = app.get<BackendDataAccessModule>(BackendDataAccessModule);
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should export required providers', () => {
    expect(module.providers).toContainEqual(PrismaService);
    expect(module.providers).toContainEqual(BackendDataAccessService);
    expect(module.providers).toContainEqual(BackendDataModelModule);
    expect(module.providers).toContainEqual(ContextService);
  });
});

import { Test } from '@nestjs/testing';
import { SharedDataModule } from './shared-module';

describe('SharedDataModule', () => {
  it('should create the module successfully', async () => {
    const module = await Test.createTestingModule({
      imports: [SharedDataModule],
    }).compile();

    expect(module).toBeDefined();
  });
});

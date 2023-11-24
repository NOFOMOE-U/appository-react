// api-versions.dto.spec.ts

import { ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ApiVersionDto } from './api-versions.dto';

describe('ApiVersionDto', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [ApiVersionDto],
    }).compile();
  });

  describe('name', () => {
    it('should be a non-empty string', async () => {
      const dto = new ApiVersionDto();
      dto.name = 'v1';
      const result = await validate(dto);
      expect(result).toHaveLength(0);
    });

    it('should not be empty', async () => {
      const dto = new ApiVersionDto();
      dto.name = '';
      const result = await validate(dto);
      expect(result).toHaveLength(1);
    });
  });

  describe('versions', () => {
    it('should be a non-empty array', async () => {
      const dto = new ApiVersionDto();
      dto.versions = ['1.0', '2.0'];
      const result = await validate(dto);
      expect(result).toHaveLength(0);
    });

    it('should not be empty', async () => {
      const dto = new ApiVersionDto();
      dto.versions = [];
      const result = await validate(dto);
      expect(result).toHaveLength(1);
    });
  });

  const validate = async (dto: ApiVersionDto) => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiVersionDto],
    }).compile();

    const app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    const result = await app.get(ValidationPipe).transform(dto, {
      metatype: ApiVersionDto,
      type: 'body',
      data: '',
    });

    await app.close();
    return result;
  };
});

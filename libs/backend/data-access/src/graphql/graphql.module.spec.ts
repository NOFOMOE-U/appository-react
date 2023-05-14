import { Test } from '@nestjs/testing';
import { GraphQLModule } from './graphql.module';

describe('GraphQLModule', () => {
  let module: GraphQLModule;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [GraphQLModule],
    }).compile();

    module = moduleRef.get<GraphQLModule>(GraphQLModule);
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });
});

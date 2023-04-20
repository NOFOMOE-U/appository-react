import { Test, TestingModule } from '@nestjs/testing';
import { ApolloServerTestClient, createTestClient } from 'apollo-server-integration-testing';
import { TypesModule } from './types.module';
import { TypesService } from './types.service';

describe('TypesModule', () => {
    let module: TestingModule;
    let typesService: TypesService;
    let apolloClient: ApolloServerTestClient;
  
    beforeAll(async () => {
      module = await Test.createTestingModule({
        imports: [TypesModule],
      }).compile();
  
      typesService = module.get<TypesService>(TypesService);
  
      const app = module.createNestApplication();
      await app.init();
      apolloClient = createTestClient(app.getHttpServer());
    });
  
    afterAll(async () => {
      await module.close();
    });
  
    it('should be defined', () => {
      expect(module).toBeDefined();
      expect(typesService).toBeDefined();
      expect(apolloClient).toBeDefined();
    });
  

    it('should be defined', () => {
        expect(module).toBeDefined();
        expect(typesService).toBeDefined();
        expect(apolloClient).toBeDefined();
      });
      
      it('should return an array of types', async () => {
        const query = `
          query {
            types {
              id
              name
            }
          }
        `;
        const response = await apolloClient.query({ query });
        expect(response.errors).toBeUndefined();
        expect(response.data.types).toBeInstanceOf(Array);
      });

      
    
    // add more test cases here
  });
  
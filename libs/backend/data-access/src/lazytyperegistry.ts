//libs/backend/data-access/src/lazytyperegistry.ts
import { Module, Type } from '@nestjs/common';
import { GraphQLSchema } from 'graphql';

export type LazyTypeRegistryMap = Map<string, Type<unknown>>;

export class LazyTypeRegistry {
  private readonly types = new Map<string, Type<unknown>>();
  private readonly typeLoader = new Map<string, () => Type<unknown>>();

  constructor(private readonly schema: GraphQLSchema) {}

  public register(name: string, typeLoader: () => Type<unknown>) {
    this.typeLoader.set(name, typeLoader);
  }
    
  public get(name: string): Type<unknown> {
    const resolver = this.types[name];
    if (!resolver) {
      throw new Error(`Unable to find resolver for ${name}`);
    }

    return resolver();
  }

  public getType(name: string): Type<unknown> | undefined {
    if (this.types.has(name)) {
      return this.types.get(name);
    }

    const typeLoader = this.typeLoader.get(name);
    if (!typeLoader) {
      return undefined;
    }

    const type = typeLoader();
    this.types.set(name, type);

    return type;
  }

  public resolveAll(): LazyTypeRegistryMap {
    const result = new Map<string, Type<unknown>>();
    for (const [name, loader] of this.typeLoader) {
      result.set(name, loader());
    }
    return result;
  }

  public loadAllTypes() {
    const typeNames = Array.from(this.typeLoader.keys());
    for (const name of typeNames) {
      this.getType(name);
    }
  }
}

@Module({})
export class LazyTypeRegistryModule {
  static forRoot(schema: GraphQLSchema) {
    const lazyTypeRegistry = new LazyTypeRegistry(schema);
    return {
      module: LazyTypeRegistryModule,
      providers: [
        {
          provide: LazyTypeRegistry,
          useValue: lazyTypeRegistry,
        },
      ],
      exports: [LazyTypeRegistry],
    };
  }
}

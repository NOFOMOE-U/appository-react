//libs/backend/nexus-lazy-types/src/lib/backend-nexus-lazy-types.ts
import { LazyTypeRegistryModule } from '@appository/backend/data-access';
import { schema } from './../../../data-access/src/graphql/nexus.schema';

// Import the LazyTypeRegistryModule and pass the generated schema from Nexus to its forRoot method
const lazyTypeRegistryModule = LazyTypeRegistryModule.forRoot(schema);

// Export the module's providers and exports, which include the LazyTypeRegistry instance
export const providers = lazyTypeRegistryModule.providers;
export const exportsArray = lazyTypeRegistryModule.exports;

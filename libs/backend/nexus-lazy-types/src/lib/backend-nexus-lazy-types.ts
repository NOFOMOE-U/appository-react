//libs/backend/nexus-lazy-types/src/lib/backend-nexus-lazy-types.ts
import { LazyTypeRegistryModule, schema as lazySchema } from '@appository/backend/data-access'
// Import the LazyTypeRegistryModule and pass the generated schema from Nexus to its forRoot method
const lazyTypeRegistryModule = LazyTypeRegistryModule.forRoot(lazySchema)

// Export the module's providers and exports, which include the LazyTypeRegistry instance
export const providers = lazyTypeRegistryModule.providers
export const exportsArray = lazyTypeRegistryModule.exports

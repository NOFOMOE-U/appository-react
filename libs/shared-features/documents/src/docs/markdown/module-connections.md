## AppModule (`app.module.ts`)

Integrates various modules into the main application.
- Includes `UserModule`, `CommunicationModule`, `GraphQLModule`, `PrismaModule`, `LoggingModule`, and `PermissionsModule`.
- Declares `AppController` and provides `AppService`.
- Configures Apollo Driver for GraphQL.

## CommunicationModule (`communication.module.ts`)

Depends on `BackendDataAccessModule` from `@appository/core`.
- Provides `ContextService` and `PrismaService`.
- Focused on communication-related services and dependencies.

## BackendDataModelModule (`backend-data-model.module.ts`)

Integrates and configures various services and controllers.
- Provides `PrismaService` and `'CONTEXT'`.
- Uses `GraphQLModule` for GraphQL configuration.
- Depends on `PrismaModule`, `UserModule`, `CommonContextModule`, etc.

## MakeApiModule (`make-api.module.ts`)

- Provides an API controller (`ApiController`) and service (`ApiService`).
- Exports the `ApiService` for use in other modules.

## SharedFeaturesDocumentsModule (`shared-features-documents.module.ts`)

- A module that doesn't declare controllers or providers.
- Used for shared features related to documents.

## SharedFeaturesApiToolModule (`shared-features-api-tool.module.ts`)

- A module that doesn't declare controllers or providers.
- Used for shared features related to API tools.

## CoreModule (`core.module.ts`)

- Configures global settings using `ConfigModule`.
- Sets up GraphQL using `GraphQLModule` with Apollo Driver.
- **Provides** `ContextService` and exports it for use in other modules.
- Includes `CoreResolver` as a provider.
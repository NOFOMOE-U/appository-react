import { CodegenConfig } from '@graphql-codegen/cli'

interface GenerateFileConfigOptions {
  outputFile: string
  plugins: string[]
  indexExportType?: boolean
  indexExport?: string
}

function generateFileConfig(options: GenerateFileConfigOptions) {
  const config: any = {
    schema: './schema.graphql',
    plugins: options.plugins,
    config: {
      outputFile: options.outputFile,
    },
  }

  if (options.indexExportType) {
    config.config.indexExportType = true
  }

  if (options.indexExport) {
    config.config.indexExport = options.indexExport
  }

  return config
}

const schemaConfig: CodegenConfig = {
  schema: 'http://localhost:3000/graphql',
  generates: {
    //TYPES
    './src/types.ts': generateFileConfig({
      outputFile: './src/types.ts',
      plugins: ['typescript', 'typescript-operations'],
    }),
    './src/schema/user/user/types.ts': generateFileConfig({
      outputFile: './src/schema/user/user/types.ts',
      plugins: ['typescript'],
      indexExportType: true,
    }),
    './src/schema/post/post/types.ts': generateFileConfig({
      outputFile: './src/schema/post/post/types.ts',
      plugins: ['typescript'],
      indexExportType: true,
    }),

    //INDEX
    './src/schema/user/index.ts': generateFileConfig({
      outputFile: './src/schema/user/index.ts',
      plugins: ['typescript'],
      indexExport: './src/schema/user/user/types.ts',
    }),
    './src/schema/post/index.ts': generateFileConfig({
      outputFile: './src/schema/post/index.ts',
      plugins: ['typescript'],
      indexExport: './src/schema/post/post/types.ts',
    }),
  },
}

export default schemaConfig

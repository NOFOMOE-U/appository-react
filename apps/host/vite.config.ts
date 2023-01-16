import moduleFederation from '@originjs/vite-plugin-federation'
import { defineConfig } from 'vite'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import { fetchRemotes } from '../../libs/shared/fetch-remotes/src'

export default defineConfig({
  server: {
    port: 4200,
    host: 'localhost',
  },
  plugins: [
    viteTsConfigPaths({
      root: '../../',
    }),
    moduleFederation({
      remotes: await fetchRemotes(),
    }),
  ],
  test: {
    ...{
      globals: true,
      cache: {
        dir: '../../node_modules/.vitest',
      },
      environment: 'jsdom',
      include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    },
  },
})

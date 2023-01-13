// @ts-check

/**
 * @type {import('@nrwl/devkit').ModuleFederationConfig}
 **/
const moduleFederationConfig = {
  name: 'admin',
  exposes: {
    './Module': './src/remote-entry.ts',
  },
}

module.exports = moduleFederationConfig

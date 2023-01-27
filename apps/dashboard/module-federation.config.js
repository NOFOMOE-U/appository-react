// @ts-check

/**
 * @type {import('@nrwl/devkit').ModuleFederationConfig}
 **/
const moduleFederationConfig = {
  name: 'dashboard',
  exposes: {
    './Module': './apps/dashboard/src/remote-entry.ts',
  },
}

module.exports = moduleFederationConfig

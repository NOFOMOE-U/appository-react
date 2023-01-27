// @ts-check

/**
 * @type {import('@nrwl/devkit').ModuleFederationConfig}
 **/
const moduleFederationConfig = {
  name: 'login',
  exposes: {
    './Module': './apps/login/src/remote-entry.ts',
  },
}

module.exports = moduleFederationConfig

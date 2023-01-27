// @ts-check

/**
 * @type {import('@nrwl/devkit').ModuleFederationConfig}
 **/
const moduleFederationConfig = {
  name: 'admin',
  exposes: {
    './Module': './apps/admin/src/remote-entry.ts',
  },
}

module.exports = moduleFederationConfig

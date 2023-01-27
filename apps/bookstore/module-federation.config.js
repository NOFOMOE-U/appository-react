// @ts-check

/**
 * @type {import('@nrwl/devkit').ModuleFederationConfig}
 **/
const moduleFederationConfig = {
  name: 'bookstore',
  exposes: {
    './Module': './apps/bookstore/src/remote-entry.ts',
  },
}

module.exports = moduleFederationConfig

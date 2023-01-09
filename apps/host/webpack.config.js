const withModuleFederation = require('@nrwl/react/module-federation');
const moduleFederationConfig = require('./module-federation.config');

// const output = require('output')
// /**
//  * @type {import('@nrwl/devkit').ModuleFederationConfig}
//  **/


const coreLibraries = new Set([
  'react',
  'react-dom',
  'react-router-dom',
  '@appository/load-remote-module',
]);

module.exports = withModuleFederation({
  ...moduleFederationConfig,
  shared: (libraryName, defaultConfig) => {
    if (coreLibraries.has(libraryName)) {
      return {
        ...defaultConfig,
        eager: true,
      };
    }

    // output.hashFunction = 'xxhash64'

    // Returning false means the library is not shared.
    return false;
  },
});
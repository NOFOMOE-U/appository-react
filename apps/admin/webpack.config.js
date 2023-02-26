// @ts-check
const { withModuleFederation } = require('@nrwl/react/module-federation')
const moduleFederationConfig = require('./module-federation.config')


const defaultConfig = {
  ...moduleFederationConfig,

}

module.exports = withModuleFederation(defaultConfig)
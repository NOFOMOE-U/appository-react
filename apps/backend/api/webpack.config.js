const { composePlugins, withNx } = require('@nrwl/webpack')
const { PrismaPlugin } = require('experimental-prisma-webpack-plugin')

// Nx plugins for webpack.

module.exports = composePlugins(
  withNx(),
  (config) => {
    config.plugins.push(new PrismaPlugin());
  // Update the webpack config as needed here.
  // e.g. `config.plugins.push(new MyPlugin())`
  return config
})

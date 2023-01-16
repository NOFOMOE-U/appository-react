const { createViteConfig } = require('vite');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const { resolve } = require('path');

module.exports = createViteConfig({
    plugins: [
        webpack({
            config: webpackConfig,
        }),
        {
            // this plugin is required to handle .ts and .tsx files
            // it uses the same TypeScript compiler as VSCode
            resolve: 'vite-plugin-typescript',
            options: {
                // you can pass any TypeScript compiler options
                // see https://www.typescriptlang.org/docs/handbook/compiler-options.html
                tsconfig: resolve(__dirname, 'tsconfig.json'),
                // enable type checking in development
                // this will slow down the compilation
                // but will give you better type checking experience
                typeCheck: process.env.NODE_ENV === 'development',
            },
        }
    ],
});
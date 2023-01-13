// .storybook/manager.ts
import { addons } from '@storybook/addons'
import { create } from '@storybook/theming'

const theme = create({
  base: 'light', // this will inherit the base properties of Storybooks'light theme

  // Base color
  colorSecondary: '#45bc5a', // Chateau Green

  // UI
  appBg: '#F6F9FC',
  appContentBg: '#FFFFFF',
  appBorderColor: 'rgba(0,0,0,.1)',
  appBorderRadius: 4,

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: '#333333',
  textInverseColor: '#FFFFFF',
  textMutedColor: '#666666',

  // Toolbar default and active colors
  barTextColor: '#999999',
  barSelectedColor: '#45bc5a',
  barBg: '#FFFFFF',

  // Form colors
  inputBg: '#FFFFFF',
  inputBorder: 'rgba(0,0,0,.3)',
  inputTextColor: '#333333',
  inputBorderRadius: 4,

  // Brand assets
  brandTitle: 'Newline Storybook',
  brandUrl: 'https://newline.co',
  brandImage:
    'https://d8dgeb1f3fxgw.cloudfront.net/static/img/logo/newline/newline-logo-longwise-solo-lightbg-gray.svg',
})

addons.setConfig({
  //default use if you don't want to set up a full them.
  // theme: themes.dark,

  // define a theme preset, which could be light (default) or dark
  theme,
  showPanel: true, // show addons panel by default
  panelPosition: 'right', // position addons panel on the right by default
})
// #todo

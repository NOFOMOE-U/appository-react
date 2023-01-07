import { DecoratorFn } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../../ui/src/styles/global-styles/global-styles';

import { lightTheme } from '../../ui/src/styles/theme/theme';
export const withMaxWidth: DecoratorFn = (StoryFn, context) => {
  //use dev toos to see the object context properties
  console.log({ context });
  return (
    <div
      style={{
        maxWidth: '90%',
        margin: 'auto',
        border: '1px solid transparent',
      }}
    >
      <StoryFn />
    </div>
  );
};

export const withTheme: DecoratorFn = (StoryFn, context) => (
  <ThemeProvider theme={lightTheme}>
    <GlobalStyle />
    <StoryFn />
  </ThemeProvider>
);

export const globalDecorators = [withMaxWidth, withTheme];

// order of decorators
// Global decorators, in the order they are defined.
// Component decorators, in the order they are defined.
// Story decorators, in the order they are defined.

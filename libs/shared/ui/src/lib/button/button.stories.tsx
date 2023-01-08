// Button.stories.ts|tsx
import { useState } from 'react'; // <-- Import the useState hook

import { linkTo } from '@storybook/addon-links';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Button } from './button';
import * as ButtonArgTypes from './buttonArgTypes';


export default {
  title: 'Components/Button',
  component: Button,
  args: {
    text: 'Button',
    label: 'Button',
    createdDate: new Date(),
    fontStyle: 'Normal',
  },
  //because we have a control set up in preview.js, we can remove the below

  argTypes: ButtonArgTypes,
} as ComponentMeta<typeof Button>;

export const Template: ComponentStory<typeof Button> = (args) => {
  // Add the useState hook calls here
  const [value, setValue] = useState(args.value);
  const [isPrimary, setIsPrimary] = useState(args.isPrimary || false);
  const [backgroundColor, setBackgroundColor] = useState(
    args.backgroundColor || 'white'
  );

  const handleOnChange = () => {
    if (!isPrimary) {
      //   setIsPrimary(true);
      setValue('Primary');
      setBackgroundColor('green');
    }
  };

  return (
    <Button
      {...args}
      className={['btn', `{storybook-button--${args.size}}`]}
      value={value}
      label={args.label}
      onChange={handleOnChange}
      variant-dark
    />
  );
};

export const Primary = Template.bind({});

Primary.args = {
  isPrimary: true,
  backgroundColor: 'green',

};
//changing the name of a specific story
// Primary.storyName = 'I am the primary';

export const Secondary = Template.bind({});
Secondary.args = {
  ...Primary.args,
};

export const Large = Template.bind({});
Large.args = {
  ...Primary.args,
  size: 'large',
};

export const Medium = Template.bind({});
Medium.args = {
  ...Primary.args,
  size: 'medium',
};

export const Small = Template.bind({});
Small.args = {
  ...Primary.args,
  size: 'small',
};

export const Red = Template.bind({});
Red.args = {
  ...Primary.args,
  //setting a specific label directly on a button
  label: 'Button 5',
};

export const first = () => (
  <button onClick={linkTo('Button', 'second')}>Go to "Second"</button>
);
export const second = () => (
  <button onClick={linkTo('Button', 'first')}>Go to "First"</button>
);

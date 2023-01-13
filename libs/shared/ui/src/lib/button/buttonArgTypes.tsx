export const argTypes = {
  fontStyle: {
    control: 'select',
    options: ['Normal', 'Bold', 'Italic'],
    mapping: {
      Bold: <b>Bold</b>,
      Italic: <i>Italic</i>,
    },
    defaultValue: 'Normal',
    variant: {
      options: ['primary', 'secondary'],
      control: { type: 'radio' },
    },
  },
};

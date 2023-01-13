import { withDesign } from 'storybook-addon-designs'

import { Button } from '../../lib/button/button' // import Button from the appropriate file

export default {
  title: 'myStories',
  decorators: [withDesign],
}

export const myStory = (): JSX.Element => <Button onChange={() => console.log('Button clicked')} text="Click me" />
myStory.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/0QheBUlBgwnjudda4Oenpw/Responsive-Design-Layout-Templates?t=w7MmkLGn78cTyNgA-1',
    url2: 'https://www.figma.com/proto/0QheBUlBgwnjudda4Oenpw/Responsive-Design-Layout-Templates?scaling=min-zoom&page-id=0%3A1&node-id=3%3A2',
  },
}

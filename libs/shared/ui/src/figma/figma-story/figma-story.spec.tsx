import { render } from '@testing-library/react'

import FigmaStory from './figma-story'

describe('FigmaStory', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FigmaStory />)
    expect(baseElement).toBeTruthy()
  })
})

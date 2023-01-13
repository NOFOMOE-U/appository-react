import { render } from '@testing-library/react'

import Breakpoints from './breakpoints'

describe('Breakpoints', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Breakpoints />)
    expect(baseElement).toBeTruthy()
  })
})

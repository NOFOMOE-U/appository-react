import { render } from '@testing-library/react'

import SharedRemotes from './shared-remotes'

describe('SharedRemotes', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedRemotes />)
    expect(baseElement).toBeTruthy()
  })
})

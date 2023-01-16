import { render } from '@testing-library/react'

import SharedFetchRemotes from './shared-fetch-remotes'

describe('SharedFetchRemotes', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedFetchRemotes />)
    expect(baseElement).toBeTruthy()
  })
})

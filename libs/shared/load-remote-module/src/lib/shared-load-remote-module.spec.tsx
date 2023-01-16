import { render } from '@testing-library/react'

import SharedLoadRemoteModule from './shared-load-remote-module'

describe('SharedLoadRemoteModule', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedLoadRemoteModule />)
    expect(baseElement).toBeTruthy()
  })
})

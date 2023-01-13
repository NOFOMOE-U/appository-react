import { render } from '@testing-library/react'

import { BrowserRouter as Router } from 'react-router-dom'

import App from './app'

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Router>
        <App />
      </Router>,
    )
    expect(baseElement).toBeTruthy()
  })

  it('should have a greeting as the title', () => {
    const { getByText } = render(
      <Router>
        <App />
      </Router>,
    )
    expect(getByText(/Welcome host/gi)).toBeTruthy()
  })
})

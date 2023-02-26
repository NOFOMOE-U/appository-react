import { backendAuth } from './backend-auth'

describe('backendAuth', () => {
  it('should work', () => {
    expect(backendAuth()).toEqual('backend-auth')
  })
})

import { GET_BOOKS } from './books-data-query'

describe('GET_BOOKS', () => {
  it('should work', () => {
    expect(GET_BOOKS).toEqual('books-data-query')
  })
})

import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { GET_BOOKS } from '@appository/books/data-query'
import { Books } from '@appository/books/ui'

/* eslint-disable-next-line */
export interface BooksFeatureProps {}

const StyledBooksFeature = styled.div`
  color: pink;
`

export function BooksFeature(props: BooksFeatureProps) {
  const {loading, error, data} = useQuery(GET_BOOKS)
  const [books, setBooks] = useState<any[]>([])

  useEffect(() => {
    if (data) {
      setBooks(data.books)
    }
  }, [data])
  //the [] after the closing bracket indicates the effect is only run once in the initial render.
  //So this is the reason we delcare it to have no dependant state.

  if(loading) return <p>Loading...</p>
  if(error) return <p>Error.</p>
  return (
    <>
      <h2 className='section-title'>Books</h2>
      {/* 3a. pass callback for book and add an elert  */}
      <Books books={books} onAdd={(book) => alert(`Added ${book.title} to cart`)} />
    </>
  )
}

export default BooksFeature

import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { getBooks } from '@appository/books/data-access';
import { Books } from '@appository/books/ui';
/* eslint-disable-next-line */
export interface BooksFeatureProps {}

const StyledBooksFeature = styled.div`
  color: pink;
`;

export function BooksFeature(props: BooksFeatureProps) {
  const [books, setBooks] = useState<any[]>([])

  useEffect(() => {
    getBooks().then(setBooks)
  }, [])
  //the [] after the closing bracket indicates the effect is only run once in the initial render.
  //So this is the reason we delcare it to have no dependant state.
  return (
    <>
      
    <h2>Books</h2>
    <Books books={books} />
    </>
  );
}

export default BooksFeature;

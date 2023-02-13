// ui/src/lib/books/books.query.ts
import gql from 'graphql-tag';

export const GET_BOOKS = gql`
  query getAllBooks {
    books {
      id
      title
      author
      rating
      price
    }
  }
`;



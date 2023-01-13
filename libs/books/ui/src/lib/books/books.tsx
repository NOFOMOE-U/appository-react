import styled from 'styled-components';
import Book from '../book/book';

/* eslint-disable-next-line */
export interface BooksProps {
  books: any[];
  //2a. create a books prop for adding book a book
  onAdd: (book: any) => void;
}

const StyledBooks = styled.div`
  border: 1px solid black;
  border-radius: 4px
`;

export function Books({books, onAdd}: BooksProps) {
  return (
    <StyledBooks>
      {books.map(book => (

  //2b. lets pass down the onAdd callback here.
<Book key={book.id} book={book} onAdd={onAdd} />
))}
</StyledBooks>
  );
}

export default Books;

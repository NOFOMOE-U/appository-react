import styled from 'styled-components';
import Book from '../book/book';

/* eslint-disable-next-line */
export interface BooksProps {
  books: any[];
}

const StyledBooks = styled.div`
  border: 1px solid black;
  border-radius: 4px
`;

export function Books({books}: BooksProps) {
  return (
    <StyledBooks>
{books.map(book => (
<Book key={book.id} book={book} />
))}
</StyledBooks>
  );
}

export default Books;

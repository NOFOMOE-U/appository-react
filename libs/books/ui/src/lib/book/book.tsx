import { Button } from '@appository/shared/ui'
import styled from 'styled-components'

/* eslint-disable-next-line */
export interface BookProps {
  book: any
  //1a. add prop for handling adding book to cart
  //onAdd prop section 3.
  onAdd: (book: any) => void
}

const StyledBook = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  &:last-child {
    border-bottom: none;
  }
  > span {
    padding: 1rem 0.5rem;
    margin-right: 0.5rem;
  }
  .title {
    flex: 1;
  }
  .price {
    color: #478d3c;
  }
`

export function Book({ book, onAdd }: BookProps) {
  // 1b. create a handle function to add a book to the cart
  const handleAdd = () => onAdd(book)
  return (
    <StyledBook>
      <Button />
      <span className="title">
        {book.title} by {book.arthor}
      </span>
      <span className="price">${book.price}</span>
      <span>
        {/* 1c. add a handle click event to the button adding to the cart.
        //section 3 adding props  */}
        <Button onClick={handleAdd}>Add to Cart</Button>
      </span>
    </StyledBook>
  )
}

export default Book

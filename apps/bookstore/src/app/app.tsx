import styled from 'styled-components'

import { Link, Navigate, Route, Routes } from 'react-router-dom'

import { BooksFeature } from '@appository/books/feature'
import { GlobalStyles, Header, Main, NavigationItem, NavigationList } from '@appository/shared/ui'

const StyledApp = styled.div`
  // Your style here
`

export const App = () => {
  // const navigate = useNavigate();

  return (
    <>
      <GlobalStyles />
      <Header>
        <h1>Bookstore</h1>
        <NavigationList>
          <NavigationItem>
            <Link to="/bookstore/books">Books</Link>
            <Link to="/bookstore/books/featured"> Featured</Link>
          </NavigationItem>
        </NavigationList>
      </Header>
      <Main>
        <Routes>
          {/* <Route path="/" element={<BookStoreComponent />} /> */}
          <Route path="/books" element={<BooksFeature />} />
          <Route path="/bookstore" element={<Navigate replace to="/bookstore/books" />} />
        </Routes>
      </Main>
    </>
  )
}

export default App


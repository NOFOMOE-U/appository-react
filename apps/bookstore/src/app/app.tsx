import styled from 'styled-components';

import { Link, Navigate, Route, Routes } from 'react-router-dom';

import { BooksFeature } from '@appository/books/feature';
import {
  GlobalStyles,
  Header,
  Main,
  NavigationItem,
  NavigationList
} from '@appository/shared/ui';

const StyledApp = styled.div`
  // Your style here
`;

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
          <Route
            path="/bookstore"
            element={<Navigate replace to="/bookstore/books" />}
          />
        </Routes>
      </Main>
    </>
  );
};

export default App;

// -------------------------- //
//  // <StyledApp>
//         {/* START: routes
//         These routes and navigation have been generated for you
//         Feel free to move and update them to fit your needs

//          <div role="navigation">
//         <ul>
//           <li>
//             <Link to="/bookstore">Books Home</Link>
//           </li>
//           <li>
//             <Link to="/bookstore/books">My Books</Link>
//           </li>
//           <li>
//             <Link to="/bookstore/feature">Featured Books</Link>
//           </li>
//           <li>
//             <Link to="/bookstore/page-2">page 2</Link>
//           </li>
//           <li>
//             <Link to="/bookstore/page-3">page 3</Link>
//           </li>
//         </ul>
//       </div>

//       <Routes>
//         <Route
//           path="/"
//           element={
//             <div>
//               This is the generated root. {' '}<Link to="/bookstore/page-2">page 2</Link>
//             </div>
//           }
//         />
//         <Route
//           path="/"
//           element={
//             <div>
//               This is the generated root. {' '}<Link to="/page-3">page 3</Link>
//             </div>
//           }
//         />
//         <Route path="/bookstore/feature" element={<BooksFeature />} />

//         <Route
//           path="/"
//           element={
//             <div>
//               Should show up<Link to="/bookstore">Click here to go back </Link>
//           </div>
//             }
//         />
//       </Routes>
//         END OF ROUTES */}
//       // </StyledApp>

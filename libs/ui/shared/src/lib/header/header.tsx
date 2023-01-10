import { HTMLAttributes } from 'react';

import styled from 'styled-components';

const StyledHeader = styled.header`
  padding: 1rem;
  background-color: #2657ba;
  color: white;
  display: flex;
  align-items: center;
  a {
    color: white;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  > h1 {
    margin: 0 1rem 0 0;
    padding-right: 1rem;
    border-right: 1px solid white;
  }
`;
export const Header = (props: HTMLAttributes<HTMLElement>) => (
  <StyledHeader>{props.children}</StyledHeader>
);
export default Header;

// import styled from 'styled-components';

// /* eslint-disable-next-line */
// export interface HeaderProps {}

// const StyledHeader = styled.div`
//   color: pink;
// `;

// export function Header(props: HeaderProps) {
//   return (
//     <StyledHeader>
//       <h1>Welcome to Header!</h1>
//     </StyledHeader>
//   );
// }

// export default Header;

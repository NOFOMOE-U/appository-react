import { HTMLAttributes } from 'react'

import styled from 'styled-components'

const StyledMain = styled.main`
  padding: 0 1rem;
  width: 100%;
  // max-width: 960px;
  height: 100vh;
  background-color: orange;

  .section-title{
  margin-top: inherit
}
`
export const Main = (props: HTMLAttributes<HTMLElement>) => <StyledMain>{props.children}</StyledMain>

export default Main

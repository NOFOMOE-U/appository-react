import styled from 'styled-components'

/* eslint-disable-next-line */
export interface FigmaStoryProps {}

const StyledFigmaStory = styled.div`
  color: pink;
`

export function FigmaStory(props: FigmaStoryProps) {
  return (
    <StyledFigmaStory>
      <h1>Welcome to FigmaStory!</h1>
    </StyledFigmaStory>
  )
}

export default FigmaStory

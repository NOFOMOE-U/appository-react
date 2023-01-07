import { ReactNode } from 'react';

import styled, { css } from 'styled-components';


/* eslint-disable-next-line */


interface ButtonProps {
  // Add the value prop here

  value?: ReactNode;
  // string | void | (() => void);
  onChange: (e: React.ChangeEvent<HTMLButtonElement>) => void;
  isPrimary?: boolean;
  label?: string;
  backgroundColor?: string;
  className?: Array<string>;
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  text: string;
  
}

const Container = styled.div(
() => css`
  color: black;
  border-radius: 2rem;
  border: 1px solid black;
  cursor: pointer;
  padding: 0.8rem;
  width: 6rem;
  height: 3rem;
  padding: 1rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: .6rem;

  &[variant-dark]{
    color: white;
    background: black;
}
`);



export function Button(props: ButtonProps) {
  const { value, text, backgroundColor } = props;

  return (
    <Container style={{ backgroundColor }}>
      {/* <h2>{value}</h2> */}
      <h1>{text}</h1>
      {/*  //Use the text property to render the button text */}
    </Container>
  );
}



export default Button;



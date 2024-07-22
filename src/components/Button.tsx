import styled from "@emotion/styled";
import { ReactNode } from "react";

const Container = styled.div`
  width: fit-content;
  min-width: 30px;
  height: 30px;
  max-width: 150px;
  display: flex;
  align-items: center;
  padding: 5px;
  cursor: pointer;
  color: #172b4d;
  border-radius: 8px;
  &:hover {
    background-color: #091e4224;
  }
  &:active {
    background-color: #091e424f;
  }
`;

type ButtonProps = {
  children: ReactNode;
  onClick(event: React.MouseEvent<HTMLElement>): void;
};

function Button(props: ButtonProps) {
  return (
    <Container onClick={(event: React.MouseEvent<HTMLElement>) => props.onClick(event)}>{props.children}</Container>
  );
}

export default Button;

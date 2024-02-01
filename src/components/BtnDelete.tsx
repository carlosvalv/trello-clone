import styled from "@emotion/styled";
import { TrashIcon } from "./svgs/TrashIcon";

const Container = styled.div`
  min-width: 30px;
  height: 30px;
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

type BtnDeleteProps = {
  onClick(): void;
};

function BtnDelete(props: BtnDeleteProps) {
  return (
    <Container onClick={() => props.onClick()}>
      <TrashIcon />
    </Container>
  );
}

export default BtnDelete;

import { TrashIcon } from "./svgs/TrashIcon";
import Button from "./Button";

type BtnDeleteProps = {
  onClick(): void;
};

function BtnDelete(props: BtnDeleteProps) {
  return (
    <Button onClick={() => props.onClick()}>
      <TrashIcon />
    </Button>
  );
}

export default BtnDelete;

import { useDispatch, useSelector } from "react-redux";
import "./BtnAddCard.css";
import { updateLists } from "../../redux/states/list";
import { v4 as uuidv4 } from "uuid";
import { AddIcon } from "../svgs/AddIcon";
import { AppStore } from "../../redux/store";

type BtnAddCardProps = {
  listId: string;
};

function BtnAddCard(props: BtnAddCardProps) {
  const dispatch = useDispatch();
  const stateLists = useSelector((store: AppStore) => store.lists);

  const click = () => {
    let list = { ...stateLists.find((x) => x.id === props.listId) };
    let cards = [...list?.cards!];
    cards.push(uuidv4());
    list.cards = cards;
    dispatch(updateLists([list]));
  };

  return (
    <div className="btn-add-card" onClick={click}>
      <div className="add-icon">
        <AddIcon />
      </div>
      <h2>Add card</h2>
    </div>
  );
}

export default BtnAddCard;

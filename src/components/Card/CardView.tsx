import { useDispatch, useSelector } from "react-redux";
import { AppStore } from "../../redux/store";
import "./Card.css";
import { selectCardById } from "../../redux/selectors/card";
import { openModal } from "../../redux/states/modal";
import { Modal } from "../../types/Modal";
import { ModalTypes } from "../../enums/Modal";

type CardViewProps = {
  id: string;
};

function CardView(props: CardViewProps) {
  const card = useSelector(
    (store: AppStore) => selectCardById(store.cards, props.id)[0]
  );
  const dispatch = useDispatch();

  const onClick = () => {
    let modal: Modal = { id: card.id, type: ModalTypes.CARDS };
    dispatch(openModal(modal));
  };

  return (
    <div className="card" draggable onClick={onClick}>
      <span>{card.title}</span>
    </div>
  );
}

export default CardView;

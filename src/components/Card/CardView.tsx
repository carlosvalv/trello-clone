import { useDispatch, useSelector } from "react-redux";
import { AppStore } from "../../redux/store";
import "./Card.css";
import { selectCardById } from "../../redux/selectors/card";
import { openModal } from "../../redux/states/modal";
import { Modal } from "../../types/Modal";
import { ModalTypes } from "../../enums/Modal";
import { DescriptionIcon } from "../svgs/DescriptionIcon";
import EditableText from "../EditableText/EditableText";
import { useEffect, useRef } from "react";
import { updateCards } from "../../redux/states/card";

type CardViewProps = {
  id: string;
};

function CardView(props: CardViewProps) {
  const card = useSelector(
    (store: AppStore) => selectCardById(store.card.cards, props.id)[0]
  );
  const stateFocusedCardId = useSelector(
    (store: AppStore) => store.card.focusedCardId
  );
  const ref = useRef<HTMLDivElement>(null);

  const onTitleChange = (title: string) => {
    let updateCard = { ...card };
    updateCard.title = title;
    dispatch(updateCards([updateCard]));
    dispatch(updateCards([updateCard]));
  };

  useEffect(() => {
    if (card.id === stateFocusedCardId && ref.current) {
      const childDiv = ref.current!.querySelector(".editable-text");
      if (childDiv) {
        (childDiv as HTMLElement).click();
        setTimeout(() => {
          let textArea = (childDiv as HTMLElement).querySelector("textarea");
          textArea?.focus();
          textArea?.select();
        }, 1);
      }
    }
  }, [stateFocusedCardId, card.id]);

  const dispatch = useDispatch();

  const onClick = () => {
    if (card.id === stateFocusedCardId) return;
    let modal: Modal = { id: card.id, type: ModalTypes.CARDS };
    dispatch(openModal(modal));
  };

  return (
    <div className="card" draggable onClick={onClick}>
      <div style={{ flex: 1 }} ref={ref}>
        <EditableText
          allowEmpty={false}
          placeholder="Introduce the card title"
          defaultText={card.title}
          disableEdit={card.id !== stateFocusedCardId}
          onChange={(text: string) => {
            onTitleChange(text);
          }}
        />
      </div>
      {card.description ? (
        <div className="description-icon">
          <DescriptionIcon />
        </div>
      ) : null}
    </div>
  );
}

export default CardView;

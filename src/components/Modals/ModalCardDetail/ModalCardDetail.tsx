import Modal from "@mui/material/Modal";
import "./ModalCardDetail.css";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../redux/states/modal";
import { AppStore } from "../../../redux/store";
import { selectCardById } from "../../../redux/selectors/card";
import EditableText from "../../EditableText/EditableText";
import { deleteCards, updateCards } from "../../../redux/states/card";
import { CloseIcon } from "../../svgs/CloseIcon";
import EditDescription from "./EditDescription";
import BtnDelete from "../../BtnDelete";
import { updateLists } from "../../../redux/states/list";
import BtnMove from "../../BtnMove";

type ModalCardDetailProps = {
  id: string;
};

function ModalCardDetail(props: ModalCardDetailProps) {
  const dispatch = useDispatch();

  const card = useSelector(
    (store: AppStore) => selectCardById(store.cards, props.id)[0]
  );
  const list = useSelector((store: AppStore) =>
    store.lists.find((x) => x.cards.includes(props.id))
  );

  const onTitleChange = (title: string) => {
    let updateCard = { ...card };
    updateCard.title = title;
    dispatch(updateCards([updateCard]));
  };

  const onDeleteCard = () => {
    let listCopy = { ...list };
    listCopy.cards = listCopy.cards!.filter((x) => x !== props.id);
    dispatch(updateLists([listCopy]));
    dispatch(deleteCards([props.id]));
    dispatch(closeModal());
  };

  return (
    <Modal open={true} onClose={() => dispatch(closeModal())}>
      <div className="card-detail">
        <div className="header">
          <div className="header-title">
            <EditableText
              defaultText={card.title}
              onChange={(text: string) => {
                onTitleChange(text);
              }}
            />
            <div
              className="close-icon"
              onClick={() => {
                dispatch(closeModal());
              }}
            >
              <CloseIcon />
            </div>
          </div>
          <div className="list-name">
            From list <span>{list?.name}</span>
          </div>
        </div>
        <div className="body">
          <div className="left">
            <EditDescription id={props.id} />
          </div>
          <div className="right">
            <BtnDelete onClick={onDeleteCard} />
            <BtnMove onClick={() => {}} id={props.id} />
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ModalCardDetail;

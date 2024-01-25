import Modal from "@mui/material/Modal";
import "./ModalCardDetail.css";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../redux/states/modal";
import { AppStore } from "../../../redux/store";
import { selectCardById } from "../../../redux/selectors/card";
import EditableText from "../../EditableText/EditableText";
import { updateCards } from "../../../redux/states/card";
import { CloseIcon } from "../../svgs/CloseIcon";

type ModalCardDetailProps = {
  id: string;
};

function ModalCardDetail(props: ModalCardDetailProps) {
  const dispatch = useDispatch();
  const card = useSelector(
    (store: AppStore) => selectCardById(store.cards, props.id)[0]
  );

  const onTitleChange = (title: string) => {
    let updateCard = { ...card };
    updateCard.title = title;
    dispatch(updateCards([updateCard]));
  };

  return (
    <Modal open={true} onClose={() => dispatch(closeModal())}>
      <div className="card-detail">
        <div className="header">
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
      </div>
    </Modal>
  );
}

export default ModalCardDetail;

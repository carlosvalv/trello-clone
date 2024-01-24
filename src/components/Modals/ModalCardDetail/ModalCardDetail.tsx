import Modal from "@mui/material/Modal";
import "./ModalCardDetail.css";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../redux/states/modal";
import { AppStore } from "../../../redux/store";
import { selectCardById } from "../../../redux/selectors/card";

type ModalCardDetailProps = {
  id: string;
};

function ModalCardDetail(props: ModalCardDetailProps) {
  const dispatch = useDispatch();
  const card = useSelector(
    (store: AppStore) => selectCardById(store.cards, props.id)[0]
  );
  return (
    <Modal open={true} onClose={() => dispatch(closeModal())}>
      <div className="card-detail">
        <h2>Card: {card.title}</h2>
      </div>
    </Modal>
  );
}

export default ModalCardDetail;

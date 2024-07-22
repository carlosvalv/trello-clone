import { useSelector } from "react-redux";
import { AppStore } from "../../redux/store";
import { ModalTypes } from "../../enums/Modal";
import ModalCardDetail from "./ModalCardDetail/ModalCardDetail";

function ModalManager() {
  const modal = useSelector((store: AppStore) => store.modal);

  const renderModal = ()=>{
    if(!modal || modal.type === ModalTypes.NOT_DEFINED) return <></>;

    switch(modal.type){
      default:
      case(ModalTypes.CARDS):
      return <ModalCardDetail id={modal.id} />
    }
  }

  return renderModal();
}

export default ModalManager;

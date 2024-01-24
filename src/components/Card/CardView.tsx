import { useSelector } from "react-redux";
import { AppStore } from "../../redux/store";
import "./Card.css";
import { selectCardById } from "../../redux/selectors/card";

type CardViewProps ={
  id: string
}

function CardView(props: CardViewProps) {
  const card = useSelector((store: AppStore) => selectCardById(store.cards, props.id)[0]);

  return (
    <div className="card" draggable>  
      <span>Card name : {card.title}</span>
    </div>
  );
}

export default CardView;

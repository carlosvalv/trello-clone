import "./Card.css";

type CardViewProps ={
  id: string
}

function CardView(props: CardViewProps) {
  return (
    <div className="card" draggable>  
      <span>Card name : {props.id}</span>
    </div>
  );
}

export default CardView;

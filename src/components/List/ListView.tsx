import "./List.css";
import {
  Droppable,
  Draggable,
  DraggingStyle,
  NotDraggingStyle,
} from "react-beautiful-dnd";
import { List } from "../../types/List";
import CardView from "../Card/CardView";

const getItemStyle = (
  isDragging: boolean,
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined
) => ({
  borderRadius: isDragging ? "8px" : "0em",
  boxShadow: isDragging ? "0.1875em 0.1875em 0.25em rgba(0, 0, 0, 0.1)" : "",
  marginBottom: isDragging ? "0em" : "1em",
  ...draggableStyle,
});

type ListProps = {
  list: List;
};

function ListView(props: ListProps) {
  const { list } = props;
  return (
    <div className="container">
      <div>
        <h2>Title</h2>
      </div>
      <Droppable droppableId={props.list.id}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <div style={{ background: "transparent", minHeight: 1}}>
              {list.cards &&
                list.cards.map((card, index) => (
                  <Draggable key={card} draggableId={card} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <CardView />
                        {card}
                      </div>
                    )}
                  </Draggable>
                ))}
            </div>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default ListView;

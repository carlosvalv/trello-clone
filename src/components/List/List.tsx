import { useState } from "react";
import Card from "../Card/Card";
import "./List.css";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DraggingStyle,
  NotDraggingStyle,
  DropResult,
} from "react-beautiful-dnd";

const getItemStyle = (
  isDragging: boolean,
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined
) => ({
  borderRadius: isDragging ? "8px" : "0em",
  boxShadow: isDragging ? "0.1875em 0.1875em 0.25em rgba(0, 0, 0, 0.1)" : "",
  marginBottom: isDragging ? "0em" : "1em",
  ...draggableStyle,
});

function List() {
  const [cards, setCards] = useState(["0", "1", "2", "3", "4"]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    let origin = result.source.index;
    let position = result.destination.index;

    let cardTarget = cards[origin];
    if (!cardTarget) return;

    let newArray: string[] = [];
    for (let i = 0; i <= cards.length - 1; i++) {
      if (i === origin) continue;

      if (i === position) {
        if (origin < position) {
          newArray.push(cards[i]);
          newArray.push(cards[origin]);
        } else {
          newArray.push(cards[origin]);
          newArray.push(cards[i]);
        }
        continue;
      }

      newArray.push(cards[i]);
    }

    console.log(newArray);
    setCards(newArray);
  };

  return (
    <div className="container">
      <div>
        <h2>Title</h2>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <div style={{ background: "transparent" }}>
                {cards.map((card, index) => (
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
                        <Card />
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
      </DragDropContext>
      <div className="cards"></div>
    </div>
  );
}

export default List;

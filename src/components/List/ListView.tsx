import "./List.css";
import {
  Droppable,
  Draggable,
  DraggingStyle,
  NotDraggingStyle,
} from "react-beautiful-dnd";
import { List } from "../../types/List";
import CardView from "../Card/CardView";
import { useDispatch } from "react-redux";
import { deleteList } from "../../redux/states/list";
import BtnAddCard from "../BtnAddCard/BtnAddCard";
import ListTitle from "./ListTitle/ListTitle";
import { createContext } from "react";
import { deleteCards } from "../../redux/states/card";
import BtnDelete from "../BtnDelete";

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

export const ListContext = createContext<List>({
  id: "",
  name: "",
  cards: [],
});

function ListView(props: ListProps) {
  const { list } = props;
  const dispatch = useDispatch();

  const clickDelete = () => {
    dispatch(deleteCards(list.cards));
    dispatch(deleteList(list.id));
  };

  return (
    <ListContext.Provider value={list}>
      <div className="container">
        <div className="header">
          <ListTitle />
          <BtnDelete onClick={clickDelete} />
        </div>
        <Droppable
          droppableId={list.id}
          ignoreContainerClipping={true}
          type="cards"
        >
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="card-content"
              style={{ overflowY: "auto" }}
            >
              <div
                style={{
                  background: "transparent",
                  minHeight: 1,
                  marginTop: 1,
                }}
              >
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
                          <CardView id={card} />
                        </div>
                      )}
                    </Draggable>
                  ))}
              </div>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <div className="footer">
          <BtnAddCard listId={list.id} />
        </div>
      </div>
    </ListContext.Provider>
  );
}

export default ListView;

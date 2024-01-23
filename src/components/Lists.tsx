import ListView from "./List/ListView";
import { useDispatch, useSelector } from "react-redux";
import { AppStore } from "../redux/store";
import {
  DragDropContext,
  DropResult,
  Droppable,
  Draggable,
  DraggingStyle,
  NotDraggingStyle,
} from "react-beautiful-dnd";
import { reorderList, updateLists } from "../redux/states/list";
import { arrayMove } from "../utilities/array";
import { List } from "../types/List";
import BtnAddList from "./BtnAddList/BtnAddList";
import DraggableScroll from "./Draggable";

function Lists() {
  const stateLists = useSelector((store: AppStore) => store.lists);
  const dispatch = useDispatch();

  const getItemStyle = (
    isDragging: boolean,
    draggableStyle: DraggingStyle | NotDraggingStyle | undefined
  ) => ({
    borderRadius: isDragging ? "8px" : "0em",
    boxShadow: isDragging ? "0.1875em 0.1875em 0.25em rgba(0, 0, 0, 0.1)" : "",
    marginBottom: isDragging ? "0em" : "0em",
    marginRight: "1em",
    height: "min-content",
    ...draggableStyle,
  });

  const dragCard = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const { index: origin, droppableId: originList } = source;
    const { index: position, droppableId: destList } = destination;

    if (position === origin && originList === destList) return;

    const [listOrigin, listDest]: List[] = [originList, destList].map((id) => ({
      ...stateLists.find((list) => list.id === id)!,
      cards: [...stateLists.find((list) => list.id === id)!.cards],
    }));

    if (originList !== destList) {
      const [movedCard] = listOrigin.cards.splice(origin, 1);
      listDest.cards.splice(position, 0, movedCard);
    } else {
      listOrigin.cards = arrayMove([...listOrigin.cards], origin, position);
    }

    const update = [listOrigin, ...(originList !== destList ? [listDest] : [])];
    dispatch(updateLists(update));
  };

  const dragList = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return [];

    const { index: origin } = source;
    const { index: position } = destination;
    dispatch(reorderList([origin, position]));
  };

  const onDragEnd = (result: DropResult) => {
    if (result.type === "cards") dragCard(result);
    if (result.type === "lists") dragList(result);
  };

  return (
    <DraggableScroll whiteListClasses={["lists", "lists-droppable"]}>
      <div className="lists">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={"lists"} direction="horizontal" type="lists">
            {(provided) => (
              <div
                className="lists-droppable"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {stateLists.map((list, index) => {
                  return (
                    <Draggable
                      key={list.id}
                      draggableId={list.id}
                      index={index}
                    >
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
                          <ListView list={list} />
                        </div>
                      )}
                    </Draggable>
                  );
                })}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <BtnAddList />
      </div>
    </DraggableScroll>
  );
}

export default Lists;

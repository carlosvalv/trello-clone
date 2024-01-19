import ListView from "./List/ListView";
import { useDispatch, useSelector } from "react-redux";
import { AppStore } from "../redux/store";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { updateLists } from "../redux/states/list";
import { arrayMove } from "../utilities/array";
import { List } from "../types/List";
import BtnAddList from "./BtnAddList/BtnAddList";

function Lists() {
  const stateLists = useSelector((store: AppStore) => store.lists);
  const dispatch = useDispatch();

  const onDragEnd = (result: DropResult) => {
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

  return (
    <div className="lists">
      <DragDropContext onDragEnd={onDragEnd}>
        {stateLists.map((list) => {
          return <ListView key={list.id} list={list} />;
        })}
      </DragDropContext>
      <BtnAddList />
    </div>
  );
}

export default Lists;

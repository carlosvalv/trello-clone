import { useDispatch } from "react-redux";
import "./BtnAddList.css";
import { List } from "../../types/List";
import { addList } from "../../redux/states/list";
import {v4 as uuidv4} from 'uuid';

function BtnAddList() {
  const dispatch = useDispatch();

  const click = () => {
    let list: List = { id: uuidv4(), name: "New List", cards: [] };
    dispatch(addList(list));
  };

  return (
    <div className="container btn-add-list" onClick={click}>
      <div>
        <h2>Add list</h2>
      </div>
    </div>
  );
}

export default BtnAddList;

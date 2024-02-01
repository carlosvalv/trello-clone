import { useContext } from "react";
import { ListContext } from "../ListView";
import { updateLists } from "../../../redux/states/list";
import { useDispatch } from "react-redux";
import EditableText from "../../EditableText/EditableText";

function ListTitle() {
  const list = useContext(ListContext);
  const dispatch = useDispatch();

  const onChange = (text: string) => {
    if (text === "") return;
    let editList = { ...list };
    editList.name = text.trim();
    dispatch(updateLists([editList]));
  };

  return (
    <EditableText
      defaultText={list.name}
      onChange={(text: string) => {
        onChange(text);
      }}
    />
  );
}

export default ListTitle;

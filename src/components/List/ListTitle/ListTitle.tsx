import { useContext, useEffect, useRef, useState } from "react";
import "./ListTitle.css";
import { ListContext } from "../ListView";
import { updateLists } from "../../../redux/states/list";
import { useDispatch } from "react-redux";
import DynamicHeightTextarea from "../../DynamicTextArea";

function ListTitle() {
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef(null);
  const list = useContext(ListContext);
  const dispatch = useDispatch();

  const [name, setName] = useState(list.name);

  useEffect(() => {
    function handleClickOutside(event: any) {
      //@ts-ignore
      if (textareaRef.current && !textareaRef.current.contains(event.target)) {
        setIsEditing(false);
        if (name === "") return;
        let editList = { ...list };
        editList.name = name.trim();
        dispatch(updateLists([editList]));
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [textareaRef, dispatch, list, name]);

  const onClick = () => {
    setIsEditing(true);
  };

  const onChange = (text: string) => {
    setName(text);
  };

  return (
    <div className="list-title" onClick={onClick}>
      {isEditing ? (
        <div ref={textareaRef} className="textarea-container">
          <DynamicHeightTextarea
            defaultValue={list.name}
            onChange={(text) => onChange(text)}
          />
        </div>
      ) : (
        <h2>{list.name}</h2>
      )}
    </div>
  );
}

export default ListTitle;

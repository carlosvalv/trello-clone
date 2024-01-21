import { useContext, useEffect, useRef, useState } from "react";
import "./ListTitle.css";
import { ListContext } from "../ListView";
import { updateLists } from "../../../redux/states/list";
import { useDispatch } from "react-redux";
import useAutosizeTextArea from "../../../hooks/useAutosizeTextArea";

type ListTitleProps = {
  id: string;
};

function ListTitle(props: ListTitleProps) {
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef(null);
  const list = useContext(ListContext);
  const dispatch = useDispatch();

  const [name, setName] = useState(list.name);

  console.log(name)
  useAutosizeTextArea(textareaRef.current, name);

  useEffect(() => {
    function handleClickOutside(event: any) {
      //@ts-ignore
      if (textareaRef.current && !textareaRef.current.contains(event.target)) {
        setIsEditing(false);
        if(name === "") return;
        let editList = {...list};
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
    console.log(text);
    setName(text);
  };

  return (
    <div className="list-title" onClick={onClick}>
      {isEditing ? (
        <textarea
          maxLength={512}
          onChange={(e) => onChange(e.target.value)}
          ref={textareaRef}
          defaultValue={list.name}
        ></textarea>
      ) : (
        <h2>{list.name}</h2>
      )}
    </div>
  );
}

export default ListTitle;

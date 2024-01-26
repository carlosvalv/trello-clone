import { useCallback, useEffect, useRef, useState } from "react";
import "./EditableText.css";
import DynamicHeightTextarea from "../DynamicTextArea";

type EditableTextProps = {
  defaultText: string;
  defaultEditing?: boolean;
  allowEmpty?: boolean;
  onChange(text: string): void;
  onExit?(): void;
};

EditableText.defaultProps= {
  defaultEditing : false,
  allowEmpty: false
}

function EditableText(props: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(props.defaultEditing);
  const textareaRef = useRef(null);

  const [name, setName] = useState(props.defaultText);

  const exitEditing = useCallback(() => {
    setIsEditing(false);
    if(props.onExit) props.onExit();
    if (!props.allowEmpty && name === "") return;
    props.onChange(name.trim());
  }, [name, props]);

  useEffect(() => {
    function handleClickOutside(event: any) {
      //@ts-ignore
      if (textareaRef.current && !textareaRef.current.contains(event.target)) {
        exitEditing();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [textareaRef, name, props, exitEditing]);

  const onClick = () => {
    setIsEditing(true);
  };

  const onChange = (text: string) => {
    if (text.split("\n").length > name.split("\n").length) {
      exitEditing();
      return;
    }

    setName(text);
  };

  return (
    <div className="editable-text" onClick={onClick}>
      {isEditing ? (
        <div ref={textareaRef} className="textarea-container">
          <DynamicHeightTextarea
            defaultValue={name}
            onChange={(text) => onChange(text)}
          />
        </div>
      ) : (
        <h2>{name}</h2>
      )}
    </div>
  );
}

export default EditableText;

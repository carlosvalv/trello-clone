import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

type DynamicHeightTextareaProps = {
  defaultValue: string;
  placeholder?: string;
  onChange: (text: string) => void;
};

const DynamicHeightTextarea = (props: DynamicHeightTextareaProps) => {
  const { defaultValue, placeholder, onChange } = props;
  const [text, setText] = useState(defaultValue);

  const handleChange = (event: any) => {
    setText(event.target.value);
    onChange(event.target.value);
  };

  return (
    <TextareaAutosize
      placeholder={placeholder}
      onChange={handleChange}
      value={text}
      maxLength={512}
    />
  );
};

export default DynamicHeightTextarea;

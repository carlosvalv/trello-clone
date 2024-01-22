import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

type DynamicHeightTextareaProps = {
  defaultValue: string;
  onChange: (text: string) => void;
};

const DynamicHeightTextarea = (props: DynamicHeightTextareaProps) => {
  const { defaultValue, onChange } = props;
  const [text, setText] = useState(defaultValue);

  const handleChange = (event: any) => {
    setText(event.target.value);
    onChange(event.target.value);
  };

  return (
    <TextareaAutosize
      onChange={handleChange}
      value={text}
      defaultValue={defaultValue}
      maxLength={512}
    />
  );
};

export default DynamicHeightTextarea;

import { useContext, useEffect, useRef } from "react";
import { ListContext } from "../ListView";
import { updateLists } from "../../../redux/states/list";
import { useDispatch, useSelector } from "react-redux";
import EditableText from "../../EditableText/EditableText";
import { AppStore } from "../../../redux/store";

function ListTitle() {
  const list = useContext(ListContext);
  const dispatch = useDispatch();
  const stateFocusedListId = useSelector(
    (store: AppStore) => store.list.focusedListId
  );
  const ref = useRef<HTMLDivElement>(null);

  const onChange = (text: string) => {
    if (text === "") return;
    let editList = { ...list };
    editList.name = text.trim();
    dispatch(updateLists([editList]));
  };

  useEffect(() => {
    if (list.id === stateFocusedListId && ref.current) {
      const childDiv = ref.current!.querySelector(".editable-text");
      if (childDiv) {
        (childDiv as HTMLElement).click();
        setTimeout(() => {
          let textArea = (childDiv as HTMLElement).querySelector("textarea");
          textArea?.focus();
          textArea?.select();
        }, 1);
      }
    }
  }, [stateFocusedListId, list.id]);

  return (
    <div style={{ flex: 1 }} ref={ref}>
      <EditableText
        allowEmpty={false}
        placeholder="Introduce the list name"
        defaultText={list.name}
        onChange={(text: string) => {
          onChange(text);
        }}
      />
    </div>
  );
}

export default ListTitle;

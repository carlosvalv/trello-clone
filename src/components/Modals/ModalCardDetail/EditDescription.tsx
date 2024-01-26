import { useState } from "react";
import EditableText from "../../EditableText/EditableText";
import { useDispatch, useSelector } from "react-redux";
import { AppStore } from "../../../redux/store";
import { selectCardById } from "../../../redux/selectors/card";
import { updateCards } from "../../../redux/states/card";

type EditDescriptionProps = {
  id: string;
};

function EditDescription(props: EditDescriptionProps) {
  const dispatch = useDispatch();

  const [editing, setEditing] = useState(false);
  
  const card = useSelector(
    (store: AppStore) => selectCardById(store.cards, props.id)[0]
  );

  const onDescChange = (desc: string) => {
    let updateCard = { ...card };
    updateCard.description = desc;
    dispatch(updateCards([updateCard]));
  };
  return (
    <div className="description">
      <h2>Description</h2>
      {(card.description || editing) ? (
        <EditableText
          defaultText={card.description ?? ""}
          defaultEditing={editing}
          onChange={(text: string)=>{onDescChange(text)}}
          allowEmpty={true}
          onExit={() => {
            if(editing) setEditing(false)
          }}
        />
      ) : (
        <div className="add-description" onClick={()=>setEditing(true)}>Add a detailed description...</div>
      )}
    </div>
  );
}

export default EditDescription;

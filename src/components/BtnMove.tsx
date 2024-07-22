import React, { useEffect, useRef } from "react";
import Button from "./Button";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { MenuItem, Popper, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppStore } from "../redux/store";
import { updateLists } from "../redux/states/list";

const Text = styled.span`
  font-size: 14px;
`;

type BtnMoveProps = {
  onClick(event: React.MouseEvent<HTMLElement>): void;
  id: string;
};

function BtnMove(props: BtnMoveProps) {
  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const currentList = useSelector((store: AppStore) =>
    store.lists.find((x) => x.cards.includes(props.id))
  );
  const [selectedList, setSelectedList] = React.useState<string>(
    currentList?.id ?? ""
  );
  const lists = useSelector((store: AppStore) => store.lists);

  const moveToList = (list: string) => {
    if (!list || list === currentList?.id) return;

    let listCopy = { ...currentList };

    let i = lists.findIndex((x) => x.id === list);

    let listMove = { ...lists[i] };
    listCopy.cards = listCopy.cards!.filter((x) => x !== props.id);
    listMove.cards = [...listMove.cards];
    listMove.cards.push(props.id);
    dispatch(updateLists([listCopy, listMove]));
  };

  const onMoveCard = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(anchor ? null : event.currentTarget);
  };


  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;

    if (ref.current && !ref.current.contains(event.target as Node) && !document.querySelector('.MuiPaper-root')?.contains(target)) {
      setAnchor(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const open = Boolean(anchor);
  const id = open ? "simple-popper" : undefined;

  const PopupBody = styled("div")(
    () => css`
      padding: 0.5rem 1rem;
      border-radius: 8px;
      box-shadow: 0px 4px 8px rgb(0 0 0 / 0.1);
      min-height: 3rem;
      display: flex;
      align-items: center;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      gap: 16px;

      .MuiSelect-select{
        padding-top: 10px;
        padding-bottom: 10px;
      }
    `
  );

  return (
    <>
      <Button onClick={(event) => onMoveCard(event)}>
        <Text>Move</Text>
      </Button>
      <Popper
        id={id}
        open={open}
        anchorEl={anchor}
        placement={"top"}
        style={{ zIndex: 1300 }}
      >
        <PopupBody ref={ref}>
          <Select
            style={{fontSize:14}}
            value={selectedList}
            
            onChange={(e: any) => {
              setSelectedList(e.target.value);
              moveToList(e.target.value);
            }}
          >
            {lists.map((list) => {
              return (
                <MenuItem onChange={() => {}} key={list.id} value={list.id}>
                  {list.name}
                </MenuItem>
              );
            })}
          </Select>
        </PopupBody>
      </Popper>
    </>
  );
}

export default BtnMove;

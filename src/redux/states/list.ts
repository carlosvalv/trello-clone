import { createSlice } from "@reduxjs/toolkit";
import { List, ListRedux } from "../../types/List";
import { LocalStorageTypes } from "../../enums/localStorage";
import { getLocalStorage, setLocalStorage } from "../../utilities/localStorage";
import { v4 as uuidv4 } from "uuid";
import { arrayMove } from "../../utilities/array";

const initialState : ListRedux = {
  lists: getLocalStorage(LocalStorageTypes.LISTS)
    ? JSON.parse(getLocalStorage(LocalStorageTypes.LISTS) as string)
    : [],
  focusedListId: undefined,
};

export const listsSlice = createSlice({
  name: "lists",
  initialState: initialState,
  reducers: {
    addList: (state, action) => {
      const list = [...state.lists, action.payload];
      setLocalStorage(LocalStorageTypes.LISTS, JSON.stringify(list));
      const newState = { lists: list, focusedListId: action.payload.id };
      return newState;
    },
    updateLists: (state, action) => {
      const newState = state.lists.map((list: List) => {
        let newList = action.payload.filter((x: List) => x.id === list.id);
        if (newList.length) return newList[0];
        return list;
      });

      setLocalStorage(LocalStorageTypes.LISTS, JSON.stringify(newState));
      return {...state, lists: newState};
    },
    deleteList: (state, action) => {
      const newState = state.lists.filter(
        (list: List) => list.id !== action.payload
      );
      setLocalStorage(LocalStorageTypes.LISTS, JSON.stringify(newState));
      return {...state, lists: newState};
    },
    reorderList: (state, action) => {
      const newState = arrayMove(
        state.lists,
        action.payload[0],
        action.payload[1]
      );
      setLocalStorage(LocalStorageTypes.LISTS, JSON.stringify(newState));
      return {...state, lists: newState};
    },
  },
});

export const { addList, updateLists, deleteList, reorderList } =
  listsSlice.actions;

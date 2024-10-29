import { createSlice } from "@reduxjs/toolkit";
import { List, ListRedux } from "../../types/List";
import { LocalStorageTypes } from "../../enums/localStorage";
import { getLocalStorage, setLocalStorage } from "../../utilities/localStorage";
import { arrayMove } from "../../utilities/array";

const initialState: ListRedux = {
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
      state.lists.push(action.payload);
      state.focusedListId = action.payload.id;
      setLocalStorage(LocalStorageTypes.LISTS, JSON.stringify(state.lists));
    },
    updateLists: (state, action) => {
      state.lists = state.lists.map((list: List) => {
        const newList = action.payload.filter((x: List) => x.id === list.id);
        if (newList.length) return newList[0];
        return list;
      });

      setLocalStorage(LocalStorageTypes.LISTS, JSON.stringify(state.lists));
    },
    deleteList: (state, action) => {
      state.lists = state.lists.filter(
        (list: List) => list.id !== action.payload
      );

      setLocalStorage(LocalStorageTypes.LISTS, JSON.stringify(state.lists));
    },
    reorderList: (state, action) => {
      state.lists = arrayMove(
        state.lists,
        action.payload[0],
        action.payload[1]
      );

      setLocalStorage(LocalStorageTypes.LISTS, JSON.stringify(state.lists));
    },
  },
});

export const { addList, updateLists, deleteList, reorderList } =
  listsSlice.actions;

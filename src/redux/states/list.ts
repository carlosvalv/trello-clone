import { createSlice } from "@reduxjs/toolkit";
import { List } from "../../types/List";
import { LocalStorageTypes } from "../../enums/localStorage";
import { getLocalStorage, setLocalStorage } from "../../utilities/localStorage";

const initialState: List[] = [
  { id: "1", cards: ["1", "2"] },
  { id: "2", cards: ["3", "4"] },
];

export const listsSlice = createSlice({
  name: "lists",
  initialState: getLocalStorage(LocalStorageTypes.LISTS)
    ? JSON.parse(getLocalStorage(LocalStorageTypes.LISTS) as string)
    : initialState,
  reducers: {
    addList: (state, action) => {
      const newState = [...state, action.payload];
      setLocalStorage(LocalStorageTypes.LISTS, JSON.stringify(newState));
      return newState;
    },
    removeCard: (state, action) => {
      console.log(state, action);
    },
  },
});

export const { addList } = listsSlice.actions;

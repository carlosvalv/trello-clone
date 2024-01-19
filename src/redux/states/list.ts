import { createSlice } from "@reduxjs/toolkit";
import { List } from "../../types/List";
import { LocalStorageTypes } from "../../enums/localStorage";
import { getLocalStorage, setLocalStorage } from "../../utilities/localStorage";
import {v4 as uuidv4} from 'uuid';

const initialState: List[] = [
  { id: uuidv4(), cards: ["1", "2"] },
  { id: uuidv4(), cards: ["3", "4"] },
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
    updateLists: (state, action) => {
      const newState = state.map((list: List) => {
        let newList = action.payload.filter((x: List) => x.id === list.id);
        if (newList.length) return newList[0];
        return list;
      });

      setLocalStorage(LocalStorageTypes.LISTS, JSON.stringify(newState));
      return newState;
    },
  },
});

export const { addList, updateLists } = listsSlice.actions;

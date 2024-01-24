import { configureStore } from "@reduxjs/toolkit";
import { List } from "../types/List";
import { listsSlice } from "./states/list";
import { Card } from "../types/Card";
import { cardsSlice } from "./states/card";

export interface AppStore {
  lists: List[];
  cards: Card[];
}

export default configureStore<AppStore>({
  reducer: {
    lists: listsSlice.reducer,
    cards: cardsSlice.reducer,
  },
});

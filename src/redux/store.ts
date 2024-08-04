import { configureStore } from "@reduxjs/toolkit";
import { List } from "../types/List";
import { listsSlice } from "./states/list";
import { Card } from "../types/Card";
import { cardsSlice } from "./states/card";
import { Modal } from "../types/Modal";
import { modalsSlice } from "./states/modal";

export interface AppStore {
  lists: List[];
  cards: Card[];
  modal: Modal;
}

export default configureStore<AppStore>({
  reducer: {
    lists: listsSlice.reducer,
    cards: cardsSlice.reducer,
    modal : modalsSlice.reducer
  },
});
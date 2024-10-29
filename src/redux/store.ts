import { configureStore } from "@reduxjs/toolkit";
import { List, ListRedux } from "../types/List";
import { listsSlice } from "./states/list";
import { Card, CardRedux } from "../types/Card";
import { cardsSlice } from "./states/card";
import { Modal } from "../types/Modal";
import { modalsSlice } from "./states/modal";

export interface AppStore {
  list: ListRedux;
  card: CardRedux;
  modal: Modal;
}

export default configureStore<AppStore>({
  reducer: {
    list: listsSlice.reducer,
    card: cardsSlice.reducer,
    modal : modalsSlice.reducer
  },
});

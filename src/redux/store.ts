import { configureStore } from "@reduxjs/toolkit";
import { List } from "../types/List";
import { listsSlice } from "./states/list";

export interface AppStore {
  lists: List[];
}

export default configureStore<AppStore>({
  reducer: {
    lists: listsSlice.reducer,
  },
});

import { createSlice } from "@reduxjs/toolkit";
import { LocalStorageTypes } from "../../enums/localStorage";
import { getLocalStorage, setLocalStorage } from "../../utilities/localStorage";
import { Card } from "../../types/Card";

const initialState: Card[] = [
  { id: "1", title: "Card 1" },
  { id: "2", title: "Card 2" },
  { id: "3", title: "Card 3" },
  { id: "4", title: "Card 4" },
];

export const cardsSlice = createSlice({
  name: "cards",
  initialState: getLocalStorage(LocalStorageTypes.CARDS)
    ? JSON.parse(getLocalStorage(LocalStorageTypes.CARDS) as string)
    : initialState,
  reducers: {
    addCard: (state, action) => {
      const newState = [...state, action.payload];
      setLocalStorage(LocalStorageTypes.CARDS, JSON.stringify(newState));
      return newState;
    },
    updateCards: (state, action) => {
      const newState = state.map((card: Card) => {
        let newCard = action.payload.filter((x: Card) => x.id === card.id);
        if (newCard.length) return newCard[0];
        return card;
      });

      setLocalStorage(LocalStorageTypes.CARDS, JSON.stringify(newState));
      return newState;
    },
    deleteCards: (state, action) => {
      const cardsId: string[] = action.payload;
      const newState = state.filter((list: Card) => !cardsId.includes(list.id));
      setLocalStorage(LocalStorageTypes.CARDS, JSON.stringify(newState));
      return newState;
    },
  },
});

export const { addCard, updateCards, deleteCards } = cardsSlice.actions;

import { createSlice } from "@reduxjs/toolkit";
import { LocalStorageTypes } from "../../enums/localStorage";
import { getLocalStorage, setLocalStorage } from "../../utilities/localStorage";
import { Card, CardRedux } from "../../types/Card";

const initialCards: Card[] = [
  { id: "1", title: "Card 1" },
  { id: "2", title: "Card 2" },
  { id: "3", title: "Card 3" },
  { id: "4", title: "Card 4" },
];

const initialState: CardRedux = {
  cards: getLocalStorage(LocalStorageTypes.CARDS)
  ? JSON.parse(getLocalStorage(LocalStorageTypes.CARDS) as string)
  : initialCards,
  focusedCardId: undefined
}

export const cardsSlice = createSlice({
  name: "cards",
  initialState: initialState,
  reducers: {
    addCard: (state, action) => {
      state.cards.push(action.payload);
      state.focusedCardId = action.payload.id;
      setLocalStorage(LocalStorageTypes.CARDS, JSON.stringify(state.cards));
    },
    updateCards: (state, action) => {
      state.cards = state.cards.map((card: Card) => {
        let newCard = action.payload.filter((x: Card) => x.id === card.id);
        if (newCard.length) return newCard[0];
        return card;
      });
      state.focusedCardId = undefined;

      setLocalStorage(LocalStorageTypes.CARDS, JSON.stringify(state.cards));
    },
    deleteCards: (state, action) => {
      const cardsId: string[] = action.payload;
      state.cards = state.cards.filter((list: Card) => !cardsId.includes(list.id));
      state.focusedCardId = undefined;
      setLocalStorage(LocalStorageTypes.CARDS, JSON.stringify(state.cards));
    },
    
  },
});

export const { addCard, updateCards, deleteCards } = cardsSlice.actions;

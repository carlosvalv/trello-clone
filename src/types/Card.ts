export type CardRedux = {
  cards: Card[];
  focusedCardId?: string;
};

export type Card = {
  id: string;
  title: string;
  description?: string;
};

export type ListRedux = {
  lists: List[];
  focusedListId?: string;
};

export type List = {
  id: string;
  name: string;
  cards: string[];
};

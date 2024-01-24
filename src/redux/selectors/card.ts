import { Card } from "../../types/Card";

export function selectCardById(state : Card[], id: string) {
  return state.filter(x=>x.id === id);
}
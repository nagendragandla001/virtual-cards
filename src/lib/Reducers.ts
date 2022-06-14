export interface CardProps {
  card_name: string;
  card_last_four: string;
  expiry: string;
  colour: string;
}

export const cardsReducer = (state: any = {}, action: any) => {
  switch (action.type) {
    // Find the if any existing card is available, if yes, Update the same card. else create a new card
    case "ADD_CARD": {
      const index = state.cards.findIndex(
        (c: any) => c.card_name === action.payload.card_name
      );

      if (index > -1) {
        state.cards[index] = { ...state.cards[index], ...action.payload };
        return { ...state, cards: [...state.cards] };
      } else {
        return { ...state, cards: [...state.cards, { ...action.payload }] };
      }
    }
    // Get the current card on Clicking any card on cardslist
    case "CURRENT_CARD":
      return { ...state, selectedCard: { ...action.payload } };
    // Update the selected card info
    case "UPDATE_CARD":
      return {
        ...state,
        selectedCard: { ...state.selectedCard, ...action.payload },
      };
    default:
      return state;
  }
  return state;
};

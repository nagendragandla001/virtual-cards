import { createContext, useContext, useReducer } from "react";
import { cardsReducer } from "./Reducers";

const CardsContext = createContext({ state: { cards: [], selectedCard: {} }, dispatch: () => undefined } as any);

export interface CardProps {
  card_name: string;
  card_last_four: string;
  expiry: string;
  colour: string;
}

const Context = ({ children }: any) => {
  const [state, dispatch] = useReducer(cardsReducer, {
    cards: [
      {
        card_name: "Nagendra Gandla",
        card_last_four: "1234",
        expiry: "03/28",
        colour: "#121a30",
      },
      {
        card_name: "Krishna",
        card_last_four: "5678",
        expiry: "04/27",
        colour: "#e5304d",
      },
      {
        card_name: "Koushik",
        card_last_four: "4567",
        expiry: "03/29",
        colour: "#f55732",
      },
      {
        card_name: "Robert",
        card_last_four: "4315",
        expiry: "03/30",
        colour: "#f69e1c",
      },
    ] as Array<CardProps>,
    selectedCard: {} as CardProps,
  });

  return (
    <CardsContext.Provider value={{ state, dispatch }}>
      {children}
    </CardsContext.Provider>
  );
};

export default Context;

export const CardState = () => {
  return useContext(CardsContext);
};

import { useState } from "react";
import { CardProps, CardState } from "../../lib/Context";
import Card from "../card/Card";
import Modal from "../modal/Modal";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import "./Cards.scss";

const Cards = (): JSX.Element => {
  const itemCount = 3; // We can enhance the carousel feature based on the count input
  const { state: { cards, selectedCard }, dispatch } = CardState();

  const [carousel, setCarousel] = useState({
    start: 0,
    end: itemCount - 1,
  });

  const [show, setShow] = useState(false);

  const handleLeft = (): void => {
    if (carousel.start <= 0) {
      setCarousel({
        start: cards.length - itemCount,
        end: cards.length - 1,
      });
    } else {
      setCarousel({
        start: carousel.start - itemCount,
        end: carousel.start - 1,
      });
    }
  };
  const handleRight = (): void => {
    if (carousel.end + 1 < cards.length) {
      setCarousel({ start: carousel.end + 1, end: carousel.end + itemCount });
    } else {
      setCarousel({ start: 0, end: itemCount - 1 });
    }
  };

  const handleCreateCard = (): void => {
    dispatch({
      type: "CURRENT_CARD",
      payload: {
        card_name: "",
        card_last_four: "",
        expiry: "00/00",
        colour: "#131a30",
      },
    });
    setShow(true);
  };

  const handleCardClick = (card: CardProps): void => {
    dispatch({ type: "CURRENT_CARD", payload: card });
    setShow(true);
  }

  const handleModalClose = (): void => {
    setShow(false);
  };

  return (
    <>
      <section className="cards-container" data-testid="cards">
        <div className="create-card-container" onClick={handleCreateCard}>
          <button className="add-btn">+</button>
          <span className="btn-text">Create/Activate Cards</span>
        </div>
        <div className="cards-carousel">
          <button className="left" onClick={handleLeft}><AiOutlineLeft /></button>
          <button className="right" onClick={handleRight}><AiOutlineRight /></button>
          <div className="card-list">
            {cards.map(
              (card: CardProps, index: number) =>
                index >= carousel.start &&
                index <= carousel.end && (
                  <div key={card.card_name} className="card-wrapper" onClick={(): void => handleCardClick(card)}>
                    <Card
                      card_name={card.card_name}
                      card_last_four={card.card_last_four}
                      expiry={card.expiry}
                      colour={card.colour} />
                  </div>
                )
            )}
          </div>
        </div>
      </section>
      <Modal
        visible={show}
        onClose={handleModalClose}
        children={
          <Card
            card_name={selectedCard.card_name}
            card_last_four={selectedCard.card_last_four}
            expiry={selectedCard.expiry}
            colour={selectedCard.colour}
          />
        }
      />
    </>
  );
};

export default Cards;

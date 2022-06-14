import { CardProps } from "../../lib/Reducers";
import { CardState } from "../../lib/Context";
import { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import "./Card.scss";


const Card = ({ card_name, card_last_four, expiry, colour }: CardProps): JSX.Element => {
  const { dispatch } = CardState();

  const [toggleState, setToggleState] = useState({
    card_name: false,
    card_last_four: false,
    expiry: false,
  });

  const handleChange = (key: string, value: string): void => {
    dispatch({
      type: "UPDATE_CARD",
      payload: { [key]: value },
    });
  };

  const updateToggleState = (key: string, value: boolean): void => {
    setToggleState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <section className="card-container"
      data-testid={`card-${card_name}`}
      style={{ background: colour || '#131a30' }}>
      {toggleState.card_name ? (
        <input
          type="text"
          value={card_name}
          onChange={(e) => handleChange("card_name", e.target.value)}
          onBlur={(): void => updateToggleState("card_name", false)}
          required
        />
      ) : (
        <span onDoubleClick={(): void => updateToggleState("card_name", true)}>
          {card_name ? (
            card_name
          ) : (
            <span>
              Name <AiFillEdit />
            </span>
          )}
        </span>
      )}
      {toggleState.card_last_four ? (
        <div>
          <span>**** **** ****</span>
          <input
            type="text"
            value={card_last_four}
            onChange={(e) => handleChange("card_last_four", e.target.value)}
            onBlur={(): void => updateToggleState("card_last_four", false)}
          />
        </div>
      ) : (
        <div
          onDoubleClick={(): void => updateToggleState("card_last_four", true)}
        >
          **** **** ****{" "}
          {card_last_four ? (
            card_last_four
          ) : (
            <span>
              {" "}
              <AiFillEdit className="cursor-pointer" />
            </span>
          )}
        </div>
      )}
      <div>
        <label>Expiry</label>
        {toggleState.expiry ? (
          <div>
            <input
              type="text"
              value={expiry}
              onChange={(e) => handleChange("expiry", e.target.value)}
              onBlur={(): void => updateToggleState("expiry", false)}
            />
          </div>
        ) : (
          <div onDoubleClick={(): void => updateToggleState("expiry", true)}>
            {expiry}
          </div>
        )}
      </div>
      <div className="logo">
        <div className="logo-1"></div>
        <div className="logo-2"></div>
      </div>
    </section>
  );
};

export default Card;

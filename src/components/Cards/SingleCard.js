import React from "react";
import "./SingleCard.css";

const SingleCard = ({ card, ChoiceHandler, flipped }) => {
  const ChangeHandler = () => {
    ChoiceHandler(card);
  };
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="ft" src={card.pic} alt="img" />
        <img
          className="bk"
          src="/img/cover.png"
          alt="cover"
          onClick={ChangeHandler}
        />
      </div>
    </div>
  );
};

export default SingleCard;

import { useState, useEffect } from "react";
import "./App.css";
import SingleCard from "./components/Cards/SingleCard";

const cardImg = [
  { pic: "/img/angular.png", matched: false },
  { pic: "/img/bootstrap.png", matched: false },
  { pic: "/img/css.png", matched: false },
  { pic: "/img/js.png", matched: false },
  { pic: "/img/firebase.png", matched: false },
  { pic: "/img/react.png", matched: false },
];

function App() {
  const [cards, setCards] = useState();
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  const sufflecards = () => {
    const shuffledCards = [...cardImg, ...cardImg]
      .sort(() => Math.random() * 2 - 1.7)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  const ChoiceHandler = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.pic === choiceTwo.pic) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.pic === choiceOne.pic) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 700);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    sufflecards();
  }, []);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((turns) => turns + 1);
  };

  return (
    <div className="App">
      <h1>Picture Matching Game</h1>
      <button onClick={sufflecards}>New Game</button>
      <p>Turn:{turns}</p>
      <div className="card-grid">
        {cards?.map((card) => (
          <SingleCard
            card={card}
            key={card.id}
            ChoiceHandler={ChoiceHandler}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

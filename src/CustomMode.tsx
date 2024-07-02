import { useState } from "react";
import CustomForm from "./CustomForm";
import FlashCard from "./FlashCard";

const CustomMode = () => {
  const [displayIndex, setDisplayIndex] = useState(0);
  const [nextCard, setNextCard] = useState({ front: "", back: "" });
  const [cards, setCards] = useState([{ front: "", back: "" }]);
  const currentCard = cards[displayIndex];

  const handleCardChange = () => {
    const nextIndex = (displayIndex + 1) % cards.length;
    setDisplayIndex(nextIndex);
  };

  const handleFormChange = (e: any) => {
    const { name, value } = e.target;
    setNextCard({ ...nextCard, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (cards[0].front === "") {
      setCards([nextCard]);
    } else {
      setCards([...cards, nextCard]);
      setDisplayIndex(cards.length);
    }
    setNextCard({ front: "", back: "" });
  };

  return (
    <>
      <CustomForm
        nextCard={nextCard}
        handleFormChange={handleFormChange}
        handleSubmit={handleSubmit}
      />
      <FlashCard content={currentCard} />
      <button className="next-button" onClick={handleCardChange}>
        Next question
      </button>
      <h1>Flashcards</h1>
    </>
  );
};

export default CustomMode;

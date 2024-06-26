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
    setCards([...cards, nextCard]);
    setNextCard({ front: "", back: "" });
    setDisplayIndex(() => cards.length);
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
    </>
  );
};

export default CustomMode;

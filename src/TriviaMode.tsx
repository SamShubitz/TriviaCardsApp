import { useState, useEffect } from "react";
import FlashCard from "./FlashCard";

const TriviaMode = () => {
  const [triviaCard, setTriviaCard] = useState({ front: "", back: "" });
  const [nextQuestion, setNextQuestion] = useState(false);

  const handleClick = () => {
    setNextQuestion(!nextQuestion);
  };

  useEffect(() => {
    const fetchTrivia = async () => {
      try {
        const response = await fetch("http://numbersapi.com/random");
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }
        const triviaString = await response.text();
        const [answer, ...question] = triviaString.split(" ");
        const triviaCard = {
          front: `_____ ${question.join(" ")}`,
          back: answer,
        };
        setTriviaCard(triviaCard);
      } catch (error) {
        console.error("Somethin' went wrong", error);
      }
    };
    fetchTrivia();
  }, [nextQuestion]);

  return (
    <>
      <FlashCard content={triviaCard} nextQuestion={nextQuestion} />
      <button onClick={handleClick}>Next question</button>
    </>
  );
};

export default TriviaMode;

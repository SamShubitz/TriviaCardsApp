import { useState, useEffect } from "react";
import FlashCard from "./FlashCard";

const TriviaMode = () => {
  const [triviaCard, setTriviaCard] = useState({ front: "", back: "" });
  const [triviaMode, setTriviaMode] = useState("Numbers");
  const [nextQuestion, setNextQuestion] = useState(false);

  const handleClick = () => {
    setNextQuestion(!nextQuestion);
  };

  const handleModeSelect = (e: any) => {
    const selectedMode = e.target.value;
    setTriviaMode(selectedMode);
    setNextQuestion(!nextQuestion);
  };

  const url =
    triviaMode === "Numbers"
      ? "http://numbersapi.com/random"
      : "https://pokeapi.co/api/v2/pokemon-species";

  const fetchNumbersTrivia = async () => {
    try {
      const response = await fetch(url);
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

  const fetchPokemonTrivia = async () => {
    const pokeID = Math.floor(Math.random() * 151) + 1;
    try {
      const response = await fetch(`${url}/${pokeID}`);
      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }
      const pokeData = await response.json();
      const filteredText = pokeData.flavor_text_entries.filter(
        (entry: any) => entry.language.name === "en"
      );
      const name =
        pokeData.name.charAt(0).toUpperCase() + pokeData.name.slice(1);
      const description = filteredText[0].flavor_text;

      setTriviaCard({ front: description, back: name });
    } catch (error) {
      console.error("Something went wrong", error);
    }
  };

  useEffect(() => {
    triviaMode === "Numbers" ? fetchNumbersTrivia() : fetchPokemonTrivia();
  }, [nextQuestion]);

  return (
    <>
      <FlashCard content={triviaCard} nextQuestion={nextQuestion} />
      <button onClick={handleClick}>Next question</button>
      <select className="mode-select" onChange={handleModeSelect}>
        <option value="Numbers">Numbers</option>
        <option value="Pokémon">Pokémon</option>
      </select>
      <h1>{triviaMode}</h1>
    </>
  );
};

export default TriviaMode;

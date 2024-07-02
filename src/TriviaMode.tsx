import { useState, useEffect } from "react";
import FlashCard from "./FlashCard";

const TriviaMode = () => {
  const [triviaCard, setTriviaCard] = useState({ front: "", back: "" });
  const [triviaMode, setTriviaMode] = useState("General");
  const [nextQuestion, setNextQuestion] = useState(false);

  const currentUrl =
    triviaMode === "General"
      ? "https://the-trivia-api.com/v2/questions/"
      : "https://pokeapi.co/api/v2/pokemon-species";

  const handleClick = () => {
    setNextQuestion(!nextQuestion);
  };

  const handleModeSelect = (e: any) => {
    const selectedMode = e.target.value;
    setTriviaMode(selectedMode);
    setNextQuestion(!nextQuestion);
  };

  const httpGet = async (url: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Something went wrong:", error);
      return null;
    }
  };

  const fetchGeneralTrivia = async () => {
    const triviaString = await httpGet(currentUrl);
    if (triviaString) {
      const question = triviaString[0].question.text;
      const answer = triviaString[0].correctAnswer;
      const triviaCard = {
        front: question,
        back: answer,
      };
      setTriviaCard(triviaCard);
    } else {
      console.error("Failed to get trivia");
    }
  };

  const fetchPokemonTrivia = async () => {
    const pokeID = Math.floor(Math.random() * 151) + 1;
    const pokeData = await httpGet(`${currentUrl}/${pokeID}`);
    const filteredText = pokeData.flavor_text_entries.filter(
      (entry: any) => entry.language.name === "en"
    );
    const name = pokeData.name.charAt(0).toUpperCase() + pokeData.name.slice(1);
    const description = filteredText[0].flavor_text;
    setTriviaCard({ front: description, back: name });
  };

  useEffect(() => {
    triviaMode === "General" ? fetchGeneralTrivia() : fetchPokemonTrivia();
  }, [nextQuestion]);

  return (
    <>
      <FlashCard content={triviaCard} />
      <button onClick={handleClick}>Next question</button>
      <select className="mode-select" onChange={handleModeSelect}>
        <option value="General">General</option>
        <option value="Pokémon">Pokémon</option>
      </select>
      <h1>{triviaMode}</h1>
    </>
  );
};

export default TriviaMode;

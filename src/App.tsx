import { useState } from "react";
import CustomMode from "./CustomMode";
import TriviaMode from "./TriviaMode";
import "./App.css";

export interface Card {
  front: string;
  back: string;
}

function App() {
  const [triviaMode, setTriviaMode] = useState(true);
  let otherMode = triviaMode ? "flash card mode" : "trivia mode";

  const toggleMode = () => {
    setTriviaMode(!triviaMode);
  };

  return (
    <>
      {triviaMode ? <TriviaMode /> : <CustomMode />}
      <button onClick={toggleMode}>Switch to {otherMode}</button>
    </>
  );
}

export default App;

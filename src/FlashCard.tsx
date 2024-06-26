import { useState, useEffect } from "react";
import { Card } from "./App";

const FlashCard = ({
  content,
  nextQuestion = false,
}: {
  content: Card;
  nextQuestion?: boolean;
}) => {
  const [frontDisplay, setFrontDisplay] = useState(true);

  const handleDisplayChange = () => {
    setFrontDisplay(!frontDisplay);
  };

  useEffect(() => {
    setFrontDisplay(true);
  }, [nextQuestion]);

  return (
    <div className="flash-card">
      <span onClick={handleDisplayChange}>
        {frontDisplay ? content.front : content.back}
      </span>
    </div>
  );
};

export default FlashCard;

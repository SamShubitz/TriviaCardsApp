import { useState } from "react";
import { Card } from "./App";

const FlashCard = ({ content }: { content: Card }) => {
  const [frontDisplay, setFrontDisplay] = useState(true);

  const handleDisplayChange = () => {
    setFrontDisplay(!frontDisplay);
  };

  return (
    <div className="flash-card">
      <span onClick={handleDisplayChange}>
        {frontDisplay ? content.front : content.back}
      </span>
    </div>
  );
};

export default FlashCard;

import { Card } from "./App";

const CustomForm = ({
  nextCard,
  handleFormChange,
  handleSubmit,
}: {
  nextCard: Card;
  handleFormChange: (e: any) => void;
  handleSubmit: (e: any) => void;
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="question-input">
        <input
          id="question-input"
          name="front"
          type="text"
          value={nextCard.front}
          onChange={handleFormChange}
          required
        />
        <input
          id="answer-input"
          name="back"
          type="text"
          value={nextCard.back}
          onChange={handleFormChange}
          required
        />
      </label>
      <button type="submit">Add card</button>
    </form>
  );
};

export default CustomForm;

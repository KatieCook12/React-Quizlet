import Button from "./Button";

type QuestionCardProps = {
  number: number;
  question: string;
  options: string[];
  correct_answer: string;
  submitted: boolean;
  selectedIndex: number | null;
  onSelect: (index: number) => void;
};

export default function QuestionCard({
  number,
  question,
  options = [],
  correct_answer,
  submitted,
  selectedIndex,
  onSelect,
}: QuestionCardProps): React.JSX.Element {
  const handleClick = (index: number): void => {
    if (submitted) return;
    onSelect(index);
  };

  const isAnswered = selectedIndex !== null && selectedIndex !== undefined;
  const score = isAnswered && options[selectedIndex] === correct_answer ? 1 : 0;

  return (
    <div className="question-card">
      <h3>{`Question ${number} of 5`}</h3>

      <div className="question-and-options">
        <h2>{question}</h2>

        <div className="options">
          {options.map((option, i) => {
            const isSelected = selectedIndex === i;
            const isCorrectOption = option === correct_answer;
            const showAsCorrect = submitted && isCorrectOption;
            const showAsWrong = submitted && isSelected && !isCorrectOption;
            const showASDisabled = submitted && !isSelected && !isCorrectOption;

            return (
              <Button
                key={i}
                option={option}
                onClick={() => handleClick(i)}
                isSelected={isSelected}
                showAsCorrect={showAsCorrect}
                showAsWrong={showAsWrong}
                showASDisabled={showASDisabled}
              />
            );
          })}
        </div>
      </div>

      {submitted ? <h4>{score === 1 ? "Correct" : "Incorrect"}</h4> : " "}
    </div>
  );
}

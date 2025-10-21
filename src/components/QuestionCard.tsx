import React from "react";
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
  const questionId = React.useId();
  const feedbackRef = React.useRef<HTMLDivElement>(null);

  const handleClick = (index: number): void => {
    if (submitted) return;
    onSelect(index);
  };

  const isAnswered = selectedIndex !== null && selectedIndex !== undefined;
  const score = isAnswered && options[selectedIndex] === correct_answer ? 1 : 0;

  React.useEffect(() => {
    if (submitted && feedbackRef.current) {
      feedbackRef.current.focus();
    }
  }, [submitted]);

  return (
    <section
      className="question-card"
      aria-labelledby={questionId}
    >
      <h3 aria-hidden="true">{`Question ${number} of 5`}</h3>

      <div className="question-and-options">
        <h2 id={questionId}>
          <span className="sr-only">Question {number} of 5: </span>
          {question}
        </h2>

        <div
          role="radiogroup"
          aria-labelledby={questionId}
          aria-required="true"
          className="options"
        >
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
                submitted={submitted}
                isCorrectOption={isCorrectOption}
              />
            );
          })}
        </div>
      </div>

      {submitted ? (
        <div
          ref={feedbackRef}
          tabIndex={-1}
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <h4>
            {score === 1 ? (
              <>
                <span className="sr-only">Your answer is </span>
                Correct
              </>
            ) : (
              <>
                <span className="sr-only">Your answer is </span>
                Incorrect
              </>
            )}
          </h4>
        </div>
      ) : (
        <div aria-hidden="true" style={{ minHeight: "1.5em" }}></div>
      )}
    </section>
  );
}

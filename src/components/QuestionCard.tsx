import Button from "./Button";
import React from "react";

interface QuestionCardProps {
  number: number;
  question: string;
  options?: string[];
  correct_answer: string;
  submitted: boolean;
  selectedIndex: number | null;
  onSelect: (index: number) => void;
}

export default function QuestionCard({
  number,
  question,
  options = [],
  correct_answer,
  submitted,
  selectedIndex,
  onSelect,
}: QuestionCardProps) {
  // Handle answer selection
  const handleClick = (index: number) => {

    // Prevent changes after submission
    if (submitted) return;

    // Call parent function with selected option index
    onSelect(index);
  };

  // Check if an answer was selected
  const isAnswered = selectedIndex !== null && selectedIndex !== undefined;

  // Score for this question (1 if correct, otherwise 0)
  const score = isAnswered && options[selectedIndex] === correct_answer ? 1 : 0;

  return (
    <article className="question-card" aria-labelledby={`question-${number}`}>
      <h3>{`Question ${number} of 5`}</h3>

      <div className="question-and-options">
        <h2 id={`question-${number}`}>{question}</h2>

        <div className="options" role="group" aria-label="Answer choices">
          {options.map((option, i) => {

            // Check if option is selected
            const isSelected = selectedIndex === i;
            
            // Check if option is correct
            const isCorrectOption = option === correct_answer;
            
            // Highlight correct option
            const showAsCorrect = submitted && isCorrectOption;
            
            // Highlight wrong option
            const showAsWrong = submitted && isSelected && !isCorrectOption;

            // Disable others after submission
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

      {/* Show result text only after submission */}
      {submitted && (
        <h4 role="status" aria-live="polite">
          {score === 1 ? "Correct" : "Incorrect"}
        </h4>
      )}
    </article>
  );
}

import React from "react";
import Button from "./Button";

<<<<<<< HEAD
type QuestionCardProps = {
  number: number;
  question: string;
  options: string[];
  correct_answer: string;
  submitted: boolean;
  selectedIndex: number | null;
  onSelect: (index: number) => void;
};

=======
// Define the props accepted by the QuestionCard component
type QuestionCardProps = {
  number: number;                     // The question number in the quiz
  question: string;                   // The text of the current question
  options: string[];                  // Array of answer options
  correct_answer: string;             // The correct answer for the question
  submitted: boolean;                 // Whether the user has submitted their answer
  selectedIndex: number | null;       // Index of the selected option, or null if none
  onSelect: (index: number) => void;  // Callback triggered when an option is selected
};

// Component representing a single quiz question and its answer options
>>>>>>> 32b3d63 (Loading progress bar)
export default function QuestionCard({
  number,
  question,
  options = [],
  correct_answer,
  submitted,
  selectedIndex,
  onSelect,
}: QuestionCardProps): React.JSX.Element {
<<<<<<< HEAD
  const questionId = React.useId();
  const feedbackRef = React.useRef<HTMLDivElement>(null);

  const handleClick = (index: number): void => {
    if (submitted) return;
    onSelect(index);
  };

  const isAnswered = selectedIndex !== null && selectedIndex !== undefined;
  const score = isAnswered && options[selectedIndex] === correct_answer ? 1 : 0;

=======
  // Generate a unique ID for ARIA labeling (ensures accessibility for headings and groups)
  const questionId = React.useId();

  // Ref used to focus feedback message after submission (for screen reader users)
  const feedbackRef = React.useRef<HTMLDivElement>(null);

  // Handle option click: only allow selection if the quiz hasn't been submitted yet
  const handleClick = (index: number): void => {
    if (submitted) return; // Prevent interaction after submission
    onSelect(index);
  };

  // Determine if a question has been answered
  const isAnswered = selectedIndex !== null && selectedIndex !== undefined;

  // Calculate score for this question (1 if correct, 0 if not)
  const score = isAnswered && options[selectedIndex] === correct_answer ? 1 : 0;

  // Focus the feedback message after submission for better accessibility
>>>>>>> 32b3d63 (Loading progress bar)
  React.useEffect(() => {
    if (submitted && feedbackRef.current) {
      feedbackRef.current.focus();
    }
  }, [submitted]);

  return (
<<<<<<< HEAD
    <section
      className="question-card"
      aria-labelledby={questionId}
    >
      <h3 aria-hidden="true">{`Question ${number} of 5`}</h3>

      <div className="question-and-options">
=======
    <section className="question-card" aria-labelledby={questionId}>
      {/* Hidden heading for visual users; screen readers get more detailed context below */}
      <h3 aria-hidden="true">{`Question ${number} of 5`}</h3>

      <div className="question-and-options">
        {/* Question text with accessible numbering */}
>>>>>>> 32b3d63 (Loading progress bar)
        <h2 id={questionId}>
          <span className="sr-only">Question {number} of 5: </span>
          {question}
        </h2>

<<<<<<< HEAD
=======
        {/* Group of answer options represented as radio buttons */}
>>>>>>> 32b3d63 (Loading progress bar)
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
<<<<<<< HEAD
                onClick={() => handleClick(i)}
=======
                onClick={() => handleClick(i)}   // Handle selection
>>>>>>> 32b3d63 (Loading progress bar)
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

<<<<<<< HEAD
      {submitted ? (
        <div
          ref={feedbackRef}
          tabIndex={-1}
          role="status"
=======
      {/* Feedback section shown only after submission (layout may jump slightly) */}
      {submitted && (
        <div
          ref={feedbackRef}
          tabIndex={-1}                // Makes div focusable programmatically
          role="status"                // Announces content updates politely
>>>>>>> 32b3d63 (Loading progress bar)
          aria-live="polite"
          aria-atomic="true"
        >
          <h4>
<<<<<<< HEAD
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
=======
            <span className="sr-only">Your answer is </span>
            {score === 1 ? "Correct" : "Incorrect"}
          </h4>
        </div>
>>>>>>> 32b3d63 (Loading progress bar)
      )}
    </section>
  );
}

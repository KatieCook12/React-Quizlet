import React from "react";
import Button from "./Button";

/**
 * QuestionCardProps defines the expected properties for the QuestionCard component.
 *
 * - number: The current question number (e.g., 1, 2, 3...).
 * - question: The text of the quiz question.
 * - options: Array of possible answer choices.
 * - correct_answer: The correct answer text.
 * - submitted: Indicates if the user has submitted their answer.
 * - selectedIndex: The index of the currently selected option (or null if none).
 * - onSelect: Callback invoked when an option is selected.
 */
type QuestionCardProps = {
  number: number;
  question: string;
  options: string[];
  correct_answer: string;
  submitted: boolean;
  selectedIndex: number | null;
  onSelect: (index: number) => void;
};

/**
 * QuestionCard component displays a single quiz question along with its answer options.
 *
 * It handles user interaction (selecting answers), applies accessibility features,
 * and provides visual and screen-reader feedback after submission.
 */
export default function QuestionCard({
  number,
  question,
  options = [],
  correct_answer,
  submitted,
  selectedIndex,
  onSelect,
}: QuestionCardProps): React.JSX.Element {
  // Unique ID for labeling question text — improves accessibility.
  const questionId = React.useId();

  // Reference for the feedback message container, used for focus management.
  const feedbackRef = React.useRef<HTMLDivElement>(null);

  /**
   * handleClick()
   * Handles option selection.
   * Prevents further changes if the quiz has been submitted.
   */
  const handleClick = (index: number): void => {
    if (submitted) return;
    onSelect(index);
  };

  // Determines if the user has selected an option.
  const isAnswered = selectedIndex !== null && selectedIndex !== undefined;

  // Computes score for this question: 1 for correct, 0 for incorrect.
  const score =
    isAnswered && options[selectedIndex!] === correct_answer ? 1 : 0;

  /**
   * Focus management:
   * When the user submits an answer, move focus to the feedback message
   * for immediate accessibility feedback via screen readers.
   */
  React.useEffect(() => {
    if (submitted && feedbackRef.current) {
      feedbackRef.current.focus();
    }
  }, [submitted]);

  return (
    <section className="question-card" aria-labelledby={questionId}>
      {/* Hidden heading for screen-reader context and visible numbering for users */}
      <h3 aria-hidden="true">{`Question ${number} of 5`}</h3>

      <div className="question-and-options">
        {/* 
          The main question text.
          The span with 'sr-only' ensures screen readers read the question number contextually.
        */}
        <h2 id={questionId}>
          <span className="sr-only">Question {number} of 5: </span>
          {question}
        </h2>

        {/* 
          Container for answer options.
          Uses the "radiogroup" role to indicate mutually exclusive choices.
        */}
        <div
          role="radiogroup"
          aria-labelledby={questionId}
          aria-required="true"
          className="options"
        >
          {options.map((option, i) => {
            // Determine state for each option based on selection and submission status.
            const isSelected = selectedIndex === i;
            const isCorrectOption = option === correct_answer;
            const showAsCorrect = submitted && isCorrectOption;
            const showAsWrong = submitted && isSelected && !isCorrectOption;
            const showAsDisabled = submitted && !isSelected && !isCorrectOption;

            return (
              <Button
                key={i}
                option={option}
                onClick={() => handleClick(i)}
                isSelected={isSelected}
                showAsCorrect={showAsCorrect}
                showAsWrong={showAsWrong}
                showAsDisabled={showAsDisabled}
                submitted={submitted}
                isCorrectOption={isCorrectOption}
              />
            );
          })}
        </div>
      </div>

      {/* 
        Feedback section appears only after submission.
        Uses aria-live to announce the result automatically to screen readers.
      */}
      {submitted && (
        <div
          ref={feedbackRef}
          role="status"
          aria-live="polite"
          aria-atomic="true"
          tabIndex={-1} // allows focus for accessibility feedback
        >
          <h4>
            <span className="sr-only">Your answer is </span>
            {score === 1 ? "Correct" : "Incorrect"}
          </h4>
        </div>
      )}
    </section>
  );
}

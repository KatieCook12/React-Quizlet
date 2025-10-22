import React from "react";
import clsx from "clsx";
import RedCircleWhiteCross from "../images/red-circle-white-cross.svg";
import GreenCircleWhiteTick from "../images/green-circle-white-tick.svg";

/**
 * ButtonProps defines the expected properties for the Button component.
 *
 * - option: Text label displayed on the button.
 * - isSelected: Whether this button is currently selected.
 * - onClick: Callback triggered when the button is clicked.
 * - showAsCorrect / showAsWrong: Visual indicators for correct or incorrect answers.
 * - showAsDisabled: Disables the button when true (prevents interaction).
 * - submitted: Whether the user has submitted their answer.
 * - isCorrectOption: Marks the correct option after submission.
 */
type ButtonProps = {
  option: string;
  isSelected: boolean;
  onClick: () => void;
  showAsCorrect: boolean;
  showAsWrong: boolean;
  showAsDisabled: boolean; // disables interaction once submission is done
  submitted: boolean;
  isCorrectOption: boolean;
};

/**
 * Button component represents an answer choice in a quiz or questionnaire.
 *
 * It dynamically updates its appearance and accessibility labels
 * based on the quiz state (e.g., selected, correct, wrong, or disabled).
 */
export default function Button({
  option,
  isSelected,
  onClick,
  showAsCorrect,
  showAsWrong,
  showAsDisabled,
  submitted,
  isCorrectOption,
}: ButtonProps): React.JSX.Element {
  // Dynamically apply CSS classes based on the current button state.
  // clsx is used for conditional class management, improving readability.
  const className = clsx(
    "answer-button",
    isSelected && "clicked",
    showAsCorrect && "correct",
    showAsWrong && "wrong"
  );

  // Determine which icon to show (correct or wrong) based on the button state.
  // Only show icons after submission for selected answers.
  const icon =
    showAsCorrect && isSelected
      ? GreenCircleWhiteTick
      : showAsWrong
      ? RedCircleWhiteCross
      : null;

  /**
   * getAriaLabel()
   * Returns a descriptive ARIA label for screen readers.
   *
   * This improves accessibility by clearly communicating
   * whether the selected answer is correct or incorrect.
   */
  const getAriaLabel = (): string => {
    if (submitted) {
      if (showAsCorrect && isSelected)
        return `${option} - Your answer - Correct`;
      if (showAsWrong) return `${option} - Your answer - Incorrect`;
      if (isCorrectOption) return `${option} - Correct answer`;
    }
    return option;
  };

  return (
    <button
      role="radio" // allows screen readers to interpret this as part of a radio group
      aria-checked={isSelected}
      aria-label={getAriaLabel()}
      className={className}
      onClick={onClick}
      disabled={showAsDisabled}
      type="button"
    >
      {/* Render visual feedback icon when appropriate */}
      {icon && <img src={icon} alt="" aria-hidden="true" />}

      {/* Display the button text (hidden from screen readers to avoid redundancy) */}
      <span aria-hidden="true">{option}</span>
    </button>
  );
}

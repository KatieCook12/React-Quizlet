<<<<<<< HEAD
import clsx from "clsx";
import RedCircleWhiteCross from "../images/red-circle-white-cross.svg";
import GreenCircleWhiteTick from "../images/green-circle-white-tick.svg";

type ButtonProps = {
  option: string;
  isSelected: boolean;
  onClick: () => void;
  showAsCorrect: boolean;
  showAsWrong: boolean;
  showASDisabled: boolean;
  submitted: boolean;
  isCorrectOption: boolean;
};

=======
// Import utility and assets
import clsx from "clsx"; // Utility for conditional className management
import RedCircleWhiteCross from "../images/red-circle-white-cross.svg";
import GreenCircleWhiteTick from "../images/green-circle-white-tick.svg";

// Define the type for props accepted by the Button component
type ButtonProps = {
  option: string;              // Text shown on the button (answer option)
  isSelected: boolean;         // Whether this option is currently selected
  onClick: () => void;         // Function triggered when the button is clicked
  showAsCorrect: boolean;      // Whether this button should appear as the correct answer
  showAsWrong: boolean;        // Whether this button should appear as the wrong answer
  showASDisabled: boolean;     // Whether this button should be disabled (non-interactive)
  submitted: boolean;          // Whether the user has submitted their answer
  isCorrectOption: boolean;    // Whether this is the correct option (used after submission)
};

// Button component representing a selectable answer choice
>>>>>>> 32b3d63 (Loading progress bar)
export default function Button({
  option,
  isSelected,
  onClick,
  showAsCorrect,
  showAsWrong,
  showASDisabled,
  submitted,
  isCorrectOption
}: ButtonProps): React.JSX.Element {
<<<<<<< HEAD
  const className = clsx(
    "answer-button",
    isSelected && "clicked",
    showAsCorrect && "correct",
    showAsWrong && "wrong"
  );

=======
  
  // Dynamically compute the button's CSS classes using clsx
  const className = clsx(
    "answer-button",        // Base class
    isSelected && "clicked", // Add 'clicked' when selected
    showAsCorrect && "correct", // Add 'correct' style when appropriate
    showAsWrong && "wrong"      // Add 'wrong' style when appropriate
  );

  // Choose the correct icon (tick or cross) based on button state
>>>>>>> 32b3d63 (Loading progress bar)
  const icon = showAsCorrect && isSelected
    ? GreenCircleWhiteTick
    : showAsWrong
    ? RedCircleWhiteCross
    : null;

<<<<<<< HEAD
  const getAriaLabel = (): string => {
    if (submitted) {
=======
  // Function to generate descriptive aria-labels for screen readers
  const getAriaLabel = (): string => {
    if (submitted) {
      // If user submitted, describe the state of their answer
>>>>>>> 32b3d63 (Loading progress bar)
      if (showAsCorrect && isSelected) {
        return `${option} - Your answer - Correct`;
      }
      if (showAsWrong) {
        return `${option} - Your answer - Incorrect`;
      }
      if (isCorrectOption) {
        return `${option} - Correct answer`;
      }
    }
<<<<<<< HEAD
=======
    // Default label when quiz not submitted
>>>>>>> 32b3d63 (Loading progress bar)
    return option;
  };

  return (
    <button
<<<<<<< HEAD
      role="radio"
      aria-checked={isSelected}
      aria-label={getAriaLabel()}
      className={className}
      onClick={onClick}
      disabled={showASDisabled}
      type="button"
    >
      {icon && <img src={icon} alt="" aria-hidden="true" />}
      <span aria-hidden="true">{option}</span>
    </button>
  );
}
=======
      role="radio"                 // Use radio role for ARIA grouping
      aria-checked={isSelected}    // Indicate selection state to assistive tech
      aria-label={getAriaLabel()}  // Provide contextual label for screen readers
      className={className}        // Apply computed class names
      onClick={onClick}            // Handle user click
      disabled={showASDisabled}    // Disable button when necessary
      type="button"                // Ensure button type is explicitly set
    >
      
      {/* Show feedback icon (tick or cross) when applicable */}
      {icon && <img src={icon} alt="" aria-hidden="true" />}

      {/* The option text, hidden from screen readers since aria-label handles it */}
      <span aria-hidden="true">{option}</span>
    </button>
  );
}
>>>>>>> 32b3d63 (Loading progress bar)

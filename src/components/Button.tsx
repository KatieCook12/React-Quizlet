// Import React to create the component
import React from "react";

// Import clsx for conditional classNames
import clsx from "clsx";

// Import icons for correct and wrong states
import RedCircleWhiteCross from "../images/red-circle-white-cross.svg";
import GreenCircleWhiteTick from "../images/green-circle-white-tick.svg";

interface ButtonProps {
  option: string;
  isSelected: boolean;
  onClick: () => void;
  showAsCorrect: boolean;
  showAsWrong: boolean;
  showASDisabled: boolean;
}

export default function Button({
  option,
  isSelected,
  onClick,
  showAsCorrect,
  showAsWrong,
  showASDisabled
}: ButtonProps) {
  
  // Apply button classes based on the props
  const className = clsx(
    "answer-button",
    isSelected && "clicked",
    showAsCorrect && "correct",
    showAsWrong && "wrong"
  );

  // Pick the correct icon based on state
  const icon = showAsCorrect && isSelected
    ? GreenCircleWhiteTick
    : showAsWrong
    ? RedCircleWhiteCross
    : null;

  // Determine aria-label for accessibility
  const ariaLabel = showAsCorrect
    ? `${option} - Correct answer`
    : showAsWrong
    ? `${option} - Incorrect answer`
    : option;

  return (
    <button
      className={className}
      onClick={onClick}
      disabled={showASDisabled}
      aria-pressed={isSelected}
      aria-label={ariaLabel}
    >
      {icon && <img src={icon} alt="" aria-hidden="true" />}
      <span>{option}</span>
    </button>
  );
}
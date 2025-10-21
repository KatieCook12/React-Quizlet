// Import React to create the component
import React from "react";

// Import clsx for conditional classNames
import clsx from "clsx";

// Import icons for correct and wrong states
import RedCircleWhiteCross from "../images/red-circle-white-cross.svg";
import GreenCircleWhiteTick from "../images/green-circle-white-tick.svg";

export default function Button({
  option,
  isSelected,
  onClick,
  showAsCorrect,
  showAsWrong,
  showASDisabled
}) {
  
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

  return (
    <button
      className={className}
      onClick={onClick}
      disabled={showASDisabled ? true : false}
    >
      {icon && <img src={icon} alt="icon" />}
      {option}
    </button>
  );
}
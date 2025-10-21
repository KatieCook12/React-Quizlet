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
  const className = clsx(
    "answer-button",
    isSelected && "clicked",
    showAsCorrect && "correct",
    showAsWrong && "wrong"
  );

  const icon = showAsCorrect && isSelected
    ? GreenCircleWhiteTick
    : showAsWrong
    ? RedCircleWhiteCross
    : null;

  const getAriaLabel = (): string => {
    if (submitted) {
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
    return option;
  };

  return (
    <button
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
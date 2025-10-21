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
};

export default function Button({
  option,
  isSelected,
  onClick,
  showAsCorrect,
  showAsWrong,
  showASDisabled
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

  return (
    <button
      className={className}
      onClick={onClick}
      disabled={showASDisabled}
    >
      {icon && <img src={icon} alt="icon" />}
      {option}
    </button>
  );
}
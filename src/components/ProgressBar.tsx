import React from "react";

interface ProgressBarProps {
  answered: number;
  total: number;
}

export default function ProgressBar({ answered, total }: ProgressBarProps) {
  const percentage = (answered / total) * 100;

  return (
    <div
      className="progress-bar-container"
      role="region"
      aria-label="Quiz progress"
    >
      <div
        className="progress-bar"
        role="progressbar"
        aria-valuenow={answered}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={`${answered} of ${total} questions answered`}
      >
        <div
          className="progress-bar-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="progress-text" aria-hidden="true">{`${answered}/${total}`}</span>
    </div>
  );
}

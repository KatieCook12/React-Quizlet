/**
 * ProgressBarProps defines the required properties for the ProgressBar component.
 *
 * - answeredCount: Number of questions the user has completed.
 * - totalQuestions: Total number of questions in the quiz.
 */
type ProgressBarProps = {
  answeredCount: number;
  totalQuestions: number;
};

/**
 * ProgressBar component visually and accessibly represents quiz completion.
 *
 * It calculates and displays the user’s progress as a percentage-filled bar.
 * The component also provides proper ARIA attributes to ensure screen readers
 * can accurately describe the quiz progress.
 */
export default function ProgressBar({
  answeredCount,
  totalQuestions,
}: ProgressBarProps): React.JSX.Element {
  // Calculate the current progress percentage.
  // Protects against division by zero by returning 0 when totalQuestions = 0.
  const progressPercentage =
    totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0;

  return (
    <div
      role="progressbar" // identifies the element as a progress indicator for assistive tech
      aria-valuenow={answeredCount} // current progress value
      aria-valuemin={0} // minimum value (start of progress)
      aria-valuemax={totalQuestions} // maximum value (end of progress)
      aria-label={`Quiz progress: ${answeredCount} of ${totalQuestions} questions answered`}
      className="progress"
      // CSS custom property used to dynamically control the fill width via styles
      style={{ ["--progress" as any]: `${progressPercentage}%` }}
    >
      {/* 
        Visual fill bar that expands according to the user's progress.
        Hidden from screen readers since ARIA attributes already provide this info.
      */}
      <div aria-hidden="true" className="progress__fill" />

      {/* 
        Displays numerical progress (e.g., "3/10") for visual feedback.
        Marked aria-hidden because the same information is conveyed accessibly above.
      */}
      <div aria-hidden="true" className="progress__label">
        {answeredCount}/{totalQuestions}
      </div>
    </div>
  );
}

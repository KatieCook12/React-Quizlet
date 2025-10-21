type ProgressBarProps = {
  answeredCount: number;
  totalQuestions: number;
};

export default function ProgressBar({ answeredCount, totalQuestions }: ProgressBarProps): React.JSX.Element {
  const progressPercentage = totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0;

  return (
    <div
      role="progressbar"
      aria-valuenow={answeredCount}
      aria-valuemin={0}
      aria-valuemax={totalQuestions}
      aria-label={`Quiz progress: ${answeredCount} of ${totalQuestions} questions answered`}
      style={{
        display: "flex",
        height: "32px",
        padding: "4px 12px 4px 4px",
        alignItems: "center",
        gap: "12px",
        flexShrink: 0,
        width: "100%",
        borderRadius: "100px",
        background: "#FFF",
        position: "relative",
        marginBottom: "24px",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          height: "100%",
          borderRadius: "100px 0 0 100px",
          background: "#2B7F53",
          position: "absolute",
          left: 0,
          top: 0,
          width: `${progressPercentage}%`,
        }}
        className="progress-fill"
      ></div>
      <div
        aria-hidden="true"
        style={{
          color: "#5D5D5D",
          textAlign: "center",
          fontFamily: "Nunito",
          fontSize: "15px",
          fontStyle: "normal",
          fontWeight: 600,
          lineHeight: "normal",
          position: "relative",
          zIndex: 1,
          marginLeft: "auto",
        }}
      >
        <span
          style={{
            fontFamily: "Nunito, -apple-system, Roboto, Helvetica, sans-serif",
            fontWeight: 700,
            fontSize: "15px",
            color: "rgba(93,93,93,1)",
          }}
        >
          {answeredCount}/{totalQuestions}
        </span>
      </div>
    </div>
  );
}

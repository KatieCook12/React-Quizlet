type ProgressBarProps = {
  answeredCount: number;
  totalQuestions: number;
};

export default function ProgressBar({ answeredCount, totalQuestions }: ProgressBarProps): React.JSX.Element {
  const progressPercentage = totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0;

  return (
    <div
      style={{
        display: "flex",
        height: "32px",
        padding: "4px 12px 4px 4px",
        alignItems: "center",
        gap: "12px",
        flexShrink: 0,
        alignSelf: "stretch",
        borderRadius: "100px",
        background: "#FFF",
        position: "relative",
        margin: "16px 0",
      }}
    >
      <div
        style={{
          flex: "1 0 0",
          alignSelf: "stretch",
          borderRadius: "100px 0 0 100px",
          background: "#2B7F53",
          position: "relative",
          width: `${progressPercentage}%`,
          transition: "width 0.3s ease",
        }}
      ></div>
      <div
        style={{
          color: "#5D5D5D",
          textAlign: "center",
          fontFamily: "Nunito",
          fontSize: "15px",
          fontStyle: "normal",
          fontWeight: 600,
          lineHeight: "normal",
          position: "relative",
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

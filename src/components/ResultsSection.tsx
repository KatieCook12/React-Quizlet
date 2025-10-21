import React from "react";
import { highScorePhrases, lowScorePhrases, midScorePhrases } from "../phrases";

type ResultsSectionProps = {
  onButtonClick: () => void;
  submitted: boolean;
  scoreResults: number;
  numberOfQuestions: number;
};

const ResultsSection = React.forwardRef<HTMLElement, ResultsSectionProps>(
  function ResultsSection(
    { onButtonClick, submitted, scoreResults, numberOfQuestions },
    ref
  ) {
    const headingId = React.useId();
    const regionId = React.useId();

    const percent =
      numberOfQuestions > 0 ? (scoreResults / numberOfQuestions) * 100 : 0;

    const getPhraseList = React.useCallback((): readonly string[] => {
      if (percent >= 80) return highScorePhrases || [];
      if (percent < 40) return lowScorePhrases || [];
      return midScorePhrases || [];
    }, [percent]);

    const phrase = React.useMemo(() => {
      if (!submitted) return "";
      const list = getPhraseList();
      if (!list.length) return "Here are your results";
      return list[Math.floor(Math.random() * list.length)];
    }, [submitted, getPhraseList]);

    const buttonLabel = submitted ? "Play again" : "Submit answers";

    return (
      <section
        id={regionId}
        className="results-card"
        aria-labelledby={headingId}
        tabIndex={-1}
        ref={ref}
      >
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {submitted ? `You scored ${scoreResults} out of ${numberOfQuestions}.` : ""}
        </p>

        {submitted ? (
          <div className="results-message">
            <h2 id={headingId}>{phrase}</h2>
            <p>
              You scored <strong>{scoreResults}</strong> out of{" "}
              <strong>{numberOfQuestions}</strong> correct
            </p>
          </div>
        ) : (
          <h2 id={headingId} className="sr-only">
            Ready to submit
          </h2>
        )}

        <button type="button" onClick={onButtonClick}>
          {buttonLabel}
        </button>
      </section>
    );
  }
);

export default ResultsSection;

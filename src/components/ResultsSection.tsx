// ResultsSection.jsx
// Displays the user's score, a motivational phrase, and the main action button.

import React from "react";
import { highScorePhrases, lowScorePhrases, midScorePhrases } from "../phrases";

interface ResultsSectionProps {
  onButtonClick: () => void;
  submitted: boolean;
  scoreResults: number;
  numberOfQuestions: number;
}

const ResultsSection = React.forwardRef<HTMLElement, ResultsSectionProps>(function ResultsSection(
  { onButtonClick, submitted, scoreResults, numberOfQuestions },
  ref
) {
  const headingId = React.useId();
  const regionId = React.useId();

  // Compute score percentage safely (avoid divide-by-zero)
  const percent =
    numberOfQuestions > 0 ? (scoreResults / numberOfQuestions) * 100 : 0;

  // Choose phrase list based on score range
  const getPhraseList = React.useCallback(() => {
    if (percent >= 80) return highScorePhrases || [];
    if (percent < 40) return lowScorePhrases || [];
    return midScorePhrases || [];
  }, [percent]);

  // Pick a random phrase once when results appear or score range changes
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
      {/* Screen reader live region: announces result without moving focus */}
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {submitted ? `You scored ${scoreResults} out of ${numberOfQuestions}.` : ""}
      </p>

      {/* Results section (visible after submission) */}
      {submitted ? (
        <div className="results-message">
          <h2 id={headingId}>{phrase}</h2>
          <p>
            You scored <strong>{scoreResults}</strong> out of{" "}
            <strong>{numberOfQuestions}</strong> correct
          </p>
        </div>
      ) : (
        // Accessible heading placeholder before submission
        <h2 id={headingId} className="sr-only">
          Ready to submit
        </h2>
      )}

      {/* Main action button */}
      <button type="button" onClick={onButtonClick}>
        {buttonLabel}
      </button>
    </section>
  );
});

export default ResultsSection;

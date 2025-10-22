import React from "react";
import { highScorePhrases, lowScorePhrases, midScorePhrases } from "../phrases";

/**
 * ResultsSectionProps defines the expected properties for the ResultsSection component.
 * 
 * - onButtonClick: Callback function to handle button click events (e.g., submitting answers or restarting).
 * - submitted: Boolean flag indicating if the quiz has been submitted.
 * - scoreResults: The user's score (number of correct answers).
 * - numberOfQuestions: Total number of questions in the quiz.
 */
type ResultsSectionProps = {
  onButtonClick: () => void;
  submitted: boolean;
  scoreResults: number;
  numberOfQuestions: number;
};

/**
 * ResultsSection component displays the results of the quiz after submission.
 * 
 * It shows a message based on the user's score and offers a button to either 
 * submit the quiz or play again.
 * 
 * The component utilizes `aria-live` for accessible screen-reader updates and dynamically 
 * provides feedback based on the user's score.
 */
const ResultsSection = React.forwardRef<HTMLElement, ResultsSectionProps>(
  function ResultsSection(
    { onButtonClick, submitted, scoreResults, numberOfQuestions },
    ref
  ) {
    // Generate unique IDs for accessibility (question heading and region)
    const headingId = React.useId();
    const regionId = React.useId();

    // Calculate percentage score; protects against division by zero if there are no questions.
    const percent =
      numberOfQuestions > 0 ? (scoreResults / numberOfQuestions) * 100 : 0;

    /**
     * getPhraseList()
     * Determines the list of phrases to display based on the score percentage.
     * 
     * - Returns highScorePhrases for scores >= 80%.
     * - Returns lowScorePhrases for scores < 40%.
     * - Returns midScorePhrases for scores in between.
     */
    const getPhraseList = React.useCallback((): readonly string[] => {
      if (percent >= 80) return highScorePhrases || [];
      if (percent < 40) return lowScorePhrases || [];
      return midScorePhrases || [];
    }, [percent]);

    /**
     * phrase: Randomized phrase to show as feedback.
     * Only shown after submission; chosen from the relevant list based on score.
     */
    const phrase = React.useMemo(() => {
      if (!submitted) return "";
      const list = getPhraseList();
      if (!list.length) return "Here are your results";
      return list[Math.floor(Math.random() * list.length)];
    }, [submitted, getPhraseList]);

    // Button label changes based on whether the quiz is submitted or not
    const buttonLabel = submitted ? "Play again" : "Submit answers";

    return (
      <section
        id={regionId}
        className="results-card"
        aria-labelledby={headingId}
        tabIndex={-1} // Ensure the section is focusable for accessibility purposes
        ref={ref}
      >
        {/* 
          Screen-reader-only announcement of score for feedback. 
          `aria-live` ensures the score is announced when the quiz is submitted.
        */}
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {submitted
            ? `You scored ${scoreResults} out of ${numberOfQuestions}.`
            : ""}
        </p>

        {/* Display results after quiz submission */}
        {submitted ? (
          <div className="results-message">
            {/* Accessible heading announcing the feedback phrase */}
            <h2 id={headingId}>{phrase}</h2>
            {/* Display the actual score */}
            <p>
              You scored <strong>{scoreResults}</strong> out of{" "}
              <strong>{numberOfQuestions}</strong> correct
            </p>
          </div>
        ) : (
          // Hidden heading for screen readers to indicate quiz submission readiness
          <h2 id={headingId} className="sr-only">
            Ready to submit
          </h2>
        )}

        {/* Button changes text depending on whether the quiz is submitted */}
        <button type="button" onClick={onButtonClick}>
          {buttonLabel}
        </button>
      </section>
    );
  }
);

export default ResultsSection;

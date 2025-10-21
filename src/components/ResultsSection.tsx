import React from "react";
import { highScorePhrases, lowScorePhrases, midScorePhrases } from "../phrases";

<<<<<<< HEAD
type ResultsSectionProps = {
  onButtonClick: () => void;
  submitted: boolean;
  scoreResults: number;
  numberOfQuestions: number;
};

=======
// Define the props for the ResultsSection component
type ResultsSectionProps = {
  onButtonClick: () => void;    // Callback for the main action button (submit or play again)
  submitted: boolean;           // Whether the quiz has been submitted
  scoreResults: number;         // Number of correct answers
  numberOfQuestions: number;    // Total number of questions in the quiz
};

// ResultsSection: Displays the user's quiz results and a submit/play-again button
// - Uses forwardRef to allow parent components to manage focus (e.g., scroll to results)
>>>>>>> 32b3d63 (Loading progress bar)
const ResultsSection = React.forwardRef<HTMLElement, ResultsSectionProps>(
  function ResultsSection(
    { onButtonClick, submitted, scoreResults, numberOfQuestions },
    ref
  ) {
<<<<<<< HEAD
    const headingId = React.useId();
    const regionId = React.useId();

    const percent =
      numberOfQuestions > 0 ? (scoreResults / numberOfQuestions) * 100 : 0;

=======

    // Unique IDs for accessible labels and region identification
    const headingId = React.useId();
    const regionId = React.useId();

    // Calculate user's percentage score, avoiding divide-by-zero errors
    const percent =
      numberOfQuestions > 0 ? (scoreResults / numberOfQuestions) * 100 : 0;

    // Determine which set of phrases to use based on score percentage
>>>>>>> 32b3d63 (Loading progress bar)
    const getPhraseList = React.useCallback((): readonly string[] => {
      if (percent >= 80) return highScorePhrases || [];
      if (percent < 40) return lowScorePhrases || [];
      return midScorePhrases || [];
    }, [percent]);

<<<<<<< HEAD
    const phrase = React.useMemo(() => {
      if (!submitted) return "";
      const list = getPhraseList();
      if (!list.length) return "Here are your results";
      return list[Math.floor(Math.random() * list.length)];
    }, [submitted, getPhraseList]);

=======
    // Pick a random motivational phrase to display once results are submitted
    const phrase = React.useMemo(() => {
      if (!submitted) return ""; // No phrase before submission
      const list = getPhraseList();
      if (!list.length) return "Here are your results"; // Fallback text

      // Randomly select one phrase from the chosen list
      return list[Math.floor(Math.random() * list.length)];
    }, [submitted, getPhraseList]);

    // Button text changes depending on whether results have been submitted
>>>>>>> 32b3d63 (Loading progress bar)
    const buttonLabel = submitted ? "Play again" : "Submit answers";

    return (
      <section
        id={regionId}
        className="results-card"
<<<<<<< HEAD
        aria-labelledby={headingId}
        tabIndex={-1}
        ref={ref}
      >
=======
        aria-labelledby={headingId} // Associate section with its heading
        tabIndex={-1}               // Make focusable (for keyboard/screen reader focus)
        ref={ref}                   // Forwarded ref for external focus management
      >

        {/* 
          Hidden live region for screen readers:
          - Announces the user's score when submitted
          - Uses aria-live="polite" for non-intrusive updates
        */}
>>>>>>> 32b3d63 (Loading progress bar)
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {submitted ? `You scored ${scoreResults} out of ${numberOfQuestions}.` : ""}
        </p>

<<<<<<< HEAD
        {submitted ? (
          <div className="results-message">
            <h2 id={headingId}>{phrase}</h2>
=======
        {/* 
          Conditionally render result details:
          - If submitted: show result phrase and score summary
          - Otherwise: show hidden heading for accessibility context
        */}
        {submitted ? (
          <div className="results-message">

            {/* Randomized phrase based on score tier */}
            <h2 id={headingId}>{phrase}</h2>

            {/* Numeric results display */}
>>>>>>> 32b3d63 (Loading progress bar)
            <p>
              You scored <strong>{scoreResults}</strong> out of{" "}
              <strong>{numberOfQuestions}</strong> correct
            </p>
          </div>
        ) : (
<<<<<<< HEAD
=======
          
          // Hidden heading provides accessible label before submission
>>>>>>> 32b3d63 (Loading progress bar)
          <h2 id={headingId} className="sr-only">
            Ready to submit
          </h2>
        )}

<<<<<<< HEAD
=======
        {/* 
          Primary action button:
          - Submits answers or restarts the quiz based on state
        */}
>>>>>>> 32b3d63 (Loading progress bar)
        <button type="button" onClick={onButtonClick}>
          {buttonLabel}
        </button>
      </section>
    );
  }
);

export default ResultsSection;

// Import phrases grouped by performance tiers
import { highScorePhrases, lowScorePhrases, midScorePhrases } from "../phrases";

export default function ResultsSection({
  onButtonClick,
  submitted,
  scoreResults,
  numberOfQuestions
}) {

  // Compute score percentage safely (avoid divide-by-zero)
  const percent =
    numberOfQuestions > 0 ? (scoreResults / numberOfQuestions) * 100 : 0;

  // Pick the phrase list based on percentage thresholds
  function getPhraseList() {
    if (percent >= 80) return highScorePhrases;
    if (percent < 40) return lowScorePhrases;
    return midScorePhrases;
  }

  // Return a random phrase from the selected list
  function getRandomPhrase() {
    const phrases = getPhraseList();
    return phrases[Math.floor(Math.random() * phrases.length)];
  }

  // Button label depends on whether the quiz has been submitted
  function isSubmitted() {
    return submitted ? "Play again" : "Submit";
  }

  return (
    <section className="results-card">
        
      {/* Show results only after submission */}
      {submitted ? (
        <div className="results-message">
          <h2>{getRandomPhrase()}</h2>
          <p>{`You scored ${scoreResults} out of ${numberOfQuestions} correct`}</p>
        </div>
      ) : null}

      {/* Primary action button */}
      <button onClick={onButtonClick}>{isSubmitted()}</button>
    </section>
  );
}

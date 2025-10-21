// QuizPage.jsx
// Renders a quiz based on OpenTDB settings from router state.

import React from "react";
import { decode } from "html-entities";
import { useLocation } from "react-router-dom";
import Confetti from "react-confetti";

// Components (put all imports here together, even lazy ones)
import Nav from "../components/Nav";
import ResultsSection from "../components/ResultsSection";

// Hooks
import { useWindowSize } from "../hooks/UseWindowSize";

// Types
import { QuizQuestion, QuizFilters, OpenTDBResponse } from "../types";

// Styles & assets
import "../css/app.css";
import "../css/quiz-page.css";
import DarkPurpleBackgroundEllipse from "../images/background-dark-purple-ellipse.svg";
const QuestionCard = React.lazy(() => import("../components/QuestionCard"));

// Helpers
const shuffleOptions = (array: string[]): string[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

export default function QuizPage() {
  const resultsRef = React.useRef<HTMLElement>(null);

  // Confetti sizing
  const { width, height } = useWindowSize();

  // Read filters (difficulty, category) from router state
  const { state } = useLocation();
  const filters: QuizFilters = (state as { filters?: QuizFilters })?.filters || {};

  // Build OpenTDB URL with chosen filters
  const params = new URLSearchParams({ amount: "5", type: "multiple" });
  if (filters.difficulty) params.set("difficulty", filters.difficulty);
  if (filters.category) params.set("category", filters.category);
  const API_URL = `https://opentdb.com/api.php?${params.toString()}`;

  // Quiz questions: [{ question, options[], correct_answer }]
  const [quizData, setQuizData] = React.useState<QuizQuestion[]>([]);

  // Track loading and error states
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Track submission state
  const [submitted, setSubmitted] = React.useState(false);

  // Number of correct answers after submission
  const [score, setScore] = React.useState(0);

  // Selected option index per question (null when unanswered)
  const [answers, setAnswers] = React.useState<(number | null)[]>([]);

  // Fetch quiz data from API and normalize it for rendering
  const fetchQuizData = React.useCallback(() => {
    setLoading(true);
    setError(null);

    fetch(API_URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`API request failed with status ${res.status}`);
        }
        return res.json();
      })
      .then((data: OpenTDBResponse) => {
        if (!data.results || data.results.length === 0) {
          throw new Error("No questions were returned from the API");
        }

        // Map API items into a shape convenient for rendering/marking
        const mapped: QuizQuestion[] = data.results.map((item) => ({
          question: decode(item.question),
          options: shuffleOptions([
            ...item.incorrect_answers,
            item.correct_answer,
          ]).map((opt) => decode(opt)),
          correct_answer: decode(item.correct_answer),
        }));

        // Save questions
        setQuizData(mapped);

        // Reset selections for each question
        setAnswers(Array(mapped.length).fill(null));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching quiz data:", err);
        setError(err.message || "Failed to load quiz questions. Please try again.");
        setLoading(false);
      });

  // Re-fetch if filters (hence URL) change
  }, [API_URL]); 

  // Kick off fetch on mount (and when filters change)
  React.useEffect(() => {
    fetchQuizData();
  }, [fetchQuizData]);

  // Handle the primary action button (Submit / Play again)
  const submitButtonClicked = () => {
    if (!submitted) {
      // Submitting answers: calculate score
      const total = answers.reduce<number>((sum: number, selectedIdx: number | null, i: number) => {
        if (selectedIdx == null) return sum;
        const q = quizData[i];
        return sum + (q.options[selectedIdx] === q.correct_answer ? 1 : 0);
      }, 0);

      setScore(total);
      setSubmitted(true);

      // Move focus to the results section
      setTimeout(() => {
        resultsRef.current?.focus();
      }, 0);
    } else {

      // Play again: reset state and fetch a fresh quiz
      setSubmitted(false);
      setScore(0);
      setAnswers([]);
      setError(null);
      fetchQuizData();

      // Scroll back to the top of the page
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Count how many questions have been answered
  const answeredCount = answers.filter((a) => a !== null).length;

  return (
    <>

      {/* Top navigation (logo/back) with progress bar */}
      <Nav
        showProgress={!submitted}
        answered={answeredCount}
        total={quizData.length}
      />

      {/* Main quiz area */}
      <main id="main-content" className="quiz" aria-label="Quiz questions">
        <h1 className="sr-only">Quiz Questions</h1>

        {/* Show loading state */}
        {loading && (
          <div style={{ textAlign: 'center', color: 'white', fontSize: '1.25rem', padding: '2rem' }}>
            Loading questions...
          </div>
        )}

        {/* Show error state */}
        {error && (
          <div style={{
            textAlign: 'center',
            color: 'white',
            fontSize: '1.125rem',
            padding: '2rem',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '12px'
          }}>
            <p>{error}</p>
            <button
              onClick={fetchQuizData}
              style={{
                marginTop: '1rem',
                padding: '12px 24px',
                background: 'white',
                color: 'var(--clr-purple-900)',
                border: 'none',
                borderRadius: '24px',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Show questions when loaded */}
        {!loading && !error && (
          <React.Suspense fallback={<h2>Loading questions...</h2>}>
            {/* Render each question card with its options */}
            {quizData.map((question: QuizQuestion, id: number) => (
              <QuestionCard
                key={id}
                number={id + 1}
                question={question.question}
                options={question.options}
                correct_answer={question.correct_answer}
                submitted={submitted}
                selectedIndex={answers[id]}
                onSelect={(i: number) =>
                  setAnswers((prev: (number | null)[]) => {
                    const next = [...prev];

                    // Store selected option index for this question
                    next[id] = i;
                    return next;
                  })
                }
              />
            ))}
          </React.Suspense>
        )}

        {/* Results block and primary action button */}
        {!loading && !error && (
          <ResultsSection
            ref={resultsRef}
            onButtonClick={submitButtonClicked}
            submitted={submitted}
            scoreResults={score}
            numberOfQuestions={quizData.length}
          />
        )}

        {/* Confetti celebration only after submission and if score > 0 */}
        {submitted && score > 0 ? (
          <Confetti
            width={width}
            height={height}
            style={{ position: "fixed", inset: 0, pointerEvents: "none" }}
            aria-hidden="true"
          />
        ) : null}
      </main>

      {/* Decorative background ellipse (fixed, behind content) */}
      <img
        src={DarkPurpleBackgroundEllipse}
        alt=""
        className="dark-purple-background-ellipse"
        aria-hidden="true"
      />
    </>
  );
}

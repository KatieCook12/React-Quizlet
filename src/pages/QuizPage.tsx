import React from "react";
import { decode } from "html-entities";
import { useLocation } from "react-router-dom";
import Confetti from "react-confetti";
<<<<<<< HEAD
import Nav from "../components/Nav";
import ResultsSection from "../components/ResultsSection";
import ProgressBar from "../components/ProgressBar";
import { useWindowSize } from "../hooks/UseWindowSize";
import "../css/app.css";
import "../css/quiz-page.css";
import DarkPurpleBackgroundEllipse from "../images/background-dark-purple-ellipse.svg";
import type { QuizQuestion, OpenTDBResponse, QuizFilters } from "../types/quiz";

const QuestionCard = React.lazy(() => import("../components/QuestionCard"));

=======

import Nav from "../components/Nav";
import ResultsSection from "../components/ResultsSection";
import { useWindowSize } from "../hooks/UseWindowSize";

import "../css/app.css";
import "../css/quiz-page.css";
import DarkPurpleBackgroundEllipse from "../images/background-dark-purple-ellipse.svg";

import type { QuizQuestion, OpenTDBResponse, QuizFilters } from "../types/quiz";

// Lazy-load QuestionCard to keep initial bundle small (Suspense fallback shown below)
const QuestionCard = React.lazy(() => import("../components/QuestionCard"));

/**
 * Utility: randomly shuffle options for each question.
 * - Returns a new array; original is not mutated.
 */
>>>>>>> 32b3d63 (Loading progress bar)
const shuffleOptions = (array: string[]): string[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

<<<<<<< HEAD
=======
// Shape of route state passed from the Home page (filters are optional)
>>>>>>> 32b3d63 (Loading progress bar)
type LocationState = {
  filters?: QuizFilters;
};

<<<<<<< HEAD
export default function QuizPage(): React.JSX.Element {
  const resultsRef = React.useRef<HTMLElement>(null);
  const { width, height } = useWindowSize();
  const { state } = useLocation() as { state: LocationState | null };
  const filters = state?.filters || {};

=======
// QuizPage: fetches questions, manages answers/submission, and renders the quiz flow
export default function QuizPage(): React.JSX.Element {
  // Ref used to move focus to the results section after submission (accessibility)
  const resultsRef = React.useRef<HTMLElement>(null);

  // Window size used by the Confetti component
  const { width, height } = useWindowSize();

  // Read filters passed from the Home page (difficulty/category)
  const { state } = useLocation() as { state: LocationState | null };
  const filters = state?.filters || {};

  // Build OpenTDB API URL with selected filters (5 multiple-choice questions)
>>>>>>> 32b3d63 (Loading progress bar)
  const params = new URLSearchParams({ amount: "5", type: "multiple" });
  if (filters.difficulty) params.set("difficulty", filters.difficulty);
  if (filters.category) params.set("category", filters.category);
  const API_URL = `https://opentdb.com/api.php?${params.toString()}`;

<<<<<<< HEAD
  const [quizData, setQuizData] = React.useState<QuizQuestion[]>([]);
  const [submitted, setSubmitted] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [answers, setAnswers] = React.useState<(number | null)[]>([]);

=======
  // Local state for quiz lifecycle
  const [quizData, setQuizData] = React.useState<QuizQuestion[]>([]); // questions/options/correct answers
  const [submitted, setSubmitted] = React.useState(false); // whether user submitted
  const [score, setScore] = React.useState(0); // total correct answers
  const [answers, setAnswers] = React.useState<(number | null)[]>([]); // selected option index per question

  /**
   * Fetch and normalize quiz data from OpenTDB.
   * - Decodes HTML entities in both questions and answers.
   * - Shuffles options so the correct answer is not always last.
   * - Resets local answer state to nulls for each question.
   */
>>>>>>> 32b3d63 (Loading progress bar)
  const fetchQuizData = React.useCallback((): void => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data: OpenTDBResponse) => {
        if (!data.results) return;

        const mapped: QuizQuestion[] = data.results.map((item) => ({
          question: decode(item.question),
          options: shuffleOptions([
            ...item.incorrect_answers,
            item.correct_answer,
          ]).map((str) => decode(str)),
          correct_answer: decode(item.correct_answer),
        }));

        setQuizData(mapped);
        setAnswers(Array(mapped.length).fill(null));
      })
<<<<<<< HEAD
      .catch((err) => console.error(err));
  }, [API_URL]);

=======
      .catch((err) => console.error(err)); // Minimal error handling; consider UI feedback
  }, [API_URL]);

  // Fetch on mount and whenever filters/API_URL change
>>>>>>> 32b3d63 (Loading progress bar)
  React.useEffect(() => {
    fetchQuizData();
  }, [fetchQuizData]);

<<<<<<< HEAD
  const submitButtonClicked = (): void => {
    if (!submitted) {
      const total = answers.reduce<number>((sum, selectedIdx, i) => {
        if (selectedIdx == null) return sum;
        const q = quizData[i];
        if (!q) return sum;
        const option = q.options[selectedIdx];
        if (!option) return sum;
=======
  /**
   * Submit / Play again button handler.
   * - On submit: compute score, mark submitted, and focus results.
   * - On play again: reset state, fetch new questions, and scroll to top.
   */
  const submitButtonClicked = (): void => {
    if (!submitted) {
      // Calculate the total number of correct answers
      const total = answers.reduce<number>((sum, selectedIdx, i) => {
        if (selectedIdx == null) return sum;

        const q = quizData[i];
        if (!q) return sum;

        const option = q.options[selectedIdx];
        if (!option) return sum;

>>>>>>> 32b3d63 (Loading progress bar)
        return sum + (option === q.correct_answer ? 1 : 0);
      }, 0);

      setScore(total);
      setSubmitted(true);

<<<<<<< HEAD
=======
      // Move focus to results region for screen readers/keyboard users
>>>>>>> 32b3d63 (Loading progress bar)
      setTimeout(() => {
        resultsRef.current?.focus();
      }, 0);
    } else {
<<<<<<< HEAD
=======
      // Reset for a new round
>>>>>>> 32b3d63 (Loading progress bar)
      setSubmitted(false);
      setScore(0);
      setAnswers([]);
      fetchQuizData();

<<<<<<< HEAD
=======
      // Smoothly scroll to the top after new data loads
>>>>>>> 32b3d63 (Loading progress bar)
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }
  };

<<<<<<< HEAD
=======
  // Count how many questions have a selected answer
>>>>>>> 32b3d63 (Loading progress bar)
  const answeredCount = answers.filter((answer) => answer !== null).length;

  return (
    <>
<<<<<<< HEAD
      <Nav />

      <main id="page-top" className="quiz">
        {!submitted && (
          <div style={{
            position: "sticky",
            top: "40px",
            zIndex: 99,
            width: "100%",
          }}>
            <ProgressBar answeredCount={answeredCount} totalQuestions={quizData.length} />
          </div>
        )}

=======

      {/* Global top navigation */}
<Nav
  answeredCount={answeredCount}
  totalQuestions={quizData.length}
  submitted={submitted}
/>

      <main id="page-top" className="quiz">

        {/* Lazy-loaded questions list with a simple fallback while loading */}
>>>>>>> 32b3d63 (Loading progress bar)
        <React.Suspense fallback={<h2>Loading questions...</h2>}>
          {quizData.map((question, id) => (
            <QuestionCard
              key={id}
              number={id + 1}
              question={question.question}
              options={question.options}
              correct_answer={question.correct_answer}
              submitted={submitted}
              selectedIndex={answers[id] ?? null}
              onSelect={(i) =>
                setAnswers((prev) => {
                  const next = [...prev];
                  next[id] = i;
                  return next;
                })
              }
            />
          ))}
        </React.Suspense>

<<<<<<< HEAD
=======
        {/* Results + primary action (Submit / Play again) */}
>>>>>>> 32b3d63 (Loading progress bar)
        <ResultsSection
          ref={resultsRef}
          onButtonClick={submitButtonClicked}
          submitted={submitted}
          scoreResults={score}
          numberOfQuestions={quizData.length}
        />

<<<<<<< HEAD
=======
        {/* Celebration on success (only show confetti if there’s at least one correct) */}
>>>>>>> 32b3d63 (Loading progress bar)
        {submitted && score > 0 ? (
          <Confetti
            width={width}
            height={height}
            style={{ position: "fixed", inset: 0, pointerEvents: "none" }}
          />
        ) : null}
      </main>

<<<<<<< HEAD
=======
      {/* Decorative background element */}
>>>>>>> 32b3d63 (Loading progress bar)
      <img
        src={DarkPurpleBackgroundEllipse}
        alt="Dark purple background ellipse"
        className="dark-purple-background-ellipse"
      />
    </>
  );
}

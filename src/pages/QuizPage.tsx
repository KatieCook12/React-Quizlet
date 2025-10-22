import React from "react";
import { decode } from "html-entities";
import { useLocation } from "react-router-dom";
import Confetti from "react-confetti";

import Nav from "../components/Nav";
import ResultsSection from "../components/ResultsSection";
import { useWindowSize } from "../hooks/UseWindowSize";

import "../css/app.css";
import "../css/quiz-page.css";
import DarkPurpleBackgroundEllipse from "../images/background-dark-purple-ellipse.svg";

import type { QuizQuestion, OpenTDBResponse, QuizFilters } from "../types/quiz";

// Lazy-load QuestionCard to minimize initial bundle size (fallback shown while loading)
const QuestionCard = React.lazy(() => import("../components/QuestionCard"));

/**
 * Utility function to shuffle answer options randomly for each question.
 * - Returns a new shuffled array; original array is not mutated.
 */
const shuffleOptions = (array: string[]): string[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

// Shape of route state passed from the Home page (filters are optional)
type LocationState = {
  filters?: QuizFilters;
};

/**
 * QuizPage component: Handles quiz flow, fetching questions, managing user answers,
 * computing score, and rendering results with appropriate feedback.
 */
export default function QuizPage(): React.JSX.Element {
  // Reference to move focus to the results section for accessibility after submission
  const resultsRef = React.useRef<HTMLElement>(null);

  // Hook to track window size, used for Confetti display
  const { width, height } = useWindowSize();

  // Retrieve filters (difficulty/category) passed from the Home page
  const { state } = useLocation() as { state: LocationState | null };
  const filters = state?.filters || {};

  // Build the OpenTDB API URL with selected filters (fetch 5 multiple-choice questions)
  const params = new URLSearchParams({ amount: "5", type: "multiple" });
  if (filters.difficulty) params.set("difficulty", filters.difficulty);
  if (filters.category) params.set("category", filters.category);
  const API_URL = `https://opentdb.com/api.php?${params.toString()}`;

  // Local state for quiz lifecycle management
  const [quizData, setQuizData] = React.useState<QuizQuestion[]>([]); // Questions, options, and correct answers
  const [submitted, setSubmitted] = React.useState(false); // Whether the user has submitted the quiz
  const [score, setScore] = React.useState(0); // The user's total score (number of correct answers)
  const [answers, setAnswers] = React.useState<(number | null)[]>([]); // User's selected answers (index per question)

  /**
   * fetchQuizData()
   * Fetches and normalizes quiz data from the OpenTDB API.
   * - Decodes HTML entities in questions and answers.
   * - Shuffles answer options for randomness.
   * - Resets local answers state for new quiz data.
   */
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
        setAnswers(Array(mapped.length).fill(null)); // Reset answers for new questions
      })
      .catch((err) => console.error(err)); // Handle fetch error (could improve with user feedback)
  }, [API_URL]);

  // Fetch quiz data on mount and whenever filters/API_URL change
  React.useEffect(() => {
    fetchQuizData();
  }, [fetchQuizData]);

  /**
   * submitButtonClicked()
   * Handles the logic when the submit or play again button is clicked.
   * - Computes score and marks quiz as submitted when first clicked.
   * - Resets quiz state and fetches new questions when clicked again to play again.
   */
  const submitButtonClicked = (): void => {
    if (!submitted) {
      // Calculate the total score (number of correct answers)
      const total = answers.reduce<number>((sum, selectedIdx, i) => {
        if (selectedIdx == null) return sum;

        const q = quizData[i];
        if (!q) return sum;

        const option = q.options[selectedIdx];
        if (!option) return sum;

        return sum + (option === q.correct_answer ? 1 : 0);
      }, 0);

      setScore(total); // Set score based on correct answers
      setSubmitted(true); // Mark quiz as submitted

      // Focus results section for screen readers and keyboard users
      setTimeout(() => {
        resultsRef.current?.focus();
      }, 0);
    } else {
      // Reset state and fetch new quiz data for a new round
      setSubmitted(false);
      setScore(0);
      setAnswers([]);
      fetchQuizData();

      // Smooth scroll to the top after fetching new data
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }
  };

  // Count how many questions have been answered by the user
  const answeredCount = answers.filter((answer) => answer !== null).length;

  return (
    <>
      {/* Global top navigation bar */}
      <Nav
        answeredCount={answeredCount}
        totalQuestions={quizData.length}
        submitted={submitted}
      />

      <main id="page-top" className="quiz">
        {/* Lazy-load the QuestionCard component, displaying a fallback while loading */}
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

        {/* Results and primary action button (Submit / Play again) */}
        <ResultsSection
          ref={resultsRef}
          onButtonClick={submitButtonClicked}
          submitted={submitted}
          scoreResults={score}
          numberOfQuestions={quizData.length}
        />

        {/* Display confetti animation if the user scored correctly */}
        {submitted && score > 0 ? (
          <Confetti
            width={width}
            height={height}
            style={{ position: "fixed", inset: 0, pointerEvents: "none" }}
          />
        ) : null}
      </main>

      {/* Decorative background element */}
      <img
        src={DarkPurpleBackgroundEllipse}
        alt="Dark purple background ellipse"
        className="dark-purple-background-ellipse"
      />
    </>
  );
}

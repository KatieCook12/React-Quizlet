// ===============================
// QuizPage.jsx — builds API URL from router state (difficulty/category)
// ===============================

// Global styles for the app
import "../css/app.css";
import "../css/quiz-page.css";

// App components
import QuestionCard from "../components/QuestionCard";
import ResultsSection from "../components/ResultsSection";
import Nav from "../components/Nav";

// Static asset for decorative background
import DarkPurpleBackgroundEllipse from "../images/background-dark-purple-ellipse.svg";

// Hooks
import { useWindowSize } from "../hooks/UseWindowSize";
import { useLocation } from "react-router-dom"; // <-- read filters passed from Home

// React and helpers
import React from "react";
import { decode } from "html-entities";

// Celebration effect after submission
import Confetti from "react-confetti";

// Utility: shallow shuffle for answer options
const shuffleOptions = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

// ===============================
// Component
// ===============================

export default function QuizPage() {

  // Read window size for the confetti canvas
  const { width, height } = useWindowSize();

  // Read filters (difficulty, category) from router state
  const { state } = useLocation();
  const filters = state?.filters || {}; // { difficulty, category }

  // Build OpenTDB URL with chosen filters
  const params = new URLSearchParams({ amount: "5", type: "multiple" });
  if (filters.difficulty) params.set("difficulty", filters.difficulty);
  if (filters.category) params.set("category", filters.category);
  const API_URL = `https://opentdb.com/api.php?${params.toString()}`;

  // Quiz questions: [{ question, options[], correct_answer }]
  const [quizData, setQuizData] = React.useState([]);

  // Has the user submitted answers yet?
  const [submitted, setSubmitted] = React.useState(false);

  // Number of correct answers after submission
  const [score, setScore] = React.useState(0);

  // Selected option index per question (null when unanswered)
  const [answers, setAnswers] = React.useState([]);

  // Fetch quiz data from API and normalize it for rendering
  const fetchQuizData = React.useCallback(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        if (!data.results) return;

        // Map API items into a shape convenient for rendering/marking
        const mapped = data.results.map((item) => ({
          question: decode(item.question),
          options: shuffleOptions([
            ...item.incorrect_answers,
            item.correct_answer,
          ]).map(decode),
          correct_answer: decode(item.correct_answer),
        }));

        // Save questions
        setQuizData(mapped);

        // Reset selections for each question
        setAnswers(Array(mapped.length).fill(null));
      })
      .catch((err) => console.error(err));
  }, [API_URL]); // re-fetch if filters (hence URL) change

  // Kick off fetch on mount (and when filters change)
  React.useEffect(() => {
    fetchQuizData();
  }, [fetchQuizData]);

  // Handle the primary action button (Submit / Play again)
  const submitButtonClicked = () => {
    if (!submitted) {
      // When submitting, compute score from current selections
      const total = answers.reduce((sum, selectedIdx, i) => {
        if (selectedIdx == null) return sum; // unanswered
        const q = quizData[i];
        return sum + (q.options[selectedIdx] === q.correct_answer ? 1 : 0);
      }, 0);

      setScore(total);
      setSubmitted(true);
    } else {
      // Restart game: clear state and fetch a fresh quiz
      setSubmitted(false);
      setScore(0);
      setAnswers([]); // clear immediately before new data arrives
      fetchQuizData();
    }
  };

  return (
    <>

      {/* Top navigation (logo/back) */}
      <Nav />

      {/* Main quiz area */}
      <main className="quiz">

        {/* Render each question card with its options */}
        {quizData.map((question, id) => (
          <QuestionCard
            key={id}
            number={id + 1}
            question={question.question}
            options={question.options}
            correct_answer={question.correct_answer}
            submitted={submitted}
            selectedIndex={answers[id]}
            onSelect={(i) =>
              setAnswers((prev) => {
                const next = [...prev];

                // store selected option index for this question
                next[id] = i; 
                return next;
              })
            }
          />
        ))}

        {/* Results block and primary action button */}
        <ResultsSection
          onButtonClick={submitButtonClicked}
          submitted={submitted}
          scoreResults={score}
          numberOfQuestions={quizData.length}
        />

        {/* Confetti celebration only after submission */}
        {submitted ? (
          <Confetti
            width={width}
            height={height}
            style={{ position: "fixed", inset: 0, pointerEvents: "none" }}
          />
        ) : null}
      </main>

      {/* Decorative background ellipse (fixed, behind content) */}
      <img
        src={DarkPurpleBackgroundEllipse}
        alt="Dark purple background ellipse"
        className="dark-purple-background-ellipse"
      />
    </>
  );
}

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

// Styles & assets
import "../css/app.css";
import "../css/quiz-page.css";
import DarkPurpleBackgroundEllipse from "../images/background-dark-purple-ellipse.svg";
const QuestionCard = React.lazy(() => import("../components/QuestionCard"));

// Helpers
const shuffleOptions = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

export default function QuizPage() {
  const resultsRef = React.useRef(null);

  // Confetti sizing
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

  // Track submission state
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
      const total = answers.reduce((sum, selectedIdx, i) => {
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
      fetchQuizData();

      // Scroll back to the top of the page
      setTimeout(() => {
        document.getElementById("page-top")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <>
    
      {/* Top navigation (logo/back) */}
      <Nav />

      {/* Main quiz area */}
      <main id="page-top" className="quiz">
        <React.Suspense fallback={<h2>Loading questions...</h2>}>

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

                  // Store selected option index for this question
                  next[id] = i;
                  return next;
                })
              }
            />
          ))}
        </React.Suspense>

        {/* Results block and primary action button */}
        <ResultsSection
          ref={resultsRef}
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

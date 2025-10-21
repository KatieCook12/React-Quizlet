import React from "react";
import { decode } from "html-entities";
import { useLocation } from "react-router-dom";
import Confetti from "react-confetti";
import Nav from "../components/Nav";
import ResultsSection from "../components/ResultsSection";
import ProgressBar from "../components/ProgressBar";
import { useWindowSize } from "../hooks/UseWindowSize";
import "../css/app.css";
import "../css/quiz-page.css";
import DarkPurpleBackgroundEllipse from "../images/background-dark-purple-ellipse.svg";
import type { QuizQuestion, OpenTDBResponse, QuizFilters } from "../types/quiz";

const QuestionCard = React.lazy(() => import("../components/QuestionCard"));

const shuffleOptions = (array: string[]): string[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

type LocationState = {
  filters?: QuizFilters;
};

export default function QuizPage(): React.JSX.Element {
  const resultsRef = React.useRef<HTMLElement>(null);
  const { width, height } = useWindowSize();
  const { state } = useLocation() as { state: LocationState | null };
  const filters = state?.filters || {};

  const params = new URLSearchParams({ amount: "5", type: "multiple" });
  if (filters.difficulty) params.set("difficulty", filters.difficulty);
  if (filters.category) params.set("category", filters.category);
  const API_URL = `https://opentdb.com/api.php?${params.toString()}`;

  const [quizData, setQuizData] = React.useState<QuizQuestion[]>([]);
  const [submitted, setSubmitted] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [answers, setAnswers] = React.useState<(number | null)[]>([]);

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
      .catch((err) => console.error(err));
  }, [API_URL]);

  React.useEffect(() => {
    fetchQuizData();
  }, [fetchQuizData]);

  const submitButtonClicked = (): void => {
    if (!submitted) {
      const total = answers.reduce<number>((sum, selectedIdx, i) => {
        if (selectedIdx == null) return sum;
        const q = quizData[i];
        if (!q) return sum;
        const option = q.options[selectedIdx];
        if (!option) return sum;
        return sum + (option === q.correct_answer ? 1 : 0);
      }, 0);

      setScore(total);
      setSubmitted(true);

      setTimeout(() => {
        resultsRef.current?.focus();
      }, 0);
    } else {
      setSubmitted(false);
      setScore(0);
      setAnswers([]);
      fetchQuizData();

      setTimeout(() => {
        document.getElementById("page-top")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const answeredCount = answers.filter((answer) => answer !== null).length;

  return (
    <>
      <Nav />

      <main id="page-top" className="quiz">
        {!submitted && (
          <div style={{
            position: "sticky",
            top: "72px",
            zIndex: 99,
            width: "100%",
            background: "#430D97",
            padding: "0 64px",
            marginLeft: "-64px",
            marginRight: "-64px",
            paddingTop: "16px",
          }}>
            <ProgressBar answeredCount={answeredCount} totalQuestions={quizData.length} />
          </div>
        )}

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

        <ResultsSection
          ref={resultsRef}
          onButtonClick={submitButtonClicked}
          submitted={submitted}
          scoreResults={score}
          numberOfQuestions={quizData.length}
        />

        {submitted ? (
          <Confetti
            width={width}
            height={height}
            style={{ position: "fixed", inset: 0, pointerEvents: "none" }}
          />
        ) : null}
      </main>

      <img
        src={DarkPurpleBackgroundEllipse}
        alt="Dark purple background ellipse"
        className="dark-purple-background-ellipse"
      />
    </>
  );
}

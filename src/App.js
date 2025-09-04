// Global styles for the app
import './css/App.css';

// App components
import Header from "./components/Header";
import QuestionCard from './components/QuestionCard';
import ResultsSection from './components/ResultsSection';

// Static asset for decorative background
import DarkPurpleBackgroundEllipse from './images/background-dark-purple-ellipse.svg';

// React and helpers
import React from 'react';
import { decode } from 'html-entities';

// Celebration effect after submission
import Confetti from 'react-confetti';

// Open Trivia DB: 5 multiple-choice questions (stable top-level const)
const API_URL = "https://opentdb.com/api.php?amount=5&type=multiple";

// Utility: shallow shuffle for answer options (stable top-level function)
const shuffleOptions = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

function App() {
  // Quiz state

  // [{question, options[], correct_answer}]
  const [quizData, setQuizData] = React.useState([]);
  
  // Has the user submitted answers?
  const [submitted, setSubmitted] = React.useState(false);

  // Number of correct answers
  const [score, setScore] = React.useState(0);
  
  // Selected option index per question (or null)
  const [answers, setAnswers] = React.useState([]);

  // 1) Fetch quiz data from API and normalize it
  const fetchQuizData = React.useCallback(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        if (data.results) {
          
          // Map API items into a shape convenient for rendering/marking
          const mapped = data.results.map((item) => ({
            question: decode(item.question),
            options: shuffleOptions([
              ...item.incorrect_answers,
              item.correct_answer,
            ]).map(decode),
            correct_answer: decode(item.correct_answer),
          }));

          // Store questions
          setQuizData(mapped);
          
          // Reset selections for each question
          setAnswers(Array(mapped.length).fill(null));
        }
      })
      .catch((err) => console.error(err));
  }, []); // no deps needed because API_URL & shuffleOptions are top-level constants

  // Kick off first fetch on mount
  React.useEffect(() => {
    fetchQuizData();
  }, [fetchQuizData]);

  // Handle submit/play again button
  const submitButtonClicked = () => {
    if (!submitted) {
      // When submitting, compute the score from current selections
      const total = answers.reduce((sum, selectedIdx, i) => {
        if (selectedIdx == null) return sum; // unanswered
        const q = quizData[i];

        // Compare chosen option text to the known correct answer
        return sum + (q.options[selectedIdx] === q.correct_answer ? 1 : 0);
      }, 0);

      setScore(total);
      setSubmitted(true);
    } else {
      // Restarts game: clear state and fetch a fresh quiz
      setSubmitted(false);
      setScore(0);

      // optional: clear immediately before new data arrives
      setAnswers([]);
      fetchQuizData();
    }
  };

  return (
    <div className='app'>
      {/* App header/branding */}
      <Header />

      <main>
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
                // store the selected option index for this question
                next[id] = i; 
                return next;
              })
            }
          />
        ))}

        {/* Results and primary action (Submit / Play again) */}
        <ResultsSection
          onButtonClick={submitButtonClicked}
          submitted={submitted}
          scoreResults={score}
          numberOfQuestions={quizData.length}
        />

        {/* Confetti celebration only after submission */}
        {submitted ? (
          <Confetti
            width={1600} 
            height={1743.6}
            gravity={0.2}
          />
        ) : null}
      </main>

      {/* Decorative background ellipse */}
      <img
        src={DarkPurpleBackgroundEllipse}
        alt="Dark purple background ellipse"
        className='dark-purple-background-ellipse'
      />
    </div>
  );
}

export default App;

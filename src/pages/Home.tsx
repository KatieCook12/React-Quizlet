import React from "react";
import { useNavigate } from "react-router-dom";

// Styles for the home page and the main application
import "../css/app.css";
import "../css/home-page.css";

// Assets: images used for branding and background
import QuizletWhiteLogo from "../images/quizlet-logo-white.svg";
import DarkPurpleBackgroundEllipse from "../images/background-dark-purple-ellipse.svg";

export default function Home(): React.JSX.Element {
  const navigate = useNavigate();

  /**
   * handleStart()
   * Handles the form submission to start the quiz.
   * Prevents the default form action, extracts form data, and navigates
   * to the quiz page while passing the selected filters as route state.
   */
  function handleStart(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault(); // Prevents the default form submission behavior

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Convert FormData into a plain object for easier manipulation
    const data = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;

    // Navigate to the quiz page and pass selected filters via the route state
    navigate("/quiz", { state: { filters: data } });
  }

  return (
    <>
      {/* Main content section for the quiz start screen */}
      <main className="home-page">
        {/* Quizlet branding logo */}
        <img
          className="logo"
          src={QuizletWhiteLogo}
          alt="White Quizlet logo with rocket"
        />

        {/* Form to select quiz options (difficulty and category) */}
        <form onSubmit={handleStart}>
          <div className="drop-down-selections">
            {/* Dropdown for selecting quiz difficulty */}
            <div className="drop-down">
              <label htmlFor="difficulty">Select difficulty</label>
              <select
                className="select"
                id="difficulty"
                name="difficulty"
                defaultValue="easy"
              >
                <option value="" disabled>
                  Any difficulty
                </option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            {/* Dropdown for selecting quiz category */}
            <div className="drop-down">
              <label htmlFor="category">Select category</label>
              <select
                className="select"
                id="category"
                name="category"
                defaultValue="9"
              >
                <option value="" disabled>
                  Any category
                </option>
                <option value="9">General knowledge</option>
                <option value="10">Books</option>
                <option value="11">Film</option>
                <option value="12">Music</option>
                <option value="15">Video games</option>
                <option value="25">Art</option>
                <option value="27">Animals</option>
              </select>
            </div>
          </div>

          {/* Submit button to start the quiz */}
          <button type="submit">Start quiz</button>
        </form>
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

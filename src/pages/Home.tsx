<<<<<<< HEAD
import "../css/app.css";
import "../css/home-page.css";
import QuizletWhiteLogo from "../images/quizlet-logo-white.svg";
import DarkPurpleBackgroundEllipse from "../images/background-dark-purple-ellipse.svg";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home(): React.JSX.Element {
  const navigate = useNavigate();

=======
// Import component-specific and global styles
import "../css/app.css";
import "../css/home-page.css";

// Import assets
import QuizletWhiteLogo from "../images/quizlet-logo-white.svg";
import DarkPurpleBackgroundEllipse from "../images/background-dark-purple-ellipse.svg";

import React from "react";
import { useNavigate } from "react-router-dom";

// Home component: Displays the quiz start screen where users can select difficulty and category
export default function Home(): React.JSX.Element {
  
  // React Router hook for programmatic navigation between routes
  const navigate = useNavigate();

  /**
   * Handles quiz start form submission.
   * - Prevents default form behavior
   * - Reads selected values (difficulty & category)
   * - Passes them as route state to the quiz page
   */
>>>>>>> 32b3d63 (Loading progress bar)
  function handleStart(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
<<<<<<< HEAD
    const data = Object.fromEntries(formData.entries()) as Record<string, string>;

=======

    // Convert form data into a plain object for easier handling
    const data = Object.fromEntries(formData.entries()) as Record<string, string>;

    // Navigate to the quiz page and pass selected filters as route state
>>>>>>> 32b3d63 (Loading progress bar)
    navigate("/quiz", { state: { filters: data } });
  }

  return (
    <>
<<<<<<< HEAD
      <main className="home-page">
        <img
          className="logo"
          src={QuizletWhiteLogo}
          alt="White Quizlet logo with rocket"
        />

        <form onSubmit={handleStart}>
        <div className="drop-down-selections">
          <div className="drop-down">
            <label htmlFor="difficulty">Select difficulty</label>
            <select className="select" id="difficulty" name="difficulty" defaultValue="easy">
              <option value="" disabled>
                Any difficulty
              </option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div className="drop-down">
            <label htmlFor="category">Select category</label>
            <select className="select" id="category" name="category" defaultValue="9">
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

=======

      {/* 
        Main quiz start screen
        - Displays logo, form for quiz options, and a start button
      */}
      <main className="home-page">
        {/* Quizlet-style logo at top of home screen */}
        <img
          className="logo"
          src={QuizletWhiteLogo}
          alt="White Quizlet logo with rocket"  // Accessible alt text for screen readers
        />

        {/* 
          Form for selecting quiz options 
          - Difficulty and category are selectable
          - Submission triggers navigation to quiz
        */}
        <form onSubmit={handleStart}>
          <div className="drop-down-selections">

            {/* Difficulty dropdown */}
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

            {/* Category dropdown */}
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

          {/* Submit button that begins the quiz */}
>>>>>>> 32b3d63 (Loading progress bar)
          <button type="submit">Start quiz</button>
        </form>
      </main>

<<<<<<< HEAD
=======
      {/* Decorative background element (hidden meaning-wise, visual only) */}
>>>>>>> 32b3d63 (Loading progress bar)
      <img
        src={DarkPurpleBackgroundEllipse}
        alt="Dark purple background ellipse"
        className="dark-purple-background-ellipse"
      />
    </>
  );
}

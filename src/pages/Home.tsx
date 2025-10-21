// ===============================
// Home.jsx — with form submit -> read values -> navigate to /quiz
// ===============================

// Global styles
import "../css/app.css";
import "../css/home-page.css";

// Assets
import QuizletWhiteLogo from "../images/quizlet-logo-white.svg";
import DarkPurpleBackgroundEllipse from "../images/background-dark-purple-ellipse.svg";

// Router / React
import React from "react";
import { useNavigate } from "react-router-dom";
import { QuizFilters } from "../types";

export default function Home() {
  const navigate = useNavigate();

  // Handle form submit: read FormData and navigate to /quiz with filters in state
  function handleStart(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;

    // gather all fields
    const formData = new FormData(form);

    // Convert FormData entries to a plain object: { difficulty, category }
    const data = Object.fromEntries(formData.entries()) as QuizFilters;

    // Navigate to quiz and pass filters via router state
    navigate("/quiz", { state: { filters: data } });
  }

  return (
    <>
      {/* Main hero section */}
      <main className="home-page">

        {/* Brand logo */}
        <img
          className="logo"
          src={QuizletWhiteLogo}
          alt="White Quizlet logo with rocket"
        />

        {/* Start form */}
        <form onSubmit={handleStart}>

        <div className="drop-down-selections">

          {/* Difficulty selector */}
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

          {/* Category selector */}
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

          {/* Submit to start the quiz with chosen filters */}
          <button type="submit">Start quiz</button>
        </form>
      </main>

      {/* Background ellipse (fixed, behind content) */}
      <img
        src={DarkPurpleBackgroundEllipse}
        alt="Dark purple background ellipse"
        className="dark-purple-background-ellipse"
      />
    </>
  );
}

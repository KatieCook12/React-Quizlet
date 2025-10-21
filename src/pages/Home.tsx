import "../css/app.css";
import "../css/home-page.css";
import QuizletWhiteLogo from "../images/quizlet-logo-white.svg";
import DarkPurpleBackgroundEllipse from "../images/background-dark-purple-ellipse.svg";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home(): React.JSX.Element {
  const navigate = useNavigate();

  function handleStart(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries()) as Record<string, string>;

    navigate("/quiz", { state: { filters: data } });
  }

  return (
    <>
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

          <button type="submit">Start quiz</button>
        </form>
      </main>

      <img
        src={DarkPurpleBackgroundEllipse}
        alt="Dark purple background ellipse"
        className="dark-purple-background-ellipse"
      />
    </>
  );
}

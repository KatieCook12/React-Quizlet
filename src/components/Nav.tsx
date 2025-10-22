import React from "react";
import ProgressBar from "./ProgressBar";
import BackButtonArrow from "../images/back-button-arrow-white.svg";
import QuizletWhiteLogo from "../images/quizlet-logo-white.svg";
import { Link } from "react-router-dom";

/**
 * NavProps defines the expected properties for the Nav component.
 *
 * - answeredCount: Number of questions the user has answered so far.
 * - totalQuestions: Total number of questions in the quiz.
 * - submitted: Indicates whether the quiz has been submitted (hides progress bar if true).
 */
type NavProps = {
  answeredCount?: number;
  totalQuestions?: number;
  submitted?: boolean;
};

/**
 * Nav component displays the top navigation bar of the quiz interface.
 *
 * It includes:
 * - A back button to return to the home page.
 * - A logo linking back to the quiz start.
 * - A progress bar showing quiz completion (hidden after submission).
 *
 * The header also visually changes once the user scrolls down the page.
 */
export default function Nav({
  answeredCount = 0,
  totalQuestions = 0,
  submitted = false,
}: NavProps): React.JSX.Element {
  // Tracks whether the user has scrolled past a threshold (20px).
  // Used to apply a "scrolled" style for visual feedback (e.g., adding a shadow).
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    // Adds an event listener to detect vertical scroll position.
    const onScroll = () => setScrolled(window.scrollY > 20);

    window.addEventListener("scroll", onScroll);
    // Cleanup ensures no memory leaks by removing the listener on unmount.
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`} id="page-top">
      <div className="nav__inner">
        {/* 
          Back button navigates to the home page. 
          Uses a semantic <Link> for client-side routing.
        */}
        <Link to="/" className="nav__back">
          <img
            src={BackButtonArrow}
            alt="White left pointing arrow"
            className="back-button"
          />
        </Link>

        {/* 
          Logo serves as a link to restart or return to the quiz section. 
          Provides consistent branding across the app.
        */}
        <Link to="/quiz" className="nav__logo">
          <img
            src={QuizletWhiteLogo}
            alt="White Quizlet logo with rocket"
            className="logo"
          />
        </Link>
      </div>

      {/* 
        Display the progress bar only when:
        - The quiz is in progress (not submitted), and
        - There are questions to answer.
        This prevents unnecessary UI elements post-submission.
      */}
      {!submitted && totalQuestions > 0 && (
        <div className="nav__progress">
          <ProgressBar
            answeredCount={answeredCount}
            totalQuestions={totalQuestions}
          />
        </div>
      )}
    </header>
  );
}

<<<<<<< HEAD
import BackButtonArrow from '../images/back-button-arrow-white.svg';
import QuizletWhiteLogo from '../images/quizlet-logo-white.svg';
import { Link } from "react-router-dom";

export default function Nav(): React.JSX.Element {
    return (
        <nav className="nav" id="page-top">
            <Link to="/">
            <img
                src={BackButtonArrow}
                alt="White left pointing arrow"
                className="back-button"
            />
            </Link>

            <Link to="/quiz">
            <img
                src={QuizletWhiteLogo}
                alt="White Quizlet logo with rocket"
                className="logo"
            />
            </Link>
        </nav>
    );
}
=======
import React from "react";
import ProgressBar from "./ProgressBar";
import BackButtonArrow from "../images/back-button-arrow-white.svg";
import QuizletWhiteLogo from "../images/quizlet-logo-white.svg";
import { Link } from "react-router-dom";

type NavProps = {
  answeredCount?: number;
  totalQuestions?: number;
  submitted?: boolean;
};

export default function Nav({
  answeredCount = 0,
  totalQuestions = 0,
  submitted = false,
}: NavProps): React.JSX.Element {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      // toggle after scrolling down a bit
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="nav__inner">
        <Link to="/" className="nav__back">
          <img
            src={BackButtonArrow}
            alt="White left pointing arrow"
            className="back-button"
          />
        </Link>

        <Link to="/quiz" className="nav__logo">
          <img
            src={QuizletWhiteLogo}
            alt="White Quizlet logo with rocket"
            className="logo"
          />
        </Link>

        
      </div>

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
>>>>>>> 32b3d63 (Loading progress bar)

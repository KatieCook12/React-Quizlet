// Import the white back button arrow SVG image
import BackButtonArrow from '../images/back-button-arrow-white.svg'
import QuizletWhiteLogo from '../images/quizlet-logo-white.svg'
import { Link } from "react-router-dom";
import ProgressBar from "./ProgressBar";

interface NavProps {
  showProgress?: boolean;
  answered?: number;
  total?: number;
}

export default function Nav({ showProgress = false, answered = 0, total = 5 }: NavProps) {
    return (
        <>
            <a href="#main-content" className="skip-link">
                Skip to main content
            </a>
            <nav className="nav" id="page-top" aria-label="Main navigation">
                <div className="nav-content">
                    <Link to="/" aria-label="Go back to home page">
                        <img
                            src={BackButtonArrow}
                            alt=""
                            className="back-button"
                            aria-hidden="true"
                        />
                    </Link>

                    <Link to="/quiz" aria-label="Quizlet home">
                        <img
                            src={QuizletWhiteLogo}
                            alt=""
                            className="logo"
                            aria-hidden="true"
                        />
                    </Link>
                </div>

                {showProgress && (
                    <ProgressBar answered={answered} total={total} />
                )}
            </nav>
        </>
    )
}
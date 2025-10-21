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
        <nav className="nav" id="page-top">
            <div className="nav-content">
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
            </div>

            {showProgress && (
                <ProgressBar answered={answered} total={total} />
            )}
        </nav>
    )
}
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
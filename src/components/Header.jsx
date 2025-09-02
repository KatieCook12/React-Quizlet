import BackButtonArrow from '../images/back-button-arrow-white.svg'
import QuizletWhiteLogo from '../images/quizlet-logo-white.svg'

export default function Header() {
    
    return (
        <header class="header">
            <img src={BackButtonArrow} alt="White left pointing arrow" class="back-button"></img>
            <img src={QuizletWhiteLogo} alt="White Quizlet logo with rocket" class="logo"></img>
        </header>)
}
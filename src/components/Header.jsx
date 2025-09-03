// Import the white back button arrow SVG image
import BackButtonArrow from '../images/back-button-arrow-white.svg'

// Import the white Quizlet logo SVG image
import QuizletWhiteLogo from '../images/quizlet-logo-white.svg'

// Define and export the Header component so it can be used in other files
export default function Header() {

    return (
        // The <header> element wraps the top section of the page
        // Note: In React, you should use "className" instead of "class"
        <header class="header">
            
            {/* Render the back button arrow image */}
            <img 
                src={BackButtonArrow}                 
                alt="White left pointing arrow"       
                class="back-button"                  
            />

            {/* Render the Quizlet white logo image */}
            <img 
                src={QuizletWhiteLogo}               
                alt="White Quizlet logo with rocket"
                class="logo"
            />
        </header>
    )
}

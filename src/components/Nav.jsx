// Import the white back button arrow SVG image
import BackButtonArrow from '../images/back-button-arrow-white.svg'

// Import the white Quizlet logo SVG image
import QuizletWhiteLogo from '../images/quizlet-logo-white.svg'

import {Link } from "react-router-dom";


// Define and export the Header component so it can be used in other files
export default function Nav() {

    return (
        // The <header> element wraps the top section of the page
        // Note: In React, you should use "className" instead of "class"
        <nav class="nav">
            
            {/* Render the back button arrow image */}
            <Link to="/">
            <img 
                src={BackButtonArrow}                 
                alt="White left pointing arrow"       
                class="back-button"                  
            />
            </Link>

            {/* Render the Quizlet white logo image */}
            <Link to="/quiz">
            <img 
                src={QuizletWhiteLogo}               
                alt="White Quizlet logo with rocket"
                class="logo"
            />
            </Link>
        </nav>
    )
}
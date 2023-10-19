import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import './Footer.css'

export default function Footer() {
    return (
        <div className='footer'>
            <div id='footer-description'>
                <h1 id='footer-kitchen-riffs'>kitchen riffs</h1>
                <h2 id='footer-description-text'>This recipe website combines features from Bon Appetit and Epicurious. Search for recipes based on ingredients in the fridge. If there are not exact matches, inspiration will be provided to riff on. Happy cooking!</h2>
            </div>
            <div id='footer-links'>
                <h3>Credits</h3>
                <ul>
                    <li>
                        <NavLink to='https://www.bonappetit.com/'>Bon Appetit - styling & photos</NavLink>
                    </li>
                    <li>
                        <NavLink to='https://www.epicurious.com/'>Epicurious - features</NavLink>
                    </li>
                    <li>
                        <NavLink to='https://rapidapi.com/apidojo/api/tasty/'>Tasty - recipe inspiration API</NavLink>
                    </li>
                </ul>
            </div>
            <div id='footer-contact'>
                <h3>Contact</h3>
                {/* <p>Thanks for visiting</p> */}
                <div id='footer-contact-links'>
                    <a href="https://github.com/shanenak/kitchen-riffs"><i className="fa-brands fa-square-github"></i></a>
                    <a href="https://www.linkedin.com/in/shannonnmillar/"><i className="fa-brands fa-linkedin"></i></a>
                </div>
            </div>
        </div>
    )
}
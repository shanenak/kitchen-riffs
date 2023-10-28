import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import './cssReset.css'
import './Navigation.css'

export function Navigation () {
    const sessionUser = useSelector(state => state.session.user)

    let navLinks;
    if (sessionUser) {
        navLinks = (
            <ProfileButton user={sessionUser} />
        )
    } else {
        navLinks = (
            <>
                <li>
                    <NavLink to='/signup'>SIGN UP</NavLink>
                </li>
                <li>
                    <NavLink to='/login'>LOG IN</NavLink>
                </li>
            </>
        )
    }
        return (
            <div id='nav'>
                <div className='contact-links'>
                    <a href="https://github.com/shanenak/kitchen-riffs"><i className="fa-brands fa-square-github"></i></a>
                    <a href="https://www.linkedin.com/in/shannonnmillar/"><i className="fa-brands fa-linkedin"></i></a>
                </div>
                <div id='kitchen-riffs'>
                    <NavLink to='/'>kitchen riffs</NavLink>
                </div>
                <ul id='nav-links'>
                    {navLinks}
                </ul>
            </div>
        )
    
}
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import './Navigation.css'
import './cssReset.css'

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
                <ul id='nav-links'>
                    {navLinks}
                </ul>
            </div>
        )
    
}
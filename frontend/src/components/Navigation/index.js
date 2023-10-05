import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../store/session";
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import './Navigation.css'

export function Navigation () {
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch();

    const handleLogout = async (e) => {
        e.preventDefault();
        dispatch(logout())
    }

    if (sessionUser) {
        return (
            <div>
                <ul id='nav-bar'>
                    <li>
                        <ProfileButton />
                    </li>
                    <li>
                        <button onClick={handleLogout}>Log Out</button>
                    </li>
                </ul>
            </div>
        )
    } else {
        return (
            <div>
                <ul id='nav-bar'>
                    <li>
                        <NavLink to='/signup'>Sign Up</NavLink>
                    </li>
                    <li>
                        <NavLink to='/login'>Log In</NavLink>
                    </li>
                </ul>
            </div>
            )
    }
}
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../store/session";
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";

export function Navigation () {
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch();

    const handleLogout = async (e) => {
        e.preventDefault();
        dispatch(logout())
    }

    if (sessionUser) {
        return (
            <ul>
                <li>
                    <ProfileButton />
                </li>
                <li>
                    <button onClick={handleLogout}>Log Out</button>
                </li>
            </ul>
        )
    } else {
        return (
            <ul>
                <li>
                    <NavLink to='/signup'>Sign Up</NavLink>
                </li>
                <li>
                    <NavLink to='/login'>Log In</NavLink>
                </li>
            </ul>
        )
    }
}
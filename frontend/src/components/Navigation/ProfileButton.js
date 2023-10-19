import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { NavLink, Redirect } from "react-router-dom/cjs/react-router-dom";


export default function ProfileButton ({user}) {
    const [showMenu, setShowMenu] = useState(false)

    const dispatch = useDispatch();
    const handleLogout = async (e) => {
        // e.preventDefault();
        dispatch(logout())
    }

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    }

    // useEffect(()=>{
    //     if (!showMenu) return;

    //     const closeMenu = () => {
    //         setShowMenu(false);
    //     }
        
    //     document.addEventListener('click', closeMenu);

    //     return ()=> document.removeEventListener('click', closeMenu);
    // }, [showMenu])

    return (
        <>
                <li>
                    <NavLink to='/saved'>SAVED RECIPES</NavLink>
                </li>
                <li>
                    <a onClick={handleLogout}>LOG OUT</a>
                </li>
            </>

        // <div className='icon' onClick={openMenu}>
        //     <i className="fa-solid fa-user"></i>
        //     <div className={`dropdown ${showMenu ? 'show' : 'hide'}`} id='dropdown-nav' visibility="hidden">
        //         <ul>
        //             <li>
        //                 <p>Logged in as {user.name}</p>
        //             </li>
        //             <li>
        //                 <NavLink to='/saved'>SAVED RECIPES</NavLink>
        //             </li>
        //             <li >
        //                 <button id='logout-nav' onClick={handleLogout}>Log Out</button>
        //             </li>
        //         </ul>
        //     </div>
        // </div>
    )
}
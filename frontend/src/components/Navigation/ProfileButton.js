import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";


export default function ProfileButton ({user}) {
    const [showMenu, setShowMenu] = useState(false)

    const dispatch = useDispatch();
    const handleLogout = async (e) => {
        e.preventDefault();
        dispatch(logout())
    }

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    }

    useEffect(()=>{
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        }
        
        document.addEventListener('click', closeMenu);

        return ()=> document.removeEventListener('click', closeMenu);
    }, [showMenu])

    return (
        <div className='icon' onClick={openMenu}>
            <i className="fa-solid fa-user"></i>
            <div className={`dropdown ${showMenu ? 'show' : 'hide'}`} visibility="hidden">
                <ul>
                    <li>
                        <p>Logged in as {user.email}</p>
                    </li>
                    <li>
                        <button onClick={handleLogout}>Log Out</button>
                    </li>
                </ul>
            </div>
        </div>
    )
}
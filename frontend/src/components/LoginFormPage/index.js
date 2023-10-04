import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/session";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

import './LoginForm.css'

export default function LoginFormPage () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user)
    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(login({email, password}))
            .catch(async (res) => {
                let data;
                try {
                    data = await res.clone().json();
                } catch {
                    data = await res.text();
                }
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
            })
        
    }

    return (
        <>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map(error=><li key={error}>{error}</li>)}
                </ul>
                <label>Email
                    <input 
                        type="text" 
                        value={email} 
                        onChange={e=> setEmail(e.target.value)}
                    />
                </label>
                <label>Password
                    <input 
                        type="text" 
                        value={password} 
                        onChange={e=> setPassword(e.target.value)}
                    />
                </label>
                <button type="submit">Log In</button>
            </form>
        </>
    )
}
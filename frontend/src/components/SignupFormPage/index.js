import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, signup } from "../../store/session";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

export default function SignupFormPage () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user)
    if (sessionUser) return <Redirect to="/" />;

     const handleSubmit = (e) => {
        e.preventDefault();
        if (password === passwordConfirm) {
        setErrors([]);
        return dispatch(signup({ email, password }))
            .catch(async (res) => {
            let data;
            try {
            // .clone() essentially allows you to read the response body twice
            data = await res.clone().json();
            } catch {
            data = await res.text(); // Will hit this case if, e.g., server is down
            }
            if (data?.errors) setErrors(data.errors);
            else if (data) setErrors([data]);
            else setErrors([res.statusText]);
        });
        }
        return setErrors(['Confirm Password field must match the Password field']);
    };

    return (
        <>
            <h1>Sign Up</h1>
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
                        type="password" 
                        value={password} 
                        onChange={e=> setPassword(e.target.value)}
                    />
                </label>
                <label>Confirm Password
                    <input 
                        type="password" 
                        value={passwordConfirm} 
                        onChange={e=> setPasswordConfirm(e.target.value)}
                    />
                </label>
                <button type="submit">Sign Up</button>
            </form>
        </>
    )
}
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../store/session";
import { Redirect } from "react-router-dom";
import './SignupForm.css'

export default function SignupFormPage () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [name, setName] = useState("");

    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user)
    if (sessionUser) return <Redirect to="/" />;

     const handleSubmit = (e) => {
        e.preventDefault();
        if (password === passwordConfirm) {
        setErrors([]);
        return dispatch(signup({ email, password, name }))
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
        <div className='signup'>
            <div className='credentials'>
                <h1>SIGN UP</h1>
                <form onSubmit={handleSubmit}>
                    <ul className='error-list'>
                        {errors.map(error=><li key={error}>{error}</li>)}
                    </ul>
                    <div className='form-card'>
                        <label>Email
                            <input 
                                type="text" 
                                value={email} 
                                onChange={e=> setEmail(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <div className='form-card'>
                        <label>Name
                            <input 
                                type="text" 
                                value={name} 
                                onChange={e=> setName(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <div className='form-card'>
                        <label>Password
                            <input 
                                type="password" 
                                value={password} 
                                onChange={e=> setPassword(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <div className='form-card'>
                        <label>Confirm Password
                            <input 
                                type="password" 
                                value={passwordConfirm} 
                                onChange={e=> setPasswordConfirm(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <div className='form-card-button'>
                        <button type="submit">SIGN UP</button>
                    </div>
                </form>
            </div>
        </div>

    )
}
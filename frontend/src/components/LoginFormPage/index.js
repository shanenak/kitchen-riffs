import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/session";
import { Redirect, useHistory } from "react-router-dom/cjs/react-router-dom.min";

import './LoginForm.css'

export default function LoginFormPage () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user)
    if (sessionUser) return history.go(-1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        // history.goBack();
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

    const handleDemo = async (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(login({email: 'demo@user.io', password: 'password'}))
            .catch(async (res) => {
                let data;
                try {
                    data = await res.clone().json();
                } catch {
                    data = await res.text();
                }
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText])
            })
    }

    return (
        <div className='login'>
            <div className='credentials'>
                <h1>LOG IN</h1>
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
                        <label>Password
                            <input 
                                type="password" 
                                value={password} 
                                onChange={e=> setPassword(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <div className='form-card-button'>
                        <button type="submit">LOG IN</button>
                    </div>
                    <div className='form-card-button'>
                        <button onClick={handleDemo}>LOG IN AS DEMO USER</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
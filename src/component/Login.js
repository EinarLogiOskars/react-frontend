import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from '../styles/login.module.css';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'
import { NavLink } from "react-router-dom"

const Login = (props) => {
    const nav = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const onButtonClick = () => {
        
        setUsernameError("");
        setPasswordError("");
        
        if ("" === username) {
            setUsernameError("Please enter your username");
            return
        }
        
        if ("" === password) {
            setPasswordError("Please enter your password");
            return
        }
        
        if (username !== "" && password !== ""){
            const form = new FormData();
            form.append("username", username.toLowerCase())
            form.append("password", password)
            axios.post("http://localhost:8000/auth/login", form)
                .then((response) => {
                    props.setToken(response.data.access_token)
                    nav("/dashboard")
                }).catch((error) => {
                    console.log(error.response)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                    toast.error('Incorrect credentials!')
                })
        }

    }

    return (
        <div className={style.mainContainer}>
            <Toaster />
                <div className={style.titleContainer}>
                    <div>Login</div>
                </div>
                <br />
                <div className={style.formContainer}>
                    <div className={style.inputContainer}>
                        <input
                            value={username}
                            placeholder='Enter your username'
                            onChange={ev => setUsername(ev.target.value)}
                            className={style.inputBox} />
                        <label className={style.errorLabel}>{usernameError}</label>
                    </div>
                    <br />
                    <div className={style.inputContainer}>
                        <input
                            value={password}
                            placeholder='Enter your password'
                            onChange={ev => setPassword(ev.target.value)}
                            className={style.inputBox}
                            type='password' />
                        <label className={style.errorLabel}>{passwordError}</label>
                    </div>
                    <br />
                    <div className={style.buttonContainer}>
                        <input
                            className={style.inputButton}
                            type='button'
                            onClick={onButtonClick}
                            value={'Log in'} />
                    </div>
                    <div className={style.buttonContainer}>
                        <NavLink to={'/Register'}>Not registered yet? Register</NavLink>
                    </div>
                </div>
        </div>
    )
}

export default Login
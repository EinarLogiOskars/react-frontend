import { NavLink, unstable_useViewTransitionState } from "react-router-dom"
import classes from '../styles/register.module.css'
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast'

const Register = () => {
    const nav = useNavigate()
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [firstNameError, setFirstNameError] = useState("")
    const [lastNameError, setLastNameError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [usernameError, setUsernameError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [infoValid, setInfoValid] = useState(true)


    const onButtonClick = () => {
        setFirstNameError("")
        setLastNameError("")
        setEmailError("")
        setUsernameError("")
        setPasswordError("")


        if ("" === firstName) {
            setFirstNameError("Please enter your first name.")
            setInfoValid(false)
            return
        }
        if ("" === lastName) {
            setLastNameError("Please enter your last name")
            setInfoValid(false)
            return
        }
        if ("" === email) {
            setEmailError("please enter your email.")
            setInfoValid(false)
            return
        }
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError("Please enter a valid email.")
            setInfoValid(false)
            return
        }
        if ("" === username) {
            setUsernameError("Please enter a username.")
            setInfoValid(false)
            return
        }
        if (username.length > 16){
            setUsernameError("Username cannot exceed 16 characters.")
            setInfoValid(false)
            return
        }
        if ("" === password) {
            setPasswordError("Please enter a password")
            setInfoValid(false)
            return
        }
        
        if (infoValid) {
            const form = new FormData()
            form.append('first_name', firstName)
            form.append('last_name', lastName)
            form.append('email', email)
            form.append('username', username)
            form.append('password', password)

            axios.post('http://localhost:8000/auth/register', form).then((response) => {
                console.log(response.status)
                console.log(response)
                if (response.status === 201) {
                    toast.success('User created! Redirecting to Login')
                    goToLogin()
                } else {
                    toast.error(response.data)
                }
            })
        }

    }

    const goToLogin = () => {
        const timer = setTimeout(() => nav('/login'), 2000)
    }

    return (
        <div className={classes.mainContainer}>
            <div className={classes.titleContainer}>
                <div>Register</div>
            </div>
            <div className={classes.formContainer}>
                <div><Toaster /></div>
                <div className={classes.inputContainer}>
                    <input
                        value={firstName}
                        placeholder="Enter your first name."
                        onChange={ev => setFirstName(ev.target.value)}
                        className={classes.inputBox} />
                    <label className={classes.errorLabel}>{firstNameError}</label>
                </div>
                <br />
                <div className={classes.inputContainer}>
                    <input
                        value={lastName}
                        placeholder="Enter your last name."
                        onChange={ev => setLastName(ev.target.value)}
                        className={classes.inputBox} />
                    <label className={classes.errorLabel}>{lastNameError}</label>
                </div>
                <br />
                <div className={classes.inputContainer}>
                    <input
                        value={email}
                        placeholder="Enter your email"
                        onChange={ev => setEmail(ev.target.value)}
                        className={classes.inputBox} />
                    <label className={classes.errorLabel}>{emailError}</label>
                </div>
                <br />
                <div className={classes.inputContainer}>
                    <input
                        value={username}
                        placeholder="Enter your username."
                        onChange={ev => setUsername(ev.target.value)}
                        className={classes.inputBox} />
                    <label className={classes.errorLabel}>{usernameError}</label>
                </div>
                <br />
                <div className={classes.inputContainer}>
                    <input
                        value={password}
                        placeholder="Enter your password"
                        onChange={ev => setPassword(ev.target.value)}
                        className={classes.inputBox}
                        type="password" />
                    <label className={classes.errorLabel}>{passwordError}</label>
                </div>
                <br />
                <div className={classes.buttonContainer}>
                    <NavLink to={'/Login'}>Already registered? Login</NavLink>
                    <input
                        className={classes.inputButton}
                        type='button'
                        onClick={onButtonClick}
                        value={'Register'} />
                </div>
            </div>
        </div>
    )
}

export default Register
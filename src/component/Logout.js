import { NavLink } from 'react-router-dom';
import classes from '../styles/home.module.css'

const Logout = () => {
    return (
        <div className={classes.mainContainer}>
            <div className={classes.titleContainer}>
                <div>Logged out!</div>
            </div>
                <p className={classes.ptag}>You have successfully logged out.</p>
                <NavLink to="/react-frontend">Go to homepage.</NavLink>
        </div>

    )
}

export default Logout;
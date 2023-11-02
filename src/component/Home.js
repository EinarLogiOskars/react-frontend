import classes from '../styles/home.module.css'
import { NavLink, useNavigate } from 'react-router-dom';
import useToken from '../hooks/useToken';
import { useEffect } from 'react';

const Home = () => {

    const { token } = useToken();
    const nav = useNavigate();

    useEffect(() => {
        if (token && token !== "" && token !== undefined) {
            nav("/dashboard");
        }
    })


    return (
        <div className={classes.mainContainer}>
            <div className={classes.titleContainer}>
                <div>Welcome</div>
            </div>
            <div className={classes.contentContainer}>
                <p className={classes.ptag}>This is website is a demo project I created to learn React.</p>
                <br />
                <NavLink to={'/register'}>Get started!</NavLink>
            </div>
        </div>

    )
}

export default Home;
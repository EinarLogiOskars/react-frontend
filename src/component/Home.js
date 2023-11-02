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
                <p className={classes.ptag}>This is website is a demo project I created to learn React. </p>
                <br />
                <p className={classes.ptag}>In order to use the site you need to close https://github.com/EinarLogiOskars/dvdrental-python.git 
                and run the docker-compose file. Without it this site will not function. </p>
                <br />
                <p className={classes.ptag}>Next you will need to register a user, in order to do so click the link below!</p>
                <br />
                <NavLink to={'/register'}>Get started!</NavLink>
            </div>
        </div>

    )
}

export default Home;
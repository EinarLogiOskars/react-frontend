import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import useToken from "../hooks/useToken";
import axios from "axios";
import classes from "../styles/film.module.css"
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

function Film () {
    const [isLoading1, setLoading1] = useState(true);
    const [isLoading2, setLoading2] = useState(true);
    const [film, setFilm] = useState();
    const [filmInfo, setFilmInfo] = useState();

    const nav = useNavigate();
    const { token } = useToken();

    const location = useLocation();
    let filmId = location.state.filmId;

    useEffect(() => {
        try {
            axios
                .get("http://localhost:8000/films/film/" + filmId, { headers: {"Authorization" : `Bearer ${token}`} })
                .then((response) => {
                    setFilm(response.data)
                    setLoading1(false)
            });
            axios
                .get("http://localhost:8000/films/film_list/" + filmId, { headers: {"Authorization" : `Bearer ${token}`} })
                .then((response) => {
                    setFilmInfo(response.data)
                    setLoading2(false)
                });
            } catch (err) {
                console.log(err)
            }
    }, []);
    
    if(isLoading1 || isLoading2) {
        return <p>loading...</p>
    }

    return (
        <div className={classes.mainContainer}>
            <div>
                <div>
                    <h1>{ film.title }</h1>
                </div>
                <div>
                    <p>{ film.release_year } <span className={ classes.spacing }>|</span> { (film.length - (film.length%60))/60 }h { film.length%60 }m <span className={ classes.spacing }>|</span> { film.rating }</p> 
                    <div className={ classes.category }>{ filmInfo.category }</div>
                    <div className={ classes.actors }>
                        <p className={ classes.boldP }>Actors:<span className={ classes.spacing }/></p><p> { filmInfo.actors }</p>
                    </div>
                </div>

            </div>
            <div className={ classes.flexColumn }>
                <div className={ classes.flexRow }>
                    <p className={ classes.boldP }>Rental duration:<span className={ classes.spacing }/></p>
                    <p>{ film.rental_duration} days</p>
                </div>
                <div className={ classes.flexRow }>
                    <p className={ classes.boldP }>Price:
                        <span className= { classes.spacing }/>
                    </p>
                    <p>{ filmInfo.price }$</p>
                </div>
            </div>
            <div className={ classes.description }>
                <p className={ classes.boldP }>Plot:</p>
                <p>{ film.description }</p>
            </div>
            <Button variant="contained" color="success" endIcon={<SendIcon />}>Rent</Button>
        </div>
    )
}

export default Film
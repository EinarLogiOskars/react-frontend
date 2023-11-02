import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import classes from '../styles/films.module.css';
import useToken from '../hooks/useToken';
import MUIDataTable from 'mui-datatables';
import { useNavigate } from 'react-router-dom';

function FilmList() {

    const nav = useNavigate();
    const { token } = useToken();
    const [films, setFilms] = useState([]);

    const columns = [
        {
            name: "fid",
            label: "fid",
            options: {
                display: false,
                filter: false
            }
        },
        {
            name: "title",
            label: "Title",
            options: {
                filter: false,
                sort: true,
            }
        },
        {
            name: "category",
            label: "Catergory"
        },
        {
            name: "rating",
            label: "Rating"
        },
        {
            name: "length",
            label: "Length (mins)",
            options: {
                filter: false
            }
        },
        {
            name: "price",
            label: "Price"
        }
        ];

    useEffect(() => {
        axios
            .get('http://localhost:8000/films/film_list', { headers: {"Authorization" : `Bearer ${token}`} })
            .then((response) => {
                setFilms(response.data);
            });
    }, []);

    const options = {
        filterType: 'dropdown',
        selectableRows: 'none',
        onRowClick: (rowData, rowState) => {
            nav('/film', {
                state: {
                    filmId: rowData[0],
                    film: films.find(film => film.fid === rowData[0])
                }
            });
        }
    };

    return (
        <div className={ classes.filmListContainer }>
            <MUIDataTable
                title={"Film List"}
                data={films}
                columns={columns}
                options={options}
            />
        </div>
    );
}

export default FilmList;
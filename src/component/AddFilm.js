import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import classes from "../styles/addFilm.module.css";
import Button from '@mui/material/Button';
import useToken from "../hooks/useToken";
import { useState, useEffect } from "react";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import { Form } from "react-router-dom";


function AddFilm() {

    const { token } = useToken();

    const languages = [
        {
            value: '1',
            label: 'English',
        },
        {
            value: '2',
            label: 'Italian',
        },
        {
            value: '3',
            label: 'Japanese',
        },
        {
            value: '4',
            label: 'Mandarin',
        },
        {
            value: '5',
            label: 'French',
        },
        {
            value: '6',
            label: 'German',
        }
    ];
    
    const ratings = [
        {
            value: 'G',
            label: 'G',
        },
        {
            value: 'PG',
            label: 'PG',
        },
        {
            value: 'PG-13',
            label: 'PG-13',
        },
        {
            value: 'R',
            label: 'R',
        },
        {
            value: 'NC-17',
            label: 'NC-17',
        }
    ];

    const columnsActors = [
        {
            name: "actor_id",
            label: "Actor_id",
            options: {
                display: false,
                filter: false
            }
        },
        {
            name: "first_name",
            label: "First Name",
            options: {
                filter: false,
                sort: true,
            }
        },
        {
            name: "last_name",
            label: "Last Name",
            options: {
                filter: false,
                sort: true,
            }
        }
    ];

    const columnsCategories = [
        {
            name: "category_id",
            label: "Category_id",
            options: {
                display: false,
                filter: false
            }
        },
        {
            name: "name",
            label: "Category",
            options: {
                filter: false,
                sort: true,
            }
        }
    ];

    const [isLoadingActors, setLoadingActors] = useState(true);
    const [isLoadingCategories, setLoadingCategories] = useState(true);
    const [actors, setActors] = useState();
    const [categories, setCategories] = useState();
    const [selectedActors, setSelectedActors] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [length, setLength] = useState();
    const [releaseYear, setReleaseYear] = useState();
    const [language, setLanguage] = useState();
    const [rating, setRating] = useState();
    const [rentalDuration, setRentalDuration] = useState();
    const [rentalRate, setRentalRate] = useState();
    const [replacementCost, setReplacementCost] = useState();

    useEffect(() => {
        axios
            .get('http://localhost:8000/actors/list', { headers: {'Authorization': `Bearer ${token}`} })
            .then((response) => {
                setActors(response.data);
                setLoadingActors(false);
                console.log(actors)
            });
            axios
                .get('http://localhost:8000/category/list', { headers: {'Authorization': `Bearer ${token}`} })
                .then((response) => {
                    setCategories(response.data);
                    setLoadingCategories(false);
                    console.log(categories)
                });
    }, []);

    const optionsActors = {
        filterType: 'dropdown',
        responsive: 'scrollMaxHeight',
        pagination: false,
        download: false,
        print: false,
        filter: false,
        viewColumns: false,
        tableBodyHeight: '163px',
        selectToolbarPlacement: 'none',
        searchAlwaysOpen: true,
        sortThirdClickReset: true,
        onRowsSelect: (curRowSelected, allRowsSelected) => {
            setSelectedActors([...allRowsSelected])
          }
    };
    
    const optionsCategories = {
        filterType: 'dropdown',
        responsive: 'scrollMaxHeight',
        pagination: false,
        download: false,
        print: false,
        filter: false,
        viewColumns: false,
        tableBodyHeight: '163px',
        selectToolbarPlacement: 'none',
        searchAlwaysOpen: true,
        sortThirdClickReset: true,
        onRowsSelect: (curRowSelected, allRowsSelected) => {
            setSelectedCategories([...allRowsSelected])
          }
    };

    if (isLoadingActors && isLoadingCategories) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }

    const onButtonClick = () => {

        const actor = [];
        const category = [];
        
        for (let i = 0; i < selectedActors.length; i++) {
            actor.push(selectedActors[i]?.index + 1);
        }
        for (let i = 0; i < selectedCategories.length; i++) {
            category.push(selectedCategories[i]?.index + 1);
        }

        const form = new FormData();
        form.append('title', title);
        form.append('description', description);
        form.append('release_year', releaseYear);
        form.append('language_id', language);
        form.append('rental_duration', rentalDuration);
        form.append('rental_rate', rentalRate);
        form.append('length', length);
        form.append('replacement_cost', replacementCost);
        form.append('rating', rating);
        form.append('category', category);
        form.append('actor', actor);

        axios
            .post('http://localhost:8000/films/add', form, { headers: {"Authorization" : `Bearer ${token}`} })
            .then((response) => {
                console.log(response);
            });

    };

    return (
        <div className={ classes.mainContainer }>
            <form className={ classes.form }>
                <div>
                    <Stack spacing={3}
                            marginLeft={5}>
                        <label>Movie Info: </label>
                        <TextField 
                                id="title" 
                                name="title" 
                                label="Title" 
                                variant="outlined" 
                                margin="normal"
                                onChange={ev => setTitle(ev.target.value)}
                                className={ classes.inputField1 } />
                        <TextField
                                id="release_year" 
                                name="release_year" 
                                label="Release year" 
                                variant="outlined" 
                                margin="normal"
                                type="number"
                                defaultValue='1900'
                                InputProps={{ inputProps: { min: 1900, max: 2023 } }}
                                onChange={ev => setReleaseYear(ev.target.value)}
                                className={ classes.inputField1 } />
                        <TextField 
                                id="lenght" 
                                name="length" 
                                label="Length" 
                                variant="outlined" 
                                margin="normal" 
                                helperText='Length in minutes'
                                onChange={ev => setLength(ev.target.value)}
                                className={ classes.inputField1 } />
                        <TextField 
                                id="description" 
                                name="description" 
                                label="Description" 
                                variant="outlined"
                                multiline
                                rows={3} 
                                margin="normal"
                                onChange={ev => setDescription(ev.target.value)}
                                className={ classes.inputField1 } />
                        <TextField 
                                id="language" 
                                select
                                name="language" 
                                label="Language" 
                                defaultValue="" 
                                margin="normal"
                                onChange={ev => setLanguage(ev.target.value)}
                                className={ classes.inputField1 }>
                                    {languages.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                        </TextField>
                        <TextField 
                                id="rating" 
                                select
                                name="rating" 
                                label="Rating" 
                                margin="normal"
                                defaultValue=''
                                onChange={ev => setRating(ev.target.value)}
                                className={ classes.inputField1 }>
                                    {ratings.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                        </TextField>
                    </Stack>
                </div>
                <div>
                    <Stack spacing={2}
                            marginLeft={5}>
                        <label>Actors:</label>
                        <MUIDataTable
                            title={""}
                            data={actors}
                            columns={columnsActors}
                            options={optionsActors} />
                        <br />
                        <label>Categories:</label>
                        <MUIDataTable
                            title={""}
                            data={categories}
                            columns={columnsCategories}
                            options={optionsCategories} />
                    </Stack>
                </div>
                <div>
                    <Stack spacing={3}
                            marginLeft={5}>
                        <label>Rental info: </label>
                        <TextField 
                                id="rental_duration" 
                                name="rental_duration" 
                                label="Rental Duration" 
                                variant="outlined" 
                                margin="normal"
                                helperText='Rental duration in days'
                                onChange={ev => setRentalDuration(ev.target.value)}
                                className={ classes.inputField2 } />
                        <TextField 
                                id="rental_rate" 
                                name="rental_rate" 
                                label="Rental Rate" 
                                variant="outlined" 
                                margin="normal" 
                                onChange={ev => setRentalRate(ev.target.value)}
                                className={ classes.inputField2 } />
                        <TextField 
                                id="replacement_cost" 
                                name="replacement_cost" 
                                label="Replacement Cost" 
                                variant="outlined" 
                                margin="normal" 
                                onChange={ev => setReplacementCost(ev.target.value)}
                                className={ classes.inputField2 } />
                        <Button
                            variant="contained"
                            onClick={onButtonClick}>Submit</Button>
                    </Stack>
                </div>
            </form>
        </div>
    )
}

export default AddFilm;
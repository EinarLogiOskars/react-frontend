import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import classes from "../styles/addFilm.module.css";
import Button from '@mui/material/Button';
import useToken from "../hooks/useToken";
import { useState, useEffect } from "react";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import { InputAdornment } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function AddFilm() {

    const { token } = useToken();
    const nav = useNavigate();

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
    const [catsValid, setCatsValid] = useState();

    const [title, setTitle] = useState();
    const titleRegex = new RegExp('^.{1,50}$');
    const [isTitleInvalid, setTitleInvalid] = useState(false);
    const validateTitle = (title) => {
        if (!titleRegex.test(title)) {
            setTitleInvalid(true);
        } else {
            setTitle(title);
            setTitleInvalid(false);
        }
    }

    const [description, setDescription] = useState();
    const [isDescInvalid, setDescInvalid] = useState(false);
    const validateDesc = (description) => {
        if (!description?.length > 0) {
            setDescInvalid(true);
        } else {
            setDescription(description);
            setDescInvalid(false);
        }
    }

    const [length, setLength] = useState();
    const lengthRegex = new RegExp('^[1-9][0-9]{0,2}$');
    const [isLengthInvalid, setLengthInvalid] = useState(false);
    const validateLength = (length) => {
        if (!lengthRegex.test(length)) {
            setLengthInvalid(true);
        } else {
            setLength(length);
            setLengthInvalid(false);
        }
    }

    const [releaseYear, setReleaseYear] = useState();
    const yearRegex = new RegExp('^(19[0-9][0-9]|20[0-1][0-9]|202[0-3])$');
    const [relYearInvalid, setRelYearInvalid] = useState(false);
    const validateYear = (year) => {
        if (!yearRegex.test(year) || year === "1900") {
            setRelYearInvalid(true);
        } else {
            setReleaseYear(year);
            setRelYearInvalid(false);
        }
    }

    const [language, setLanguage] = useState();
    const [isLanguageNotChosen, setIsLanguageNotChosen] = useState(false);
    const validateLanguage = (language) => {
        if (language === '') {
            setIsLanguageNotChosen(true);
        } else {
            setLanguage(language);
            setIsLanguageNotChosen(false);
        }
    }


    const [rating, setRating] = useState();
    const [isRatingNotChosen, setIsRatingNoteChosen] = useState(false);
    const validateRating = (rating) => {
        if (rating === '') {
            setIsRatingNoteChosen(true);
        } else {
            setRating(rating);
            setIsRatingNoteChosen(false);
        }
    }

    const [rentalDuration, setRentalDuration] = useState();
    const durationRegex = new RegExp('^[1-7]$');
    const [isRentDurationInvalid, setRentDurationInvalid] = useState(false);
    const validateRentDur = (rentalDuration) => {
        if (!durationRegex.test(rentalDuration)) {
            setRentDurationInvalid(true);
        } else {
            setRentalDuration(rentalDuration);
            setRentDurationInvalid(false);
        }
    }

    const [rentalRate, setRentalRate] = useState();
    const rentRateRegex = new RegExp('^[1-9][0-9]{0,1}(\\.[0-9]?[1-9])?$');
    const [isRentRateInvalid, setRentRateInvalid] = useState(false);
    const validateRentRate = (rentalRate) => {
        if (!rentRateRegex.test(rentalRate)) {
            setRentRateInvalid(true);
        } else {
            setRentalRate(rentalRate);
            setRentRateInvalid(false);
        }
    }

    const [replacementCost, setReplacementCost] = useState();
    const replaceCostRegex = new RegExp('^[1-9][0-9]{0,2}(\\.[0-9]?[1-9])?$');
    const [isReplaceCostInvalid, setReplaceCostInvalid] = useState(false);
    const validateReplaceCost = (replacementCost) => {
        if (!replaceCostRegex.test(replacementCost)) {
            setReplaceCostInvalid(true);
        } else {
            setReplacementCost(replacementCost);
            setReplaceCostInvalid(false);
        }
    }

    const [errorMessageCat, setErrorMessageCat] = useState('');
    const [errorMessageAct, setErrorMessageAct] = useState('');

    useEffect(() => {
        axios
            .get('http://localhost:8000/actors/list', { headers: {'Authorization': `Bearer ${token}`} })
            .then((response) => {
                setActors(response.data);
                setLoadingActors(false);
            });
        axios
            .get('http://localhost:8000/category/list', { headers: {'Authorization': `Bearer ${token}`} })
            .then((response) => {
                setCategories(response.data);
                setLoadingCategories(false);
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
            setSelectedActors([...allRowsSelected]);
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
            setSelectedCategories([...allRowsSelected]);
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

        if (actor.length === 0) {
            setErrorMessageAct('Must choose at least one.');
        } else {
            setErrorMessageAct('');
        }
        if (category.length === 0 || category.length > 1) {
            setErrorMessageCat('Must choose one. No more, no less!');
        } else {
            setErrorMessageCat('');
            setCatsValid(true)
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



        if (!isTitleInvalid && !isDescInvalid && !relYearInvalid && !isLanguageNotChosen && !isRentDurationInvalid && !isRentRateInvalid && !isLengthInvalid && !isReplaceCostInvalid && !isRatingNotChosen && catsValid && !actor.length == 0) {
            axios
                .post('http://localhost:8000/films/add', form, { headers: {"Authorization" : `Bearer ${token}`} })
                .then((response) => {
                    console.log(response);
                    if (response.status === 201) {
                        nav('/film', {
                            state: {
                                filmId: response.data
                            }
                        })
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            toast.error('Please verify the entered information!');
        }



    };

    return (
        <div className={ classes.mainContainer }>
            <form className={ classes.form }>
                <Toaster />
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
                                required
                                error={ isTitleInvalid }
                                helperText={ isTitleInvalid ? 'Please enter a title. Min length: 1 - Max length: 50' : '' }
                                onBlur={ev => validateTitle(ev.target.value)}
                                className={ classes.inputField1 } />
                        <TextField
                                id="release_year" 
                                name="release_year" 
                                label="Release year" 
                                variant="outlined" 
                                margin="normal"
                                required
                                error={ relYearInvalid }
                                helperText={ relYearInvalid ? 'Please enter a year between 1901 and 2023' : '' }
                                onBlur={ev => validateYear(ev.target.value)}
                                className={ classes.inputField1 } />
                        <TextField 
                                id="lenght" 
                                name="length" 
                                label="Length"
                                variant="outlined" 
                                margin="normal" 
                                required
                                error={ isLengthInvalid }
                                helperText={ isLengthInvalid ? 'Please enter length in minutes. Max: 999' : '' }
                                onBlur={ev => validateLength(ev.target.value)}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">Minutes</InputAdornment>
                                }}
                                className={ classes.inputField1 } />
                        <TextField 
                                id="description" 
                                name="description" 
                                label="Description" 
                                variant="outlined"
                                multiline
                                rows={3} 
                                margin="normal"
                                required
                                error={ isDescInvalid }
                                helperText={ isDescInvalid ? 'Please enter a description' : ''}
                                onBlur={ev => validateDesc(ev.target.value)}
                                className={ classes.inputField1 } />
                        <TextField 
                                id="language" 
                                select
                                name="language" 
                                label="Language" 
                                defaultValue="" 
                                margin="normal"
                                required
                                error={ isLanguageNotChosen }
                                helperText={ isLanguageNotChosen ? 'Please choose a language' : ''}
                                onBlur={ev => validateLanguage(ev.target.value)}
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
                                required
                                error={ isRatingNotChosen }
                                helperText={ isRatingNotChosen ? 'Please choose a rating' : ''}
                                onBlur={ev => validateRating(ev.target.value)}
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
                        <label className={ classes.errorLabel }>{ errorMessageAct }</label>
                        <br />
                        <label>Categories:</label>
                        <MUIDataTable
                            title={""}
                            data={categories}
                            columns={columnsCategories}
                            options={optionsCategories} />
                        <label className={ classes.errorLabel }>{ errorMessageCat }</label>
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
                                required
                                error={ isRentDurationInvalid }
                                helperText={ isRentDurationInvalid ? 'Please choose a rental duration. 1-7 days.' : ''}
                                onBlur={ev => validateRentDur(ev.target.value)}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">Days</InputAdornment>
                                }}
                                className={ classes.inputField2 } />
                        <TextField 
                                id="rental_rate" 
                                name="rental_rate" 
                                label="Rental Rate" 
                                variant="outlined" 
                                margin="normal" 
                                required
                                error={ isRentRateInvalid }
                                helperText={ isRentRateInvalid ? <>Please enter the rental rate.<br/>1 - 99.99$</> : ''}
                                onBlur={ev => validateRentRate(ev.target.value)}
                                InputProps={{
                                    endAdornment: <InputAdornment position="start">$</InputAdornment>
                                }}
                                className={ classes.inputField2 } />
                        <TextField 
                                id="replacement_cost" 
                                name="replacement_cost" 
                                label="Replacement Cost" 
                                variant="outlined" 
                                margin="normal" 
                                required
                                error={ isReplaceCostInvalid }
                                helperText={ isReplaceCostInvalid ? <>Please enter replacement cost.<br/>1 - 999.99$</> : ''}
                                onBlur={ev => validateReplaceCost(ev.target.value)}
                                InputProps={{
                                    endAdornment: <InputAdornment position="start">$</InputAdornment>
                                }}
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
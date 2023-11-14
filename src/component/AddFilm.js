//import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import classes from "../styles/addFilm.module.css";
import Button from '@mui/material/Button';

function AddFilm() {

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
    ]

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
    ]

    return (
        <div className={ classes.mainContainer }>
            <form className={ classes.form }>
                <div className={ classes.formDiv1}>
                    <label>Movie Info: </label> <br/>
                    <TextField 
                            id="title" 
                            name="title" 
                            label="Title" 
                            variant="outlined" 
                            margin="normal"
                            className={ classes.inputField } />
                    <br />
                    <TextField 
                            id="release_year" 
                            name="release_year" 
                            label="Release year" 
                            variant="outlined" 
                            margin="normal" 
                            className={ classes.inputField } />
                    <br />
                    <TextField 
                            id="lenght" 
                            name="length" 
                            label="Length" 
                            variant="outlined" 
                            margin="normal" 
                            className={ classes.inputField } />
                    <br />
                    <TextField 
                            id="description" 
                            name="description" 
                            label="Description" 
                            variant="outlined"
                            multiline
                            rows={3} 
                            margin="normal"
                            className={ classes.inputField } />
                    <br />
                    <TextField 
                            id="language" 
                            select
                            name="language" 
                            label="Language" 
                            defaultValue="1" 
                            margin="normal"
                            className={ classes.inputField }>
                                {languages.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                    </TextField>
                    <br />
                    <TextField 
                            id="rating" 
                            select
                            name="rating" 
                            label="Rating" 
                            margin="normal"
                            className={ classes.inputField }>
                                {ratings.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                    </TextField>
                    <br />
                </div>
                <div className={ classes.formDiv2 }>
                    <label></label>
                    <label>Rental info: </label>
                    <br/>
                    <TextField 
                            id="rental_duration" 
                            name="rental_duration" 
                            label="Rental Duration" 
                            variant="outlined" 
                            margin="normal" 
                            className={ classes.inputField } />
                    <br />
                    <TextField 
                            id="rental_rate" 
                            name="rental_rate" 
                            label="Rental Rate" 
                            variant="outlined" 
                            margin="normal" 
                            className={ classes.inputField } />
                    <br />
                    <TextField 
                            id="replacement_cost" 
                            name="replacement_cost" 
                            label="Replacement Cost" 
                            variant="outlined" 
                            margin="normal" 
                            className={ classes.inputField } />
                    <br />
                    <Button
                        variant="contained">Submit</Button>
                </div>
            </form>
        </div>
    )
}

export default AddFilm;
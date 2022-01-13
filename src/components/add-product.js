import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useAppDispatch } from 'app/hooks';
import { useState } from 'react';
import {
    addProduct
} from 'slices/product-slice';

export default function AddProduct() {
    const dispatch = useAppDispatch();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const onNameChange = (e) => {
        setName(e.currentTarget.value);
    }

    const onDescriptionChange = (e) => {
        setDescription(e.currentTarget.value);
    }

    const onAddClicked = () => {
        let data = {
            name: name,
            description: description
        };
        dispatch(addProduct(data));
    }

    return (
        <Grid container spacing={2} marginTop="1em">
            <Grid item xs={2}>
                <TextField label="Name" variant="outlined" onChange={onNameChange}/>
            </Grid>
            <Grid item xs={2}>
                <TextField label="Description" variant="outlined" onChange={onDescriptionChange}/>
            </Grid>
            <Grid item xs={2}>
                <Button variant="contained" onClick={onAddClicked}>Add</Button>
            </Grid>
        </Grid>

    )
}

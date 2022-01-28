import React from 'react'
import ReactDOM from 'react-dom'
import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { useNavigate } from "react-router-dom";
import { ls } from "local-storage";
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const FoodItem = (props) => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [shopname, setShopName] = useState("");
    const [vegornveg, setvegornveg] = useState("");
    const [addon1, setAddon1] = useState("");
    const [addon2, setAddon2] = useState("");
    const [addon3, setAddon3] = useState("");
    const [addon4, setAddon4] = useState("");
    const [personName, setPersonName] = React.useState([]);

    const onChangeUsername = (event) => {
        setName(event.target.value);
    };

    const onChangeprice = (event) => {
        setPrice(event.target.value);
    };

    const onChangeShopName = (event) => {
        setShopName(event.target.value);
    };

    const onChangeType = (event) => {
        setvegornveg(event.target.value);
    };

    const onChangeAddon1 = (event) => {
        setAddon1(event.target.value);
    };

    const onChangeAddon2 = (event) => {
        setAddon2(event.target.value);
    };

    const onChangeAddon3 = (event) => {
        setAddon3(event.target.value);
    };

    const onChangeAddon4 = (event) => {
        setAddon4(event.target.value);
    };

    const resetInputs = () => {
        setName("");
        setPrice("");
        setShopName("");
        setvegornveg("");
        setAddon1("");
        setAddon2("");
        setAddon3("");
        setAddon4("");
        setPersonName([]);
    }

    const names = [
        'Sweet',
        'Sour',
        'Cold',
        'Hot',
        'Spicy',
        'Less Spicy',
    ];

    const onChangeTags = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 48 * 4.5 + 8,
                width: 250,
            },
        },
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if (!name || !price || !shopname || !vegornveg || !personName) {
            alert("Fields cannot be empty");
        }
        else {
            const newUser = {
                name: name,
                price: price,
                shopname: shopname,
                rating: 0,
                vegornveg: vegornveg,
                addon1: addon1,
                addon2: addon2,
                addon3: addon3,
                addon4: addon4,
                tags: personName.join(','),
            };
            console.log(newUser);
            axios
                .post("http://localhost:4000/vendor/addfood", newUser)
                .then((response) => {
                    alert("Added" + " " + response.data.name + " to Menu Successfully");
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
            navigate("/vendor/foodmenu");

            resetInputs();
        }
    };

    const onLogout = (event) => {
        event.preventDefault();
        ls.clear();

        ls.set("auth", "false");
        navigate('/');
    };

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed">
                    <Toolbar>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ cursor: "pointer" }}
                            onClick={() => navigate("/profile")}
                        >
                            Canteen Portal
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <Button color="inherit" onClick={() => navigate("/profile")}>
                            My Profile
                        </Button>
                        <Button color="inherit" onClick={() => navigate("/vendor/orders")}>
                            Orders
                        </Button>
                        <Button color="inherit" onClick={() => navigate("/vendor/foodmenu")}>
                            Food Menu
                        </Button>
                        <Button color="inherit" onClick={() => navigate("/vendor/stats")}>
                            Statistics
                        </Button>
                        <Button  variant="contained" color="info" onClick={() => navigate("/vendor/addfood")}>
                            Add Food Item
                        </Button>
                        <Button color="inherit" onClick={onLogout}>
                            Logout
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Grid style={{ marginTop: "50px" }} container align={"center"} spacing={2}>
                    <Grid item xs={12}>
                        <h1>Add Food Item</h1>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField required
                            label="Name"
                            variant="outlined"
                            value={name}
                            onChange={onChangeUsername}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField required
                            label="Price"
                            variant="outlined"
                            type="number"
                            value={price}
                            onChange={onChangeprice}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField required
                            label="Shop Name"
                            variant="outlined"
                            value={shopname}
                            onChange={onChangeShopName}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl style={{ minWidth: 235 }} required>
                            <InputLabel>Type</InputLabel>
                            <Select
                                value={vegornveg}
                                label="Type"
                                onChange={onChangeType}
                            >
                                <MenuItem value="Veg">Veg</MenuItem>
                                <MenuItem value="Non Veg">Non Veg</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Addon 1"
                            variant="outlined"
                            value={addon1}
                            onChange={onChangeAddon1}
                            helperText="Format: Addon,Price"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Addon 2"
                            variant="outlined"
                            value={addon2}
                            helperText="Format: Addon,Price"
                            onChange={onChangeAddon2}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Addon 3"
                            variant="outlined"
                            value={addon3}
                            helperText="Format: Addon,Price"
                            onChange={onChangeAddon3}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Addon 4"
                            variant="outlined"
                            value={addon4}
                            helperText="Format: Addon,Price"
                            onChange={onChangeAddon4}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl required sx={{ m: 1, width: 235 }}>
                            <InputLabel >Tag</InputLabel>
                            <Select
                                multiple
                                value={personName}
                                onChange={onChangeTags}
                                input={<OutlinedInput label="Tag" />}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                            >
                                {names.map((name) => (
                                    <MenuItem key={name} value={name}>
                                        <Checkbox checked={personName.indexOf(name) > -1} />
                                        <ListItemText primary={name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <Button variant="contained" onClick={onSubmit}>
                            Add
                        </Button>
                    </Grid>
                </Grid>
            </LocalizationProvider>
        </>
    );
};

export default FoodItem;

import React from 'react'
import ReactDOM from 'react-dom'
import { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from "react-router-dom";
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ls from 'local-storage';
var data = 0;

const EditFoodItem = (props) => {

    const navigate = useNavigate();


    const [name, setName] = useState(ls.get("editname"));
    const [price, setPrice] = useState(ls.get("editprice"));
    const [shopname, setShopName] = useState(ls.get("editshopname"));
    const [vegornveg, setvegornveg] = useState(ls.get("editvegornveg"));
    const [addon1, setAddon1] = useState(ls.get("editaddon1"));
    const [addon2, setAddon2] = useState(ls.get("editaddon2"));
    const [addon3, setAddon3] = useState(ls.get("editaddon3"));
    const [addon4, setAddon4] = useState(ls.get("editaddon4"));
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
        const newUser = {
            name: name,
            oldname: ls.get("editoldname"),
            price: price,
            shopname: shopname,
            vegornveg: vegornveg,
            addon1: addon1,
            addon2: addon2,
            addon3: addon3,
            addon4: addon4,
        };
        console.log(newUser);
        axios
            .post("http://localhost:4000/vendor/fooditem/edit", newUser)
            .then((response) => {
                alert("Edited" + " " + response.data.name + " Successfully");
                console.log(response.data);
                navigate("/vendor/foodmenu")
            })
            .catch((error) => {
                console.log(error);
            });

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
                        <Button color="inherit" variant="contained" color="info" onClick={() => navigate("/vendor/addfood")}>
                            Add Food Item
                        </Button>
                        <Button color="inherit" onClick={onLogout}>
                            Logout
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Grid style={{ marginTop: "50px" }} container align={"center"} spacing={2}>
                <Grid item xs={12}>
                    <h1>Edit Food Item</h1>
                </Grid>
                <Grid item xs={12}>
                    <TextField required
                        label="Name"
                        variant="outlined"
                        defaultValue={ls.get("editname")}
                        onChange={onChangeUsername}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField required
                        label="Price"
                        variant="outlined"
                        type="number"
                        value={ls.get("editprice")}
                        onChange={onChangeprice}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField required
                        label="Shop Name"
                        variant="outlined"
                        value={ls.get("editshopname")}
                        onChange={onChangeShopName}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl style={{ minWidth: 235 }} required>
                        <InputLabel>Type</InputLabel>
                        <Select
                            value={ls.get("editvegornveg")}
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
                        value={ls.get("editaddon1")}
                        onChange={onChangeAddon1}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Addon 2"
                        variant="outlined"
                        value={ls.get("editaddon2")}
                        onChange={onChangeAddon2}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Addon 3"
                        variant="outlined"
                        value={ls.get("editaddon3")}
                        onChange={onChangeAddon3}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Addon 4"
                        variant="outlined"
                        value={ls.get("editaddon4")}
                        onChange={onChangeAddon4}
                    />
                </Grid>
                {/* <Grid item xs={12}>
                    <FormControl required sx={{ m: 1, width: 235 }}>
                        <InputLabel >Tag</InputLabel>
                        <Select
                            multiple
                            value={ls.get("edittags")}
                            onChange={onChangeTags}
                            input={<OutlinedInput label="Tag" />}
                            renderValue={(selected) => selected.join(',')}
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
                </Grid> */}

                <Grid item xs={12}>
                    <Button variant="contained" onClick={onSubmit}>
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default EditFoodItem;

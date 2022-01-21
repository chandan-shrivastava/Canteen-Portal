import React from 'react'
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ls from "local-storage";
import axios from "axios";
import Select from '@mui/material/Select';
var finalprice=0;

const FoodItems = (props) => {

    const [quantity, setQuantity] = useState("");
    const [addon, setAddon] = useState("");

    const onChangeQuantity = (event) => {
        var value = parseInt(event.target.value, 10);

        if (value > 10) value = 10;
        if (value < 1) value = 1;
        finalprice = (value * ls.get("itemprice"));
        console.log(finalprice);
        setQuantity(value);
    };

    const onChangeAddon = (event) => {
        let text = event.target.value;
        const myArray = text.split(",");
        let length =  myArray.length;
        finalprice = finalprice + parseInt(myArray[length-1]);
        console.log(finalprice);
        setAddon(event.target.value);
    };

    const navigate = useNavigate();
    const onSubmit = (event) => {
        event.preventDefault();
        const newUser = {
            itemname: ls.get("itemname"),
            buyername: ls.get("name"),
            itemprice: ls.get("itemprice"),
            itemshopname: ls.get("itemshopname"),
            itemvegornveg: ls.get("itemvegornveg"),
            itemquantity: quantity,
            itemaddon: addon,
            date: Date.now(),
        };
        console.log(newUser);
        //   axios
        //     .post("http://localhost:4000/user/register", newUser)
        //     .then((response) => {
        //       alert("Registered" + " " + response.data.name + " Successfully");
        //       console.log(response.data);
        //     });
        // navigate('/vendor/addfood');
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
                            onClick={() => navigate("/")}
                        >
                            Canteen Portal
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <Button color="inherit" onClick={() => navigate("/users")}>
                            Users
                        </Button>
                        <Button color="inherit" onClick={() => navigate("/profile")}>
                            My Profile
                        </Button>
                        <Button variant="inherit" onClick={() => navigate("/fooditems")}>
                            Food Items
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Grid style={{ marginTop: "100px" }} container align={"center"} spacing={2} >
                <Grid item xs={12}>
                    <TextField
                        label="Name"
                        defaultValue={ls.get("itemname")}
                        variant="outlined"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Price"
                        defaultValue={ls.get("itemprice")}
                        variant="outlined"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Shop Name"
                        defaultValue={ls.get("itemshopname")}
                        variant="outlined"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Veg/Non-Veg"
                        defaultValue={ls.get("itemvegornveg")}
                        variant="outlined"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl style={{ minWidth: 235 }}>
                        <InputLabel>Choose Addon</InputLabel>
                        <Select
                            style={{ minWidth: 235 }}
                            value={addon}
                            label="Choose Addon"
                            onChange={onChangeAddon}
                        >
                            <MenuItem value="None">None</MenuItem>
                            {ls.get("itemaddon1") !== "" &&
                                <MenuItem value={ls.get("itemaddon1")}>{ls.get("itemaddon1")}</MenuItem>
                            }
                            {ls.get("itemaddon2") !== "" &&
                                <MenuItem value={ls.get("itemaddon2")}>{ls.get("itemaddon2")}</MenuItem>
                            }
                            {ls.get("itemaddon3") !== "" &&
                                <MenuItem value={ls.get("itemaddon3")}>{ls.get("itemaddon3")}</MenuItem>
                            }
                            {ls.get("itemaddon4") !== "" &&

                                <MenuItem value={ls.get("itemaddon4")}>{ls.get("itemaddon4")}</MenuItem>
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField required
                        style={{ minWidth: 235 }}
                        label="Quantity"
                        variant="outlined"
                        type="number"
                        value={quantity}
                        onChange={onChangeQuantity}
                        InputProps={{ inputProps: { min: 1, max: 10 } }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Total Price"
                        // defaultValue={finalprice}
                        variant="outlined"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={onSubmit}>
                        Place Order
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default FoodItems;

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

var finalprice = 0;
var addonprice = 0;
var addonadded = false;

const FoodItems = (props) => {

    const [quantity, setQuantity] = useState("");
    const [addon, setAddon] = useState("");

    const onChangeQuantity = (event) => {
        var value = parseInt(event.target.value, 10);
        if (value > 10) value = 10;
        if (value < 1) value = 1;
        finalprice = (addonprice * value) + (value * ls.get("itemprice"));
        setQuantity(value);
    };

    const onChangeAddon = (event) => {
        let text = event.target.value;
        const myArray = text.split(",");
        let length = myArray.length;
        if (addonadded) {
            finalprice = finalprice - addonprice;
            addonadded = false;
            addonprice = 0;
        }
        finalprice = finalprice + parseInt(myArray[length - 1]);
        addonprice = parseInt(myArray[length - 1]);
        addonadded = true;
        setAddon(event.target.value);
    };

    const navigate = useNavigate();
    const onSubmit = (event) => {
        if (!quantity) {
            alert("Quantity cannot be empty");
        }
        else {
            if (ls.get("wallet") < finalprice) {
                alert("Insufficient Balance");
            }
            else {
                event.preventDefault();
                var today = new Date();
                var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                var dateTime = date + ' ' + time;
                const newUser = {
                    item: ls.get("itemname"),
                    buyername: ls.get("name"),
                    buyeremail: ls.get("email"),
                    cost: finalprice,
                    vendorname: ls.get("itemshopname"),
                    vegornveg: ls.get("itemvegornveg"),
                    quantity: quantity,
                    addon: addon,
                    date: dateTime,
                    status: "PLACED",
                    rating: 0,
                };
                console.log(newUser);
                axios
                    .post("http://localhost:4000/orders/placeorder", newUser)
                    .then((response) => {
                        alert("Order Placed Successfully");
                        console.log(response.data);
                        const newUser1 = {
                            buyeremail: ls.get("email"),
                            cost: finalprice,
                        };
                        axios
                            .post("http://localhost:4000/user/ordermoneyadd", newUser1)
                            .then((response) => {
                                ls.set("wallet", response.data.wallet);
                                console.log(response.data);
                            });
                    });
                navigate('/buyer/orders');
            }
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
                            onClick={() => navigate("/")}
                        >
                            Canteen Portal
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <Button color="inherit" onClick={() => navigate("/profile")}>
                            My Profile
                        </Button>
                        <Button color="inherit" onClick={() => navigate("/buyer/orders")}>
                            Orders
                        </Button>
                        <Button color="inherit" onClick={() => navigate("/buyer/fooditems")}>
                            Food Menu
                        </Button>
                        <Button color="inherit" onClick={onLogout}>
							Logout
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
                        defaultValue={finalprice}
                        key={finalprice}
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

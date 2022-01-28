import React from 'react'
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from "@mui/material/Paper";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import axios from "axios";
import ls from "local-storage";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import OutlinedInput from "@mui/material/OutlinedInput";



const FoodItems = (props) => {

    const [users, setUsers] = useState([]);
    const [users1, setUsers1] = useState([]);
    const [users2, setUsers2] = useState([]);
    var freq = new Map();
    useEffect(() => {
        axios
            .get("http://localhost:4000/vendor")
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        axios
            .get("http://localhost:4000/user")
            .then((response) => {
                setUsers1(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        axios
            .get("http://localhost:4000/orders")
            .then((response) => {
                setUsers2(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);

    const navigate = useNavigate();

    const onLogout = (event) => {
        event.preventDefault();
        ls.clear();
        ls.set("auth", "false");
        navigate('/');
    };
    var order_placed = 0;
    var pending_order = 0;
    var completed_order = 0;
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
                        <Button variant="contained" color="info" onClick={() => navigate("/vendor/stats")}>
                            Statistics
                        </Button>
                        <Button color="inherit" onClick={() => navigate("/vendor/foodmenu")}>
                            Food Menu
                        </Button>
                        <Button color="inherit" onClick={onLogout}>
                            Logout
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Grid style={{ marginTop: "100px" }} container align={"center"} spacing={2}>
                <Grid item xs={12}>
                <h1>Statistics</h1>
                </Grid>
                <Grid item xs={12}>
                    <Table sx={{ width: 20 }} size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Orders Placed</TableCell>
                                <TableCell>Pending Orders</TableCell>
                                <TableCell>Completed Orders</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users2.forEach((users21) => {
                                if (users21.vendorname === ls.get("shopname")) { order_placed++; }
                                if (users21.vendorname === ls.get("shopname") && users21.status === "PENDING") pending_order++;
                                if (users21.vendorname === ls.get("shopname") && users21.status === "COMPLETED") completed_order++;
                            })}
                            <TableRow>
                                <TableCell>{order_placed}</TableCell>
                                <TableCell>{pending_order}</TableCell>
                                <TableCell>{completed_order}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Grid>
                <Grid item xs={12}>
                    <Table sx={{ width: 20 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Item</TableCell>
                                <TableCell>Quantity Sold</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users2.forEach((users21) => {
                                var t = freq.get(users21.item);
                                if (t === undefined) { t = 0; }
                                freq.set(users21.item, t + 1);
                            })}
                            {
                                (Array
                                    .from(freq.entries(), ([k, v]) => [k, v]))
                                    .sort((a, b) => (b[1] - a[1]))
                                    .filter((val, i) => { if (i < 5) return val; })
                                    .map((rows) => (
                                        <TableRow>
                                            <TableCell>{rows[0]}</TableCell>
                                            <TableCell>{rows[1]}</TableCell>
                                        </TableRow>
                                    ))

                            }
                        </TableBody>
                    </Table>
                </Grid>
            </Grid>
        </>
    );
};

export default FoodItems;

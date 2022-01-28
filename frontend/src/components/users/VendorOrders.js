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
import emailjs from '@emailjs/browser';
import ls from "local-storage";
import { init } from '@emailjs/browser';
init("user_OxjVoxHLpufOAk9iEJp3J");

const BuyerOrders = (props) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:4000/orders")
            .then((response) => {
                setUsers(response.data);
                console.log(response.data);
                console.log(users);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    const navigate = useNavigate();

    const onChange = ({ id, status }) => {
        if (status === "ACCEPTED") {
            status = "COOKING";
        }
        else if (status === "COOKING") {
            status = "READY FOR PICKUP";
        }
        const newUser = {
            id: id,
            status: status,
        };
        console.log(newUser);
        axios
            .post("http://localhost:4000/orders/changestatus", newUser)
            .then((response) => {
                window.location.reload();
                console.log(response.data);
            })
            .catch(function (res) {
                alert(res.response.data[Object.keys(res.response.data)[0]]);
            });
    };
    const onAccept = ({ id, cost }) => {
        var stat = 0;
        users.forEach((users21) => {
            if (users21.status === "ACCEPTED" || users21.status === "COOKING") { stat++; }
        })
        if (stat >= 10) {
            alert("You cannot accept more than 10 orders at a time");
        }
        else {
            const status = "ACCEPTED";
            const newUser = {
                id: id,
                status: status,
            };
            console.log(newUser);
            axios
                .post("http://localhost:4000/orders/changestatus", newUser)
                .then((response) => {
                    const vendorname = response.data.vendorname;
                    const buyername = response.data.buyername;
                    emailjs.send("service_orkmxtv", "template_bern2yr", {
                        from_name: vendorname,
                        to_name: buyername,
                        message: "Accepted",
                    })
                })
            const newUser1 = {
                email: ls.get("email"),
                cost: cost,
            };
            console.log(newUser1);
            axios
                .post("http://localhost:4000/user/ordermoneysub", newUser1)
                .then((response) => {
                    console.log(response.data);
                    ls.set("wallet", response.data.wallet);
                    window.location.reload();
                });
        }
    };
    const onReject = ({ id, cost, email }) => {
        const status = "REJECTED";
        const newUser = {
            id: id,
            status: status,
        };
        axios
            .post("http://localhost:4000/orders/changestatus", newUser)
            .then((response) => {
                const vendorname = response.data.vendorname;
                const buyername = response.data.buyername;
                emailjs.send("service_orkmxtv", "template_bern2yr", {
                    from_name: vendorname,
                    to_name: buyername,
                    message: "Rejected",
                })
            })
        const newUser1 = {
            email: email,
            cost: cost,
        };
        console.log(newUser1);
        axios
            .post("http://localhost:4000/user/ordermoneysub", newUser1)
            .then((response) => {
                console.log(response.data);
                window.location.reload();
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
                        <Button color="inherit" onClick={() => navigate("/vendor/foodmenu")}>
                            Food Menu
                        </Button>
                        <Button color="inherit" onClick={() => navigate("/vendor/stats")}>
                            Statistics
                        </Button>
                        <Button variant="contained" color="info" onClick={() => navigate("/vendor/orders")}>
                            Orders
                        </Button>
                        <Button color="inherit" onClick={onLogout}>
                            Logout
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Grid style={{ marginTop: "60px" }} container align={"center"} spacing={2}>
                <Grid item xs={12}>
                    <h1>Your Orders</h1>
                </Grid>
                <Grid item xs={12}>
                    <Paper>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Time</TableCell>
                                    <TableCell>Shop Name</TableCell>
                                    <TableCell>Item</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Veg/N.Veg</TableCell>
                                    <TableCell>Addon</TableCell>
                                    <TableCell>Cost</TableCell>
                                    <TableCell>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user, ind) => (
                                    <>
                                        {ls.get("shopname") === user.vendorname &&
                                            <TableRow key={ind}>
                                                <TableCell>{user.date}</TableCell>
                                                <TableCell>{user.vendorname}</TableCell>
                                                <TableCell>{user.item}</TableCell>
                                                <TableCell>{user.quantity}</TableCell>
                                                <TableCell>{user.vegornveg}</TableCell>
                                                <TableCell>{user.addon}</TableCell>
                                                <TableCell>{user.cost}</TableCell>
                                                <TableCell>{user.status}</TableCell>
                                                {user.status !== "PLACED" && user.status !== "READY FOR PICKUP" && user.status !== "COMPLETED" && user.status !== "REJECTED" &&
                                                    <TableCell>
                                                        <Button variant="contained" onClick={() => onChange({ id: user._id, status: user.status, email: user.buyeremail })}>
                                                            Next Stage
                                                        </Button>
                                                    </TableCell>
                                                }
                                                {user.status === "PLACED" &&
                                                    <>
                                                        <TableCell>

                                                            <Button variant="contained" onClick={() => onAccept({ id: user._id, cost: user.cost })}>
                                                                Accept
                                                            </Button>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Button variant="contained" onClick={() => onReject({ id: user._id, cost: user.cost, email: user.buyeremail })}>
                                                                Reject
                                                            </Button>
                                                        </TableCell>
                                                    </>
                                                }
                                            </TableRow>
                                        }
                                    </>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
};

export default BuyerOrders;

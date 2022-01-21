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

const FoodItems = (props) => {
	const [users, setUsers] = useState([]);
	const [Type, setType] = useState("");

	useEffect(() => {
		axios
			.get("http://localhost:4000/vendor")
			.then((response) => {
				setUsers(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const navigate = useNavigate();

	const onSubmit = ({ name,price,shopname,vegornveg,addon1,addon2,addon3,addon4 }) => {
		ls.set("itemname", name);
		ls.set("itemprice", price);
		ls.set("itemshopname", shopname);
		ls.set("itemvegornveg", vegornveg);
		ls.set("itemaddon1", addon1);
		ls.set("itemaddon2", addon2);
		ls.set("itemaddon3", addon3);
		ls.set("itemaddon4", addon4);
		navigate('/placeorder');
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
					</Toolbar>
				</AppBar>
			</Box>
			<Grid style={{ marginTop: "100px" }} container align={"center"} spacing={2}>
				<Grid item xs={12}>
					<Paper>
						<Table size="small">
							<TableHead>
								<TableRow>
									<TableCell> Sr No.</TableCell>
									<TableCell>Name</TableCell>
									<TableCell>Price</TableCell>
									<TableCell>Shop Name</TableCell>
									<TableCell>Rating</TableCell>
									<TableCell>Type</TableCell>
									<TableCell>Addon 1</TableCell>
									<TableCell>Addon 2</TableCell>
									<TableCell>Addon 3</TableCell>
									<TableCell>Addon 4</TableCell>
									<TableCell>Tags</TableCell>
									<TableCell></TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{users.map((user, ind) => (
									<TableRow key={ind}>
										<TableCell>{ind + 1}</TableCell>
										<TableCell>{user.name}</TableCell>
										<TableCell>{user.price}</TableCell>
										<TableCell>{user.shopname}</TableCell>
										<TableCell>{user.rating}</TableCell>
										<TableCell>{user.vegornveg}</TableCell>
										<TableCell>{user.addon1}</TableCell>
										<TableCell>{user.addon2}</TableCell>
										<TableCell>{user.addon3}</TableCell>
										<TableCell>{user.addon4}</TableCell>
										<TableCell>{user.tags}</TableCell>
										<TableCell>
											<Button variant="contained" onClick={() => onSubmit({ name: user.name, price: user.price, shopname: user.shopname, vegornveg:user.vegornveg,addon1:user.addon1,addon2:user.addon2,addon3:user.addon3,addon4:user.addon4 })}>
												Order
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</Paper>
				</Grid>
			</Grid>
		</>
	);
};

export default FoodItems;

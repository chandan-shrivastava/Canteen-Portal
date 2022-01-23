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

const BuyerOrders = (props) => {
	const [users, setUsers] = useState([]);


	useEffect(() => {
		axios
			.get("http://localhost:4000/orders")
			.then((response) => {
				setUsers(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);


	const navigate = useNavigate();
	const onSubmit = (event) => {
		event.preventDefault();
		navigate('/vendor/addfood');
	};
	// const onEdit = (event) => {
	// 	event.preventDefault();
	// 	navigate('/vendor/foodmenu');
	// };
	/**
	 *
	 * @param id - The id of the product
	 */
	const onDelete = ({ id }) => {

		const newUser = {
			_id: id,
		};

		console.log(newUser);
		const success = false;
		axios
			.post("http://localhost:4000/vendor/fooditem/delete", newUser)
			.then((response) => {
				alert("Deleted" + " " + response.data.name + " Successfully");
				console.log(response.data);
				success = true;
			})
			.catch(function (res) {
				alert(res.response.data[Object.keys(res.response.data)[0]]);
			});
		if (success) {
			window.location.reload();
		}
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
						<Button variant="contained" color="info" onClick={() => navigate("/buyer/orders")}>
							Orders
						</Button>
						<Button color="inherit" onClick={() => navigate("/buyer/fooditems")}>
							Food Menu
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
									<TableCell>Sr. No.</TableCell>
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
									<TableRow key={ind}>
										<TableCell>{ind + 1}</TableCell>
										<TableCell>{user.date}</TableCell>
										<TableCell>{user.vendorname}</TableCell>
										<TableCell>{user.item}</TableCell>
										<TableCell>{user.quantity}</TableCell>
										<TableCell>{user.vegornveg}</TableCell>
										<TableCell>{user.addon}</TableCell>
										<TableCell>{user.cost}</TableCell>
										<TableCell>{user.status}</TableCell>
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

export default BuyerOrders;

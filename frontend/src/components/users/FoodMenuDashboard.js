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

const FoodMenu = (props) => {
	const [users, setUsers] = useState([]);


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
						<Button color="inherit" onClick={() => navigate("/users")}>
							Users
						</Button>
						<Button color="inherit" onClick={() => navigate("/profile")}>
							My Profile
						</Button>
						<Button variant="contained" color="info" onClick={() => navigate("/vendor/foodmenu")}>
							Food Menu
						</Button>
					</Toolbar>
				</AppBar>
			</Box>
			<Grid style={{ marginTop: "100px" }} container align={"center"} spacing={2}>
				<Grid item xs={12}>
					<Button variant="contained" onClick={onSubmit}>
						Add Food Item
					</Button>
				</Grid>
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
									{/* <TableCell>Edit</TableCell> */}
									<TableCell>Delete</TableCell>
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
										{/* <TableCell>
											
											<Button variant="contained" onClick={onEdit}>
												Edit
											</Button>
										</TableCell> */}
										<TableCell>
											<Button variant="contained" onClick={() => onDelete({ id: user._id })}>
												Delete
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

export default FoodMenu;

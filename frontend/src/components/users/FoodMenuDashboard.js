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

const FoodMenu = (props) => {
	const [users, setUsers] = useState([]);


	useEffect(() => {
		axios
			.get("http://localhost:4000/vendor")
			.then((response) => {
				setUsers(response.data);
				console.log("response", response.data);
				console.log("users", users);
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
	const onEdit = ({ name, price, shopname, vegornveg, addon1, addon2, addon3, addon4, tags }) => {
		ls.set("editname", name);
		ls.set("editoldname", name);
		ls.set("editprice", price);
		ls.set("editshopname", shopname);
		ls.set("editvegornveg", vegornveg);
		ls.set("editaddon1", addon1);
		ls.set("editaddon2", addon2);
		ls.set("editaddon3", addon3);
		ls.set("editaddon4", addon4);
		ls.set("edittags", tags);
		navigate('/vendor/editfood');
	};
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
				window.location.reload();
				alert("Deleted" + " Successfully");
				console.log(response.data);
			})
			.catch(function (res) {
				alert(res.response.data[Object.keys(res.response.data)[0]]);
			});
		if (success) {
		}
		console.log(success);
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
						<Button variant="contained" color="info" onClick={() => navigate("/vendor/foodmenu")}>
							Food Menu
						</Button>
						<Button color="inherit" onClick={() => navigate("/vendor/stats")}>
                            Statistics
                        </Button>
						<Button color="inherit" onClick={onLogout}>
							Logout
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
									<TableCell>Item Name</TableCell>
									<TableCell>Buyer Name</TableCell>
									<TableCell>Buyer Email</TableCell>
									<TableCell>Price</TableCell>
									<TableCell>Shop Name</TableCell>
									<TableCell>Rating</TableCell>
									<TableCell>Type</TableCell>
									<TableCell>Addon 1</TableCell>
									<TableCell>Addon 2</TableCell>
									<TableCell>Addon 3</TableCell>
									<TableCell>Addon 4</TableCell>
									<TableCell>Tags</TableCell>
									<TableCell>Edit</TableCell>
									<TableCell>Delete</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{users.map((user, ind) => (
									<>
										{ls.get("shopname") === user.shopname &&
											<TableRow key={ind}>
												<TableCell>{ind + 1}</TableCell>
												<TableCell>{user.name}</TableCell>
												<TableCell>{user.buyername}</TableCell>
												<TableCell>{user.buyeremail}</TableCell>
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
													<Button variant="contained" onClick={() => onEdit({ name: user.name, price: user.price, shopname: user.shopname, vegornveg: user.vegornveg, addon1: user.addon1, addon2: user.addon2, addon3: user.addon3, addon4: user.addon4, tags: user.tags })}>
														Edit
													</Button>
												</TableCell>
												<TableCell>
													<Button variant="contained" onClick={() => onDelete({ id: user._id })}>
														Delete
													</Button>
												</TableCell>
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

export default FoodMenu;

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
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Divider from "@mui/material/Divider";

const FoodItems = (props) => {
	const [sortName, setSortName] = useState(true);
	const [sortName1, setSortName1] = useState(true);
	const [tags, settags] = useState("");
	const [vegornveg, setvegornveg] = useState("");
	const [users, setUsers] = useState([]);
	const [users1, setUsers1] = useState([]);
	const [users2, setUsers2] = useState([]);
	const [users3, setUsers3] = useState([]);
	const [search, setSearch] = useState("");
	const [value, setValue] = React.useState([0, 500]);
	const [personName, setPersonName] = React.useState([]);

	const handleChange1 = (event) => {
		const {
			target: { value }
		} = event;
		setPersonName(
			typeof value === "string" ? value.split(",") : value
		);
		console.log(value);
	};

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
		axios
			.get("http://localhost:4000/favourites")
			.then((response) => {
				setUsers3(response.data);
			})
			.catch((error) => {
				console.log(error);
			});

	}, []);

	const onChangevegornveg = (event) => {
		setvegornveg(event.target.value);
	};

	const onChangetags = (event) => {
		settags(event.target.value);
	};

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const navigate = useNavigate();

	const onSearch = (event) => {
		setSearch(event.target.value);
	}

	var openinghours = 0;
	var closinghours = 0;
	var openingminutes = 0;
	var closingminutes = 0;
	var opening_time = 0;
	var closing_time = 0;

	const sortChange = () => {
		let usersTemp = users;
		const flag = sortName;
		usersTemp.sort((a, b) => {
			if (a.price != undefined && b.price != undefined) {
				return (1 - flag * 2) * (a.price - b.price);
			} else {
				return 1;
			}
		});
		setUsers(usersTemp);
		setSortName(!sortName);
	};

	const sortChange1 = () => {
		let usersTemp = users;
		const flag = sortName1;
		usersTemp.sort((a, b) => {
			if (a.rating != undefined && b.rating != undefined) {
				return (1 - flag * 2) * (a.rating - b.rating);
			} else {
				return 1;
			}
		});
		setUsers(usersTemp);
		setSortName1(!sortName1);
	};
	const onFavourite = ({ name, price, shopname, rating, vegornveg, addon1, addon2, addon3, addon4, tags }) => {
		const newUser = {
			itemname: name,
			buyername: ls.get("name"),
			price: price,
			shopname: shopname,
			rating: 0,
			vegornveg: vegornveg,
			addon1: addon1,
			addon2: addon2,
			addon3: addon3,
			addon4: addon4,
			tags: tags,
		};
		console.log(newUser);
		axios
			.post("http://localhost:4000/favourites/addfav", newUser)
			.then((response) => {
				alert(response.data);
				console.log(response.data);
		window.location.reload();

			})
			.catch((error) => {
				console.log(error);
			});
	};
	const onSubmit = ({ name, price, shopname, vegornveg, addon1, addon2, addon3, addon4 }) => {
		const newUser = {
			shopname: shopname,
		};
		axios
			.post("http://localhost:4000/user/gettime", newUser)
			.then((response) => {
				openinghours = response.data.openingtime.substring(11, 13);
				closinghours = response.data.closingtime.substring(11, 13);
				openingminutes = response.data.openingtime.substring(14, 16);
				closingminutes = response.data.closingtime.substring(14, 16);
				opening_time = openinghours + ":" + openingminutes + ":00";
				closing_time = closinghours + ":" + closingminutes + ":00";

				var dt = new Date();
				var s = opening_time.split(':');
				var dt1 = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), parseInt(s[0]), parseInt(s[1]), parseInt(s[2]));
				var e = closing_time.split(':');
				var dt2 = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), parseInt(e[0]), parseInt(e[1]), parseInt(e[2]));
				if (dt >= dt1 && dt <= dt2) {
					ls.set("itemname", name);
					ls.set("itemprice", price);
					ls.set("itemshopname", shopname);
					ls.set("itemvegornveg", vegornveg);
					ls.set("itemaddon1", addon1);
					ls.set("itemaddon2", addon2);
					ls.set("itemaddon3", addon3);
					ls.set("itemaddon4", addon4);
					navigate('/buyer/placeorder');
				}
				else {
					alert("Shop is closed");
				}
			})
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
						<Button color="inherit" onClick={() => navigate("/buyer/orders")}>
							Orders
						</Button>
						<Button variant="contained" color="info" onClick={() => navigate("/buyer/fooditems")}>
							Food Menu
						</Button>
						<Button color="inherit" onClick={onLogout}>
							Logout
						</Button>
					</Toolbar>
				</AppBar>
			</Box>

			<Grid style={{ marginTop: "60px" }} container align={"center"} spacing={2}>
				<Grid item xs={12}>
					<div><h1>Favourites</h1></div>

					<Paper>
						<Table size="small">
							<TableHead>
								<TableRow>
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
								{users3.map((user, ind) => (
									<>
										{user.buyername === ls.get("name") &&
											<TableRow key={ind}>
												<TableCell>{user.itemname}</TableCell>
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
													<Button variant="contained" onClick={() => onSubmit({ name: user.itemname, price: user.price, shopname: user.shopname, vegornveg: user.vegornveg, addon1: user.addon1, addon2: user.addon2, addon3: user.addon3, addon4: user.addon4 })}>
														Order
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
				<Grid item sx={{ mt: 3 }} xs={12}>
					<div><h1>Filters</h1></div>
					<TextField
						id="standard-basic"
						label="Search"
						fullWidth={true}
						InputProps={{
							endAdornment: (
								<InputAdornment>
									<IconButton>
										<SearchIcon />
									</IconButton>
								</InputAdornment>
							),
						}}
						onChange={onSearch}
					/>
				</Grid>
				<Grid item xs={12}>
					<FormControl sx={{ m: 1, width: 250 }}>
						Price
						<Slider
							min={0} max={500}
							value={value}
							onChange={handleChange}
							valueLabelDisplay="auto"
						/>
					</FormControl>
					<FormControl sx={{ mx: 3, my: 1, width: 250 }}>
						<InputLabel>Tags</InputLabel>
						<Select
							label="Tags"
							variant="outlined"
							value={tags}
							onChange={onChangetags}
						>
							<MenuItem value="Sweet">Sweet</MenuItem>
							<MenuItem value="Sour">Sour</MenuItem>
							<MenuItem value="Cold">Cold</MenuItem>
							<MenuItem value="Hot">Hot</MenuItem>
							<MenuItem value="Spicy">Less Spicy</MenuItem>
						</Select>
					</FormControl>
					<FormControl sx={{ m: 1, width: 250 }}>
						<InputLabel>Veg/Non Veg</InputLabel>
						<Select
							label="Veg/Non Veg"
							variant="outlined"
							value={vegornveg}
							onChange={onChangevegornveg}
						>
							<MenuItem value="Veg">Veg</MenuItem>
							<MenuItem value="Non Veg">Non Veg</MenuItem>
						</Select>
					</FormControl>
					{/* <FormControl sx={{ mx: 3, my: 1, width: 250 }}>
						<InputLabel>Shop Name</InputLabel>
						<Select
							multiple
							value={personName}
							onChange={handleChange1}
							input={<OutlinedInput label="Shop Name" />}
						>
							{users1.map((user1, ind) => (
								<MenuItem
									key={ind}
									value={user1.shopname}
								>
									{user1.shopname}
								</MenuItem>
							))}
						</Select>
					</FormControl> */}
					<FormControl sx={{ m: 2 }}>
						<Button variant="contained" color="primary" onClick={() => window.location.reload()}>
							Clear Filters
						</Button>
					</FormControl>
				</Grid>

				<Grid item xs={12}>
					<div><h1>All Food Items</h1></div>
					<Paper>
						<Table size="small">
							<TableHead>
								<TableRow>
									<TableCell> Sr No.</TableCell>
									<TableCell>Name</TableCell>
									<TableCell>Price
										<Button onClick={sortChange}>
											{sortName ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
										</Button>
									</TableCell>
									<TableCell>Shop Name</TableCell>
									<TableCell>Rating
										<Button onClick={sortChange1}>
											{sortName1 ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
										</Button>
									</TableCell>
									<TableCell>Type</TableCell>
									<TableCell>Addon 1</TableCell>
									<TableCell>Addon 2</TableCell>
									<TableCell>Addon 3</TableCell>
									<TableCell>Addon 4</TableCell>
									<TableCell>Tags</TableCell>
									<TableCell></TableCell>
									<TableCell></TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{users.map((user, ind) => (
									<>
										{user.name.includes(search) && (vegornveg === "" || user.vegornveg === vegornveg) && (tags === "" || user.tags.includes(tags)) && ((parseInt(user.price) >= value[0]) && (parseInt(user.price) <= value[1])) &&
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
													<Button variant="contained" onClick={() => onFavourite({ name: user.name, price: user.price, shopname: user.shopname, rating: user.rating, vegornveg: user.vegornveg, addon1: user.addon1, addon2: user.addon2, addon3: user.addon3, addon4: user.addon4, tags: user.tags })}>
														Favourite
													</Button>
												</TableCell>
												<TableCell>
													<Button variant="contained" onClick={() => onSubmit({ name: user.name, price: user.price, shopname: user.shopname, vegornveg: user.vegornveg, addon1: user.addon1, addon2: user.addon2, addon3: user.addon3, addon4: user.addon4 })}>
														Order
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

export default FoodItems;

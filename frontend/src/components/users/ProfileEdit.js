import React from 'react'
import ReactDOM from 'react-dom'
import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import ls from "local-storage";
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const ProfileEdit = (props) => {
	const [name, setName] = useState(ls.get("name"));
	const [email, setEmail] = useState(ls.get("email"));
	const [Type, setType] = useState(ls.get("type"));
	const [contact, setContact] = useState(ls.get("contact"));
	const [age, setAge] = useState(ls.get("age"));
	const [batch, setBatch] = useState(ls.get("batch"));
	const [ShopName, setShopName] = useState(ls.get("shopname"));
	const [passwd, setpasswd] = useState(ls.get("passwd"));
	const [date, setDate] = useState(null);
	const [openingtimepick, setOpen] = React.useState(new Date());
	const [closingtimepick, setClos] = React.useState(new Date());
	var changed = false;
	const onChangeUsername = (event) => {
		setName(event.target.value);
	};

	const onChangeEmail = (event) => {
		setEmail(event.target.value);
	};

	const onChangeContact = (event) => {
		setContact(event.target.value);
	};

	const onChangeAge = (event) => {
		setAge(event.target.value);
	};

	const onChangeBatch = (event) => {
		setBatch(event.target.value);
	};

	const onChangeShopName = (event) => {
		setShopName(event.target.value);
	};

	const onChangepasswd = (event) => {
		setpasswd(event.target.value);
	};
	
	const navigate = useNavigate();
    

	const onSubmit = (event) => {
		event.preventDefault();

		const newUser = {
			name: name,
			email: email,
			oldemail: ls.get("email"),
			contact: contact,
			Type: Type,
			age: age,
			batch: batch,
			passwd: passwd,
			shopname: ShopName,
			openingtime: opening,
			closingtime: closing,
			wallet: "0",
			date: Date.now(),
		};
		console.log(newUser);
		axios
			.post("http://localhost:4000/user/profile/edit", newUser)
			.then((response) => {
				alert("Profile Edited" + " Successfully");
				console.log(response.data);
				alert("Please login again");
				navigate('/login');
			});
	};

	const [values, setValues] = React.useState({
		showPassword: false,
	});

	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		});
	};

	if (ls.get("type") === "Vendor") {
		try {
			var opening = ls.get("openingtime");
			var date1 = new Date(opening);
			opening = date1.toISOString().substring(11, 16);
			var closing = ls.get("closingtime");
			date1 = new Date(closing);
			closing = date1.toISOString().substring(11, 16);
		}
		catch {
			opening = ls.get("openingtime");
			closing = ls.get("closingtime");
		}
	}

	const onLogout = (event) => {
        event.preventDefault();
		ls.clear();

        ls.set("auth", "false");
        navigate('/');
    };

	return (
		<>
			{ls.get("type") === "Vendor" &&
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
							<Button color="inherit" variant="contained" color="info" onClick={() => navigate("/profile")}>
								My Profile
							</Button>
							<Button color="inherit" onClick={() => navigate("/vendor/orders")}>
								Orders
							</Button>
							<Button color="inherit" onClick={() => navigate("/vendor/stats")}>
                            Statistics
                        </Button>
							<Button color="inherit" onClick={() => navigate("/vendor/foodmenu")}>
								Food Menu
							</Button>
							<Button variant="contained" color="info" onClick={onLogout}>
								Logout
							</Button>
						</Toolbar>
					</AppBar>
				</Box>
			}
			{ls.get("type") === "Buyer" &&
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
							<Button color="inherit" variant="contained" color="info" onClick={() => navigate("/profile")}>
								My Profile
							</Button>
							<Button color="inherit" onClick={() => navigate("/buyer/orders")}>
								Orders
							</Button>
							<Button color="inherit" onClick={() => navigate("/buyer/fooditems")}>
								Food Menu
							</Button>
							<Button color="inherit" onClick={() => navigate("/")}>
								Logout
							</Button>
						</Toolbar>
					</AppBar>
				</Box>
			}
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<Grid style={{ marginTop: "100px" }} container align={"center"} spacing={2} >
					<Grid item xs={12}>
						<TextField
							label="Name"
							defaultValue={ls.get("name")}
							variant="outlined"
							onChange={onChangeUsername}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							label="Email"
							defaultValue={ls.get("email")}
							variant="outlined"
							onChange={onChangeEmail}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							label="Contact"
							defaultValue={ls.get("contact")}
							variant="outlined"
							onChange={onChangeContact}
						/>
					</Grid>
					<Grid item xs={12}>
						<FormControl style={{ maxWidth: 235 }} variant="outlined">
							<InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
							<OutlinedInput
								id="outlined-adornment-password"
								type={values.showPassword ? 'text' : 'password'}
								defaultValue={ls.get("passwd")}
								onChange={onChangepasswd}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											edge="end"
										>
											{values.showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								}
								label="Password"
							/>
						</FormControl>
					</Grid>
				</Grid>
				<br />
				{ls.get("type") === "Buyer" &&
					<Grid container align={"center"} spacing={2}>
						<Grid item xs={12}>
							<TextField
								label="Age"
								variant="outlined"
								type="number"
								defaultValue={ls.get("age")}
								onChange={onChangeAge}
							/>
						</Grid>
						<Grid item xs={12}>
							<FormControl style={{ minWidth: 235 }}>
								<InputLabel>Batch</InputLabel>
								<Select
									defaultValue={ls.get("batch")}
									label="batch"
									onChange={onChangeBatch}
								>
									<MenuItem value="UG1">UG1</MenuItem>
									<MenuItem value="UG2">UG2</MenuItem>
									<MenuItem value="UG3">UG3</MenuItem>
									<MenuItem value="UG4">UG4</MenuItem>
									<MenuItem value="UG5">UG5</MenuItem>
								</Select>
							</FormControl>
						</Grid>

						<Grid item xs={12}>
							<Button variant="contained" onClick={onSubmit}>
								Submit
							</Button>
						</Grid>
					</Grid>
				}
				{ls.get("type") === "Vendor" &&
					<Grid container align={"center"} spacing={2}>
						<Grid item xs={12}>
							<TextField
								label="Shop Name"
								variant="outlined"
								defaultValue={ls.get("shopname")}
								onChange={onChangeShopName}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								label="Opening Time"
								variant="outlined"
								defaultValue={opening}
								onChange={onChangeShopName}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								label="Closing Time"
								variant="outlined"
								defaultValue={closing}
								onChange={onChangeShopName}
							/>
						</Grid>

						<Grid item xs={12}>
							<Button variant="contained" onClick={onSubmit}>
								Submit
							</Button>
						</Grid>
					</Grid>
				}
			</LocalizationProvider>
		</>
	);
};

export default ProfileEdit;

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
import TimePicker from '@mui/lab/TimePicker';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Register = (props) => {
	const navigate = useNavigate();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [Type, setType] = useState("");
	const [contact, setContact] = useState("");
	const [age, setAge] = useState("");
	const [batch, setBatch] = useState("");
	const [ShopName, setShopName] = useState("");
	const [passwd, setpasswd] = useState("");
	const [date, setDate] = useState(null);
	const [openingtimepick, setOpeningTimepick] = React.useState(new Date());
	const [closingtimepick, setClosingTimepick] = React.useState(new Date());

	const onChangeUsername = (event) => {
		setName(event.target.value);
	};

	const onChangeEmail = (event) => {
		setEmail(event.target.value);
	};

	const onChangeType = (event) => {
		setType(event.target.value);
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

	const onChangeOpeningTimepick = (newValue) => {
		setOpeningTimepick(newValue);
	};

	const onChangeClosingTimepick = (newValue) => {
		setClosingTimepick(newValue);
	};


	const resetInputs = () => {
		setName("");
		setEmail("");
		setType("");
		setContact("");
		setAge("");
		setShopName("");
		setpasswd("");
		setOpeningTimepick("");
		setClosingTimepick("");
		setValues("");
		setDate(null);
	};

	const onSubmitVendor = (event) => {
		event.preventDefault();
		if (!name || !email || !Type || !contact || !passwd || !ShopName || !openingtimepick || !closingtimepick) {
			alert("Fields cannot be empty");
		}
		else {
			const newUser = {
				name: name,
				email: email,
				contact: contact,
				Type: Type,
				shopname: ShopName,
				openingtime: openingtimepick,
				closingtime: closingtimepick,
				passwd: passwd,
				age: age,
				batch: batch,
				wallet: "0",
				date: Date.now(),
			};
			console.log(newUser);
			axios
				.post("http://localhost:4000/user/register", newUser)
				.then((response) => {
					if (response.data !== "Email already exists") {
						alert("Registered" + " " + response.data.name + " Successfully");
						navigate("/login");
					}
					else
						alert(response.data);
					console.log(response.data);
				});
				resetInputs();
		}
	};

	const onSubmitBuyer = (event) => {
		event.preventDefault();
		if (!name || !email || !Type || !contact || !passwd || !age || !batch) {
			alert("Fields cannot be empty");
		}
		else if (!validateEmail)
		{
			alert("Invalid Email");
		}
		else {
			const newUser = {
				name: name,
				email: email,
				contact: contact,
				Type: Type,
				age: age,
				batch: batch,
				passwd: passwd,
				shopname: ShopName,
				openingtime: openingtimepick,
				closingtime: closingtimepick,
				wallet: "0",
				date: Date.now(),
			};
			console.log(newUser);
			axios
				.post("http://localhost:4000/user/register", newUser)
				.then((response) => {
					if (response.data !== "Email already exists") {
						alert("Registered" + " " + response.data.name + " Successfully");
						navigate("/login");
					}
					else
						alert(response.data);
					console.log(response.data);
				});

			resetInputs();
		}
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

	const validateEmail = (email) => {
		return String(email)
		  .toLowerCase()
		  .match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		  );
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
						<Button color="inherit" onClick={() => navigate("/login")}>
							Login
						</Button>
					</Toolbar>
				</AppBar>
			</Box>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<Grid style={{ marginTop: "100px" }} container align={"center"} spacing={2} Validate>
					<Grid item xs={12}>
						<TextField required
							label="Name"
							variant="outlined"
							value={name}
							onChange={onChangeUsername}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField required
							label="Email"
							variant="outlined"
							value={email}
							onChange={onChangeEmail}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField required
							label="Contact No."
							variant="outlined"
							type="number"
							value={contact}
							onChange={onChangeContact}
						/>
					</Grid>
					<Grid item xs={12}>
						<FormControl style={{ maxWidth: 235 }} variant="outlined">
							<InputLabel >Password</InputLabel>
							<OutlinedInput
								type={values.showPassword ? 'text' : 'password'}
								value={values.passwd}
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
					<Grid item xs={12}>
						<FormControl style={{ minWidth: 235 }}>
							<InputLabel>Type</InputLabel>
							<Select
								value={Type}
								label="Type"
								onChange={onChangeType}
							>
								<MenuItem value="Vendor">Vendor</MenuItem>
								<MenuItem value="Buyer">Buyer</MenuItem>
							</Select>
						</FormControl>
					</Grid>
				</Grid>
				<br />
				{Type === "Buyer" &&
					<Grid container align={"center"} spacing={2}>
						<Grid item xs={12}>
							<TextField required
								label="Age"
								variant="outlined"
								type="number"
								value={age}
								onChange={onChangeAge}
							/>
						</Grid>
						<Grid item xs={12}>
							<FormControl style={{ minWidth: 235 }}>
								<InputLabel>Batch</InputLabel>
								<Select
									value={batch}
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
							<Button variant="contained" onClick={onSubmitBuyer}>
								Register
							</Button>
						</Grid>
					</Grid>
				}
				{Type === "Vendor" &&
					<Grid container align={"center"} spacing={2}>
						<Grid item xs={12}>
							<TextField required
								label="Shop Name"
								variant="outlined"
								value={ShopName}
								onChange={onChangeShopName}
							/>
						</Grid>
						<Grid item xs={12}>
							<TimePicker
								label="Opening Time"
								value={openingtimepick}
								onChange={onChangeOpeningTimepick}
								renderInput={(params) => <TextField required {...params} />}
							/>
						</Grid>
						<Grid item xs={12}>
							<TimePicker
								label="Closing Time"
								value={closingtimepick}
								onChange={onChangeClosingTimepick}
								renderInput={(params) => <TextField required {...params} />}
							/>
						</Grid>

						<Grid item xs={12}>
							<Button variant="contained" onClick={onSubmitVendor}>
								Register
							</Button>
						</Grid>
					</Grid>
				}
			</LocalizationProvider>
		</>
	);
};

export default Register;

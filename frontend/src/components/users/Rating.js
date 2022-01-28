// import React from 'react'
// import ReactDOM from 'react-dom'
// import { useState } from "react";
// import ls from "local-storage";
// import axios from "axios";
// import Grid from "@mui/material/Grid";
// import Button from "@mui/material/Button";
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import { useNavigate } from 'react-router-dom';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';


// const Rating = (props) => {
//     const [batch, setBatch] = useState("");
//     const onChangeBatch = (event) => {
//         setBatch(event.target.value);
//     };
//     const navigate = useNavigate();

//     const onSubmit = (event) => {
//         event.preventDefault();

//         const newUser = {
//             rating:batch,
//             id:ls.get('ratingid'),
//         };
//         console.log(newUser);
//         axios
//             .post("http://localhost:4000/vendor/rating", newUser)
//             .then((response) => {
//                 alert("Thank you for rating");
//                 console.log(response.data);
//                 navigate('/buyer/orders');
//             });
//     };

//     return (
//         <>
//             <Box sx={{ flexGrow: 1 }}>
//                 <AppBar position="fixed">
//                     <Toolbar>
//                         <Typography
//                             variant="h6"
//                             component="div"
//                             sx={{ cursor: "pointer" }}
//                             onClick={() => navigate("/")}
//                         >
//                             Canteen Portal
//                         </Typography>
//                         <Box sx={{ flexGrow: 1 }} />
//                         <Button color="inherit" onClick={() => navigate("/profile")}>
//                             My Profile
//                         </Button>
//                         <Button variant="contained" color="info" onClick={() => navigate("/buyer/orders")}>
//                             Orders
//                         </Button>
//                         <Button color="inherit" onClick={() => navigate("/buyer/fooditems")}>
//                             Food Menu
//                         </Button>
//                     </Toolbar>
//                 </AppBar>
//             </Box>
//             <Grid style={{ marginTop: "100px" }} container align={"center"} spacing={2}>
//                 <Grid item xs={12}>
//                     <h1>Please rate your order</h1>
//                 </Grid>
//                 <Grid item xs={12}>
//                     <FormControl style={{ minWidth: 235 }}>
//                         <InputLabel>Rating</InputLabel>
//                         <Select
//                             value={batch}
//                             label="Rating"
//                             onChange={onChangeBatch}
//                         >
//                             <MenuItem value="1">1⭐</MenuItem>
//                             <MenuItem value="2">2⭐</MenuItem>
//                             <MenuItem value="3">3⭐</MenuItem>
//                             <MenuItem value="4">4⭐</MenuItem>
//                             <MenuItem value="5">5⭐</MenuItem>
//                         </Select>
//                     </FormControl>
//                 </Grid>
//                 <Grid item xs={12}>
//                     <Button variant="contained" color="primary" onClick={onSubmit}>
//                         Submit
//                     </Button>
//                 </Grid>
//             </Grid>
//         </>
//     )
// }


// export default Rating;

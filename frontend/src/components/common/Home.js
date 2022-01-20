import React from 'react'
import Grid from "@mui/material/Grid";
import { useNavigate } from 'react-router-dom';
import Button from "@mui/material/Button";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Home = (props) => {

  const navigate = useNavigate();

  const onRegister = (event) => {
    event.preventDefault();
    navigate('/register');
  };

  const onLogin = (event) => {
    event.preventDefault();
    navigate('/login');
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
        <Button color="inherit" onClick={() => navigate("/register")}>
          Register
        </Button>
        <Button color="inherit" onClick={() => navigate("/login")}>
          Login
        </Button>
      </Toolbar>
    </AppBar>
  </Box> 
    <Grid style={{ marginTop: "100px" }} container align={"center"} container
      direction="column"
      alignItems="center"
      justifyContent="center"
      spacing={2}>
      <h1>Welcome to IIIT Canteen Portal</h1>
      <Grid item xs={12}>
        <Button variant="contained" onClick={onRegister}>
          Register
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={onLogin}>
          Login
        </Button>
      </Grid>
    </Grid>
    </>
  )
};

export default Home;

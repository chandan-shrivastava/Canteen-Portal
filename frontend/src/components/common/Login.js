import React from 'react'
import ReactDOM from 'react-dom'
import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useNavigate } from 'react-router-dom';
import ls from "local-storage";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [passwd, setpasswd] = useState("");
  const navigate = useNavigate();
  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangepasswd = (event) => {
    setpasswd(event.target.value);
  };

  const resetInputs = () => {
    setEmail("");
    setpasswd("");
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!email || !passwd) {
      alert("Fields cannot be empty");
    }
    else {

      const newUser = {
        email: email,
        passwd: passwd,
      };
      console.log(newUser);
      axios
        .post("http://localhost:4000/user/login", newUser)
        .then((response) => {
          alert("Logged" + " " + response.data.name + " Successfully");
          console.log(response.data);
          ls.set("name", response.data.name);
          ls.set("email", response.data.email);
          ls.set("contact", response.data.contact);
          ls.set("type", response.data.Type);
          ls.set("age", response.data.age);
          ls.set("batch", response.data.batch);
          ls.set("passwd", response.data.passwd);
          ls.set("shopname", response.data.shopname);
          ls.set("openingtime", response.data.openingtime);
          ls.set("closingtime", response.data.closingtime);
          ls.set("wallet", response.data.wallet);
          ls.set("auth", "true");
          navigate('/profile');
        })
        .catch(function (res) {
          alert(res.response.data[Object.keys(res.response.data)[0]]);
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

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
          </Toolbar>
        </AppBar>
      </Box>
      <Grid style={{ marginTop: "100px" }} container align={"center"} spacing={2}>
        <Grid item xs={12}>
          <TextField required
            label="Email"
            variant="outlined"
            value={email}
            onChange={onChangeEmail}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl style={{ maxWidth: 235 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.passwd}
              onChange={onChangepasswd}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
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
          <Button variant="contained" onClick={onSubmit}>
            Login
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;

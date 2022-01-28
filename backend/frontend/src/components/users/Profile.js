import React from 'react'
import ls from "local-storage";
import TextField from '@mui/material/TextField';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import axios from 'axios';

const Profile = (props) => {

  const navigate = useNavigate();
  const [wallet, setWallet] = useState("");

  const onChangeWallet = (event) => {
    setWallet(event.target.value);
  };

  const onAddMoney = (event) => {
    event.preventDefault();

    const newUser = {
      email: ls.get("email"),
      wallet: wallet,
    };

    console.log(newUser);
    axios
      .post("http://localhost:4000/user/addmoney", newUser)
      .then((response) => {
        alert("Added" + " " + wallet + " Successfully");
        console.log(response.data.wallet);
        ls.set("wallet", response.data.wallet);
        window.location.reload();
      });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    navigate('/profile/edit');
  };

  const onLogout = (event) => {
    event.preventDefault();
    ls.clear();

    ls.set("auth", "false");
    navigate('/');
  };

  if (ls.get("type") === "Buyer") {
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
              <Button color="inherit" variant="contained" color="info" onClick={() => navigate("/profile")}>
                My Profile
              </Button>
              <Button color="inherit" onClick={() => navigate("/buyer/orders")}>
                Orders
              </Button>
              <Button color="inherit" onClick={() => navigate("/buyer/fooditems")}>
                Food Menu
              </Button>
              <Button color="inherit" onClick={onLogout}>
                Logout
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
        <Grid
          style={{ marginTop: "100px" }}
          align={"center"}
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              label="Name"
              defaultValue={ls.get("name")}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div>
            <TextField
              label="Email"
              defaultValue={ls.get("email")}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div>
            <TextField
              label="Contact"
              defaultValue={ls.get("contact")}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div>
            <TextField
              label="Age"
              defaultValue={ls.get("age")}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div>
            <TextField
              label="Batch"
              defaultValue={ls.get("batch")}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div>
            <Button variant="contained" onClick={onSubmit}>
              Edit
            </Button>
          </div>
          <div>
            <TextField
              label="Wallet"
              defaultValue={ls.get("wallet")}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div>
            <TextField
              label="Add money to Wallet"
              variant="outlined"
              type="number"
              value={wallet}
              onChange={onChangeWallet}
            />
          </div>
          <div>
            <Button variant="contained" onClick={onAddMoney}>
              Add Money
            </Button>
          </div>
        </Grid>
      </>
    );
  }
  else if (ls.get("type") === "Vendor") {
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
              <Button  variant="contained" color="info" onClick={() => navigate("/profile")}>
                My Profile
              </Button>
              <Button color="inherit" onClick={() => navigate("/vendor/orders")}>
                Orders
              </Button>
              <Button color="inherit" onClick={() => navigate("/vendor/foodmenu")}>
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

        <Grid
          style={{ marginTop: "100px" }}
          align={"center"}
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              label="Name"
              defaultValue={ls.get("name")}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div>
            <TextField
              label="Email"
              defaultValue={ls.get("email")}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div>
            <TextField
              label="Contact"
              defaultValue={ls.get("contact")}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div>
            <TextField
              label="Shop Name"
              defaultValue={ls.get("shopname")}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div>
            <TextField
              label="Opening Time"
              defaultValue={opening}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div>
            <TextField
              label="Closing Time"
              defaultValue={closing}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div>
            <Button variant="contained" onClick={onSubmit}>
              Edit
            </Button>
          </div>
          <div>
            <TextField
              label="Wallet"
              defaultValue={ls.get("wallet")}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
        </Grid>
      </>
    );
  }
};

export default Profile;

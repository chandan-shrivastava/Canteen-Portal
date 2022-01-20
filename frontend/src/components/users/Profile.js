import React from 'react'
import ls from "local-storage";
import TextField from '@mui/material/TextField';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Profile = (props) => {

  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    navigate('/profile/edit');
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
            onClick={() => navigate("/")}
          >
            Canteen Portal
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit" onClick={() => navigate("/users")}>
            Users
          </Button>
          <Button color="inherit" variant="contained" color="info" onClick={() => navigate("/profile")}>
            My Profile
          </Button>
          <Button color="inherit" onClick={() => navigate("/vendor/foodmenu")}>
            Food Menu
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
          <TextField
            label="Wallet"
            defaultValue={ls.get("wallet")}
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
          <Button color="inherit" onClick={() => navigate("/users")}>
            Users
          </Button>
          <Button color="inherit" onClick={() => navigate("/profile")}>
            My Profile
          </Button>
          <Button color="inherit" onClick={() => navigate("/vendor/foodmenu")}>
            Food Menu
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
          <TextField
            label="Wallet"
            defaultValue={ls.get("wallet")}
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
      </Grid>
      </>
    );
  }
};

export default Profile;

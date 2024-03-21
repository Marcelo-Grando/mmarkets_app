import { useNavigate } from "react-router-dom";

import Logo from "/Logo2.png";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";


export const ButtonAppBar = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ boxShadow: "none" }} position="static">
        <Toolbar className="app-bar" style={{ minHeight: "50px" }}>
          <img
            onClick={() => navigate("/")}
            className="logo-app"
            src={Logo}
            alt=""
          />

          <div className="btn-group-nav">
            <Button
              sx={{ marginRight: 2 }}
              className="btn-nav"
              onClick={() => navigate("/register")}
              color="inherit"
            >
              Register
            </Button>
            <Button
              className="btn-nav"
              onClick={() => navigate("/signin")}
              color="inherit"
            >
              Login
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

import { useNavigate } from "react-router-dom";

import Logo from "/Logo2.png";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";


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
        </Toolbar>
      </AppBar>
    </Box>
  );
};

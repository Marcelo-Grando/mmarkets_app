import { useNavigate } from "react-router-dom";

import Logo from "/Logo2.png";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

export const DrawAppBar = ({ pages, settings, menuIcon, open}) => {
  const navigate = useNavigate();

  return (
      <AppBar open={open} sx={{ boxShadow: "none" }} position="fixed">
        <Toolbar className="app-bar" style={{ minHeight: "50px" }}>
        {menuIcon}
          <img
            onClick={() => navigate("/")}
            className="logo-app"
            src={Logo}
            alt=""
          />

          <Box className="btn-group-nav" sx={{ marginLeft: 8 }}>
            {pages.map((page) => (
              <Button
                sx={{ marginRight: 2 }}
                className="btn-nav"
                onClick={() => navigate(`${page.name}`)}
                color="inherit"
              >
                {page.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
  );
};

import { ButtonAppBar } from "../components/ButtonAppBar.jsx";
import { Outlet } from "react-router-dom";

import Fondo from "/Fondo.png";
import HomeBackground from "/Home-background.png";

import Logo_bg from "/Logo_bg.png";

import SigninPage from "./SigninPage.jsx";
import RegisterPage from "./RegisterPage.jsx";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const alturaViewport = window.innerHeight;
const anchuraViewport = window.innerWidth;

console.log("altura", alturaViewport);
console.log("ancho", anchuraViewport);

export default function HomePage() {
  const [form, setForm] = useState("signin");

  const togleForm = () => {
    form === "signin" && setForm("register");
    form === "register" && setForm("signin");
  };

  return (
    <Box>
      <ButtonAppBar />
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: `${alturaViewport - 50}px`,
          backgroundImage: `url(${HomeBackground})`,
          backgroundSize: "cover",
        }}
      >
        <Box sx={{ width: "50%" }}>
          <Box
            sx={{
              m: 8,
              width: "75%",
              textAlign: "center",
              backgroundColor: "white",
              opacity: "70%",
            }}
          >
            {form === "signin" ? (
              <SigninPage togleForm={togleForm} />
            ) : (
              <RegisterPage togleForm={togleForm} />
            )}
          </Box>
        </Box>
        <Box sx={{ width: "50%", textAlign: "center", position: "relative" }}>
          <Box sx={{ p: 8 }}>
            <h3 style={{ fontSize: 30, fontStyle: "oblique", fontWeight: 200 }}>
              Mmarkets'S offers practical solutions for the management of your
              premises. Allowing you to have control of products, sales and
              stock.
            </h3>
            <Button id="btn-tutorials">Get Tutorials</Button>
          </Box>
          <img
            src={Logo_bg}
            alt="Logo"
            style={{ position: "absolute", bottom: 0, right: 0 }}
          />
        </Box>
      </Box>
    </Box>
  );
}

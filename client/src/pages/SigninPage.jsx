import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Form from "../components/Form";

import { login } from "../api/Auth";
import { getUserRoles } from "../api/Users";
import { Box } from "@mui/material";

const inpustData = [
  {
    name: "email",
    type: "email",
    label: "Email",
  },
  {
    name: "password",
    type: "password",
    label: "Password",
  },
];

const initialState = {
  email: "",
  password: "",
};

export default function SigninPage({ togleForm }) {
  const navigate = useNavigate();

  const sendUser = async (user) => {
    const response = await login(user);

    const data = await getUserRoles();

    navigate("/user", { state: { userData: data } });
  };

  return (
    <Box sx={{ p: 1, borderRadius: "10px"}}>
      <h3 className="form-text">
        If you are already a Mmarket user you can log in below:
      </h3>
      <Form
        inpustData={inpustData}
        btn_title={"Signin"}
        functionSubmit={sendUser}
        initialState={initialState}
      />
      <h3 className="form-link" onClick={togleForm}>
        You still don't have an account? sign up here
      </h3>
    </Box>
  );
}

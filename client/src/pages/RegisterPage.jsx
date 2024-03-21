import { Box } from "@mui/material";
import { createMainAccount } from "../api/Accounts";
import Form from "../components/Form";

const inpustData = [
  {
    name: "name",
    type: "text",
    label: "Name",
  },
  {
    name: "adress",
    type: "text",
    label: "Adress",
  },
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
  name: "",
  adress: "",
  email: "",
  password: "",
  state: true,
};

export default function RegisterPage({ togleForm }) {
  return (
    <Box sx={{ p: 1 }}>
      <h3 className="form-text">If you don't have an account yet, create it here:</h3>
      <Form
        title={"Register"}
        inpustData={inpustData}
        btn_title={"Register"}
        functionSubmit={createMainAccount}
        initialState={initialState}
      />
      <h3 className="form-link" onClick={togleForm}>
        Do you already have an account? log in here
      </h3>
    </Box>
  );
}

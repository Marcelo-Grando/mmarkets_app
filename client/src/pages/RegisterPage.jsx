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

export default function RegisterPage() {
  return (
    <Box sx={{p: 1}}>
      <Form
      title={"Register"}
      inpustData={inpustData}
      btn_title={"Register"}
      functionSubmit={createMainAccount}
      initialState={initialState}
    />
    </Box>
  );
}
